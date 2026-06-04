const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? '';

export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  carrier: string;
  status: 'In Transit' | 'Delivered' | 'Delayed' | 'Pending';
  eta: string;
}

export interface Metrics {
  activeShipments: number;
  delivered: number;
  delayed: number;
  rfidEvents: number;
}

const mockShipments: Shipment[] = [
  { id: 'OCL-1042', origin: 'Rotterdam', destination: 'Hamburg', carrier: 'Maersk', status: 'In Transit', eta: '2026-06-05' },
  { id: 'OCL-1043', origin: 'Shanghai', destination: 'Los Angeles', carrier: 'COSCO', status: 'Delayed', eta: '2026-06-09' },
  { id: 'OCL-1044', origin: 'Santos', destination: 'Lisbon', carrier: 'MSC', status: 'Delivered', eta: '2026-06-01' },
  { id: 'OCL-1045', origin: 'Singapore', destination: 'Dubai', carrier: 'Hapag-Lloyd', status: 'In Transit', eta: '2026-06-07' },
  { id: 'OCL-1046', origin: 'Antwerp', destination: 'New York', carrier: 'Maersk', status: 'Pending', eta: '2026-06-12' },
  { id: 'OCL-1047', origin: 'Busan', destination: 'Seattle', carrier: 'ONE', status: 'In Transit', eta: '2026-06-08' },
  { id: 'OCL-1048', origin: 'Valencia', destination: 'Casablanca', carrier: 'MSC', status: 'Delivered', eta: '2026-05-30' },
  { id: 'OCL-1049', origin: 'Felixstowe', destination: 'Gothenburg', carrier: 'Maersk', status: 'Delayed', eta: '2026-06-10' },
  { id: 'OCL-1050', origin: 'Ningbo', destination: 'Oakland', carrier: 'COSCO', status: 'In Transit', eta: '2026-06-11' },
  { id: 'OCL-1051', origin: 'Genoa', destination: 'Alexandria', carrier: 'CMA CGM', status: 'Pending', eta: '2026-06-13' },
  { id: 'OCL-1052', origin: 'Tokyo', destination: 'Vancouver', carrier: 'ONE', status: 'In Transit', eta: '2026-06-09' },
  { id: 'OCL-1053', origin: 'Hamburg', destination: 'Helsinki', carrier: 'Hapag-Lloyd', status: 'Delivered', eta: '2026-05-29' },
];

function metricsFrom(shipments: Shipment[]): Metrics {
  return {
    activeShipments: shipments.filter((s) => s.status === 'In Transit').length,
    delivered: shipments.filter((s) => s.status === 'Delivered').length,
    delayed: shipments.filter((s) => s.status === 'Delayed').length,
    rfidEvents: 8421,
  };
}

export async function fetchShipments(): Promise<Shipment[]> {
  if (!apiBaseUrl) return mockShipments;
  const res = await fetch(`${apiBaseUrl}/shipments`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data.items ?? data;
}

export async function fetchMetrics(): Promise<Metrics> {
  if (!apiBaseUrl) return metricsFrom(mockShipments);
  const res = await fetch(`${apiBaseUrl}/metrics`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
