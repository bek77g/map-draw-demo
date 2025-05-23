'use client';

import L from 'leaflet';
import 'leaflet-draw';
import { useEffect, useRef, useState } from 'react';

import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/leaflet.css';

interface Address {
	display_name: string;
}

export default function MapWithDraw() {
	const mapRef = useRef<HTMLDivElement>(null);
	const [addresses, setAddresses] = useState<Address[]>([]);

	useEffect(() => {
		if (!mapRef.current) return;

		const map = L.map(mapRef.current).setView([42.8746, 74.6122], 13); // Бишкек
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
			map
		);

		const drawnItems = new L.FeatureGroup();
		map.addLayer(drawnItems);

		const drawControl = new L.Control.Draw({
			edit: { featureGroup: drawnItems },
			draw: {
				polygon: true,
				rectangle: true,
				circle: false,
				marker: false,
				polyline: false,
			},
		});
		map.addControl(drawControl);

		map.on(L.Draw.Event.CREATED, async function (event: any) {
			const layer = event.layer;
			drawnItems.clearLayers();
			drawnItems.addLayer(layer);

			const bounds = layer.getBounds();
			const south = bounds.getSouth();
			const west = bounds.getWest();
			const north = bounds.getNorth();
			const east = bounds.getEast();

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
				const res = await fetch('https://overpass-api.de/api/interpreter', {
					method: 'POST',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					body: query,
				});

				if (!res.ok) {
					console.error('Ошибка запроса:', res.statusText);
					setAddresses([]);
					return;
				}

				const data = await res.json();

				setAddresses(data.elements || []);
			} catch (err) {
				console.error('Ошибка Overpass API:', err);
				setAddresses([]);
			}
		});

		return () => {
			map.remove();
		};
	}, []);

	return (
		<div className='w-full'>
			<div ref={mapRef} id='map' className='h-[500px] w-full rounded shadow' />
			<div className='mt-4'>
				<h2 className='font-bold mb-2'>Найденные адреса:</h2>
				{addresses.length === 0 ? (
					<p>Ничего не найдено</p>
				) : (
					<ul className='list-disc list-inside'>
						{addresses.map((addr, i) => (
							<li key={i}>
								{addr.tags?.['addr:housenumber']} {addr.tags?.['addr:street']},{' '}
								{addr.tags?.['addr:city']}
								{addr.tags?.amenity && ` (${addr.tags.amenity})`}
								{addr.tags?.['name:en'] && `: ${addr.tags['name:en']}`}
								{addr.tags?.opening_hours && ` - ${addr.tags.opening_hours}`}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
