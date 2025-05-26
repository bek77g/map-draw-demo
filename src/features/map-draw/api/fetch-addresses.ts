import { Address } from '@/entities/address';
import { API_ENDPOINTS } from '@/shared/config/constants';

export async function fetchAddresses(bounds: {
  south: number;
  west: number;
  north: number;
  east: number;
}): Promise<Address[]> {
  const { south, west, north, east } = bounds;
  
  const query = `
    [out:json][timeout:25];
    (
      node["addr:housenumber"](${south},${west},${north},${east});
      way["addr:housenumber"](${south},${west},${north},${east});
      relation["addr:housenumber"](${south},${west},${north},${east});
    );
    out center;
  `;

  try {
    const res = await fetch(API_ENDPOINTS.OVERPASS_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: query,
    });

    if (!res.ok) {
      console.error('Ошибка запроса:', res.statusText);
      return [];
    }

    const data = await res.json();
    return data.elements || [];
  } catch (err) {
    console.error('Ошибка Overpass API:', err);
    return [];
  }
}
