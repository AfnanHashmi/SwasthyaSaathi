import os, json
import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score, calinski_harabasz_score, davies_bouldin_score

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
INPUT_CSV = os.getenv("INPUT_CSV", os.path.join(SCRIPT_DIR, "water_northeast.csv"))
OUTPUT_DIR = os.getenv("OUTPUT_DIR", SCRIPT_DIR)
OUTPUT_CSV = os.path.join(OUTPUT_DIR, "predictions.csv")

PREFERRED_FEATURES = [
    "Diarrheal Cases per 100,000 people",
    "Cholera Cases per 100,000 people",
    "Typhoid Cases per 100,000 people",
]
RISK_ORDER = ["Low", "Medium", "High"]

def pick_feature_columns(df):
    cols = [c for c in PREFERRED_FEATURES if c in df.columns]
    if len(cols) >= 2:
        return cols
    num_cols = df.select_dtypes(include=[np.number]).columns.tolist()
    exclude = {c for c in df.columns if c.lower() in {"year", "city", "country", "region"}}
    chosen = [c for c in num_cols if c not in exclude]
    if not chosen:
        raise ValueError("No numeric feature columns found.")
    return chosen

def composite_risk_score(X_std): return X_std.mean(axis=1)
def softmax_neg_dist(d, t=1.0):
    z = -d / max(t, 1e-8); z -= z.max(axis=1, keepdims=True)
    e = np.exp(z); return e / e.sum(axis=1, keepdims=True)

def run():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    df = pd.read_csv(INPUT_CSV)
    feat = pick_feature_columns(df)
    X = df[feat].astype(float).values
    Xs = StandardScaler().fit_transform(X)

    kmeans = KMeans(n_clusters=3, n_init=20, random_state=42)
    labels = kmeans.fit_predict(Xs)

    # metrics (printed to stderr-like stdout before JSON)
    sil = silhouette_score(Xs, labels)
    ch = calinski_harabasz_score(Xs, labels)
    db = davies_bouldin_score(Xs, labels)
    print(f"[predict] silhouette={sil:.3f} ch={ch:.3f} db={db:.3f}")

    scores = composite_risk_score(Xs)
    cmean = {c: float(scores[labels==c].mean()) for c in range(3)}
    ordered = sorted(cmean.keys(), key=lambda c: cmean[c])
    c2risk = {cl: RISK_ORDER[i] for i, cl in enumerate(ordered)}

    dists = kmeans.transform(Xs)
    probs = softmax_neg_dist(dists, 1.0)
    r2c = {c2risk[cl]: cl for cl in range(3)}

    out = df.copy()
    if "Country" in out.columns and "City" not in out.columns:
        out["City"] = out["Country"]
    out["Prediction"] = [c2risk[c] for c in labels]
    out["proba_Low"] = probs[:, r2c["Low"]]
    out["proba_Medium"] = probs[:, r2c["Medium"]]
    out["proba_High"] = probs[:, r2c["High"]]

    cols_front = [c for c in ["City","Country","Region","Year"] if c in out.columns]
    cols_front += ["Prediction","proba_Low","proba_Medium","proba_High"]
    out = out[cols_front + [c for c in out.columns if c not in cols_front]]

    out.to_csv(OUTPUT_CSV, index=False)
    print(json.dumps(out.to_dict(orient="records"), indent=2))

if __name__ == "__main__":
    run()
