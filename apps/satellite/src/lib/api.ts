const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? '';

export interface Classification {
  label: string;
  confidence: number;
}

export interface PredictResult {
  fileName: string;
  classes: Classification[];
}

function mockPredict(file: File): PredictResult {
  return {
    fileName: file.name,
    classes: [
      { label: 'Forest', confidence: 0.62 },
      { label: 'Cropland', confidence: 0.21 },
      { label: 'Water', confidence: 0.1 },
      { label: 'Urban', confidence: 0.07 },
    ],
  };
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function predict(file: File): Promise<PredictResult> {
  if (!apiBaseUrl) {
    await delay(1200); // simulate processing for the step indicator
    return mockPredict(file);
  }
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${apiBaseUrl}/predict`, { method: 'POST', body: form });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
