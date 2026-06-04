import { config } from '../config';

/**
 * Tiny fetch helper. Returns mock data when `config.apiBaseUrl` is empty so the
 * app runs standalone; otherwise calls `GET {apiBaseUrl}{path}`.
 * Replace `mock` with real types/endpoints for your app.
 */
export async function getJson<T>(path: string, mock: T): Promise<T> {
  if (!config.apiBaseUrl) return mock;
  const res = await fetch(`${config.apiBaseUrl}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}
