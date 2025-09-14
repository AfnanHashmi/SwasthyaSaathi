import type { NextApiRequest, NextApiResponse } from "next";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

const PY = (() => {
  const p1 = path.join(process.cwd(), ".venv", "bin", "python");
  const p2 = path.join(process.cwd(), ".venv", "bin", "python3");
  if (fs.existsSync(p1)) return p1;
  if (fs.existsSync(p2)) return p2;
  return "python3";
})();

function runPy(rel: string, timeoutMs = 30000) {
  return new Promise<{ code: number; stderr: string; stdout: string; timedOut: boolean }>((resolve) => {
    const script = path.join(process.cwd(), rel);
    const p = spawn(PY, [script], { cwd: process.cwd() });

    let stderr = "";
    let stdout = "";
    let done = false;

    const t = setTimeout(() => {
      if (done) return;
      try { p.kill("SIGKILL"); } catch {}
      done = true;
      resolve({ code: 124, stderr: `[timeout] ${rel} exceeded ${timeoutMs}ms`, stdout, timedOut: true });
    }, timeoutMs);

    // drain BOTH to avoid blocking
    p.stdout.on("data", d => { stdout += d.toString(); });
    p.stderr.on("data", d => { stderr += d.toString(); });

    p.on("close", (code) => {
      if (done) return;
      clearTimeout(t);
      done = true;
      resolve({ code: code ?? 1, stderr, stdout, timedOut: false });
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });

  // Run classifier (you said your file is py/predict.py)
  const cls = await runPy("py/predict.py", 30000);
  if (cls.code !== 0) {
    return res.status(500).json({ error: "classification failed", log: cls.stderr || cls.stdout, timedOut: cls.timedOut });
  }

  // Read predictions written at project root
  const predCsv = fs.readFileSync(path.join(process.cwd(), "predictions.csv"), "utf8");
  const predictions = parse(predCsv, { columns: true, skip_empty_lines: true });

  // (Re-enable forecasting later after classification is stable)
  return res.status(200).json({ predictions, forecast: [] });
}
