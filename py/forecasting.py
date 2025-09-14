import os, sys, json, numpy as np, pandas as pd, torch
from chronos import ChronosPipeline

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
INPUT_CSV = os.getenv("INPUT_CSV", os.path.join(SCRIPT_DIR, "water_northeast.csv"))
OUTPUT_DIR = os.getenv("OUTPUT_DIR", SCRIPT_DIR)
OUTPUT_CSV = os.path.join(OUTPUT_DIR, "forecasts.csv")

GROUP_BY = "City"; YEAR_COL = "Year"
TARGETS = [
    "Diarrheal Cases per 100,000 people",
    "Cholera Cases per 100,000 people",
    "Typhoid Cases per 100,000 people",
]
HORIZON = 3
MODEL_NAME = "amazon/chronos-t5-small"

def load_pipeline():
    device_map = "cuda" if torch.cuda.is_available() else "cpu"
    dtype = torch.bfloat16 if device_map == "cuda" else torch.float32
    print(f"[forecast] Loading {MODEL_NAME} on {device_map}")
    return ChronosPipeline.from_pretrained(MODEL_NAME, device_map=device_map, torch_dtype=dtype)

def prepare(df, group_col, time_col, target_col):
    series = {}
    for key, g in df.groupby(group_col):
        s = g[[time_col, target_col]].dropna().sort_values(time_col)
        if len(s) >= 5:
            series[key] = (s[time_col].astype(int).values, s[target_col].astype(float).values)
    return series

def forecast(pipe, vals, horizon):
    ctx = torch.tensor(np.asarray(vals, dtype=np.float32))
    _, mean = pipe.predict_quantiles(context=ctx, prediction_length=horizon, quantile_levels=[0.1,0.5,0.9])
    return mean[0].cpu().numpy()

def run():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    df = pd.read_csv(INPUT_CSV)
    if GROUP_BY not in df.columns or YEAR_COL not in df.columns:
        raise ValueError(f"CSV must have {GROUP_BY} and {YEAR_COL}")

    pipe = load_pipeline()
    rows = []
    for target in TARGETS:
        if target not in df.columns:
            print(f"[forecast] skip target {target}")
            continue
        series = prepare(df, GROUP_BY, YEAR_COL, target)
        for key, (years, vals) in series.items():
            try:
                preds = forecast(pipe, vals, HORIZON)
                start = int(years.max()) + 1
                for i, p in enumerate(preds):
                    rows.append({GROUP_BY:key, "engine":MODEL_NAME, "target":target, "year":start+i, "forecast":float(p)})
            except Exception as e:
                print(f"[forecast] fail {key}/{target}: {e}")

    out = pd.DataFrame(rows)
    out.to_csv(OUTPUT_CSV, index=False)
    print(json.dumps(out.to_dict(orient="records"), indent=2))

if __name__ == "__main__":
    run()
