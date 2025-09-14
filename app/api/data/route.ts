import { NextRequest } from "next/server";
import path from "node:path";
import { promises as fs } from "node:fs";
import { parse } from "csv-parse/sync";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type PredictionRowCSV = {
  City?: string;
  Country?: string;
  Year?: string | number;
  Prediction?: "Low" | "Medium" | "High" | string;
  proba_Low?: string | number;
  proba_Medium?: string | number;
  proba_High?: string | number;
  Population?: string | number;
  PopulationAffected?: string | number;
  population_affected?: string | number;
};

type ForecastRowCSV = {
  City?: string;
  city?: string;
  target?: string;
  year?: string | number;
  forecast?: string | number;
  engine?: string;
  month?: string | number; // optional if you add it later
  ci?: string | number;    // optional if you add CIs later
};

function toNum(v: any): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "predictions";
    const pyDir = path.join(process.cwd(), "py");

    if (type === "predictions") {
      const file = path.join(pyDir, "predictions.csv");
      // If file doesn't exist, return empty
      const csv = await fs.readFile(file, "utf8").catch(() => "");
      if (!csv) return Response.json({ data: [] });

      const rows = parse(csv, { columns: true, skip_empty_lines: true }) as PredictionRowCSV[];

      const data = rows.map((r) => {
        const city = r.City ?? r.Country ?? "Unknown";
        const year = toNum(r.Year);

        const risk = (r.Prediction || "Medium").toString() as "Low" | "Medium" | "High";
        const pLow = toNum(r.proba_Low) ?? 0;
        const pMed = toNum(r.proba_Medium) ?? 0;
        const pHigh = toNum(r.proba_High) ?? 0;

        // Probability of the predicted class
        const probability = risk === "High" ? pHigh : risk === "Medium" ? pMed : pLow;

        // Try various population fields, fallback to 0
        const pop =
          toNum((r as any).PopulationAffected) ??
          toNum((r as any).population_affected) ??
          toNum((r as any).Population) ??
          0;

        return {
          city: String(city),
          year: year ?? null,
          risk_level: risk,
          probability, // 0..1
          population_affected: pop as number,
        };
      });

      return new Response(JSON.stringify({ data }), {
        headers: { "content-type": "application/json", "cache-control": "no-store" },
      });
    }

    if (type === "forecasts") {
  const file = path.join(pyDir, "forecasts.csv");
  const csv = await fs.readFile(file, "utf8").catch(() => "");
  if (!csv) return Response.json({ data: [] });

  const rows = parse(csv, { columns: true, skip_empty_lines: true }) as ForecastRowCSV[];

  // Assign sequential step per (city,target)
  const counters = new Map<string, number>();
  const data = rows.map((r) => {
    const city = (r.City || r.city || "Unknown") as string;
    const target = (r.target || "All") as string;
    const year = toNum(r.year);
    const yhat = toNum(r.forecast) ?? 0;

    const key = `${city}|${target}`;
    const next = (counters.get(key) ?? 0) + 1;
    counters.set(key, next);

    return {
      city,
      target,
      year: year ?? null,
      step: next,
      predicted_cases: yhat,
      confidence_interval: 0,
    };
  });

  return Response.json({ data });
}


    return new Response(JSON.stringify({ error: "Unknown type param" }), { status: 400 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || "Failed to load CSV" }), { status: 500 });
  }
}
