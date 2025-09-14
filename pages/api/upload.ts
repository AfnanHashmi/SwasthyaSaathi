import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export const config = { api: { bodyParser: false } };

const runPython = (script: string, args: string[]) =>
  new Promise<{ code: number; stdout: string; stderr: string }>((resolve) => {
    const p = spawn("python3", [script, ...args], { cwd: process.cwd() });
    let stdout = "", stderr = "";
    p.stdout.on("data", d => stdout += d.toString());
    p.stderr.on("data", d => stderr += d.toString());
    p.on("close", code => resolve({ code: code ?? 1, stdout, stderr }));
  });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // 1) Save uploaded CSV to /tmp
  const uploadDir = "/tmp";
  await fs.promises.mkdir(uploadDir, { recursive: true });

  const filePath: string = await new Promise((resolve, reject) => {
    const form = formidable({ multiples: false, uploadDir, keepExtensions: true });
    form.parse(req, (err, _fields, files) => {
      if (err) return reject(err);
      // field name "file" on the client
      const f = (files.file as formidable.File) || (Array.isArray(files.file) ? files.file[0] : null);
      if (!f?.filepath) return reject(new Error("No file uploaded"));
      resolve(f.filepath);
    });
  });

  try {
    // 2) Run your Python scripts with the uploaded file path
    // Make sure these scripts write predictions.csv and forecast.csv to /tmp (or return paths)
    const clsScript = path.join(process.cwd(), "classification.py");
    const fcScript  = path.join(process.cwd(), "forecasting.py");

    const [cls, fc] = await Promise.all([
      runPython(clsScript, ["--input", filePath, "--out", "/tmp/predictions.csv"]),
      runPython(fcScript,  ["--input", filePath, "--out", "/tmp/forecast.csv"]),
    ]);

    if (cls.code !== 0) return res.status(500).json({ error: "Classification failed", log: cls.stderr });
    if (fc.code !== 0)  return res.status(500).json({ error: "Forecasting failed", log: fc.stderr });

    // 3) Read generated CSVs
    const predCsv = await fs.promises.readFile("/tmp/predictions.csv", "utf8");
    const foreCsv = await fs.promises.readFile("/tmp/forecast.csv", "utf8");

    const predictions = parse(predCsv, { columns: true, skip_empty_lines: true });
    const forecast    = parse(foreCsv, { columns: true, skip_empty_lines: true });

    // 4) Return JSON for the frontend to render
    return res.status(200).json({ predictions, forecast });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || "Server error" });
  }
}
