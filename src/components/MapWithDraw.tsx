'use client';

import L from 'leaflet';
import 'leaflet-draw';
import { useEffect, useRef, useState } from 'react';

import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/leaflet.css';

interface Address {
	display_name: string;
	tags?: {
		'addr:housenumber'?: string;
		'addr:street'?: string;
		'addr:city'?: string;
		amenity?: string;
		'name:en'?: string;
		opening_hours?: string;
	};
}

export default function MapWithDraw() {
	const mapRef = useRef<HTMLDivElement>(null);
	const [addresses, setAddresses] = useState<Address[]>([]);
	const [loading, setLoading] = useState(false);

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
				polygon: {
					allowIntersection: false,
					showArea: true,
				},
				rectangle: {
					shapeOptions: {
						color: '#3388ff',
					},
				},
				circle: false,
				marker: false,
				polyline: false,
			},
		});
		map.addControl(drawControl);

		map.on(
			L.Draw.Event.CREATED,
			async function (event: { layer: L.Polygon | L.Rectangle }) {
				setLoading(true);
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
						setLoading(false);
						return;
					}

					const data = await res.json();
					setAddresses(data.elements || []);
					setLoading(false);
				} catch (err) {
					console.error('Ошибка Overpass API:', err);
					setAddresses([]);
					setLoading(false);
				}
			}
		);

		return () => {
			map.remove();
		};
	}, []);

	return (
		<div className='flex flex-col md:flex-row gap-6 w-full h-[calc(100vh-150px)]'>
			{/* Map Section - Left Side */}
			<div className='w-full md:w-3/5 h-full'>
				<div
					ref={mapRef}
					id='map'
					className='h-full w-full rounded-lg shadow-lg border border-gray-200'
				/>
			</div>

			{/* Addresses Section - Right Side */}
			<div className='w-full md:w-2/5 h-full overflow-hidden flex flex-col'>
				<div className='bg-white rounded-lg shadow-lg p-6 h-full border border-gray-200 flex flex-col'>
					<h2 className='text-2xl font-bold mb-4 text-gray-800 border-b pb-2'>
						Найденные адреса
					</h2>

					{loading ? (
						<div className='flex items-center justify-center h-32'>
							<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
							<span className='ml-2 text-gray-600'>Загрузка адресов...</span>
						</div>
					) : addresses.length === 0 ? (
						<div className='flex flex-col items-center justify-center h-32 text-gray-500'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-12 w-12 mb-2'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={1.5}
									d='M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
								/>
							</svg>
							<p className='text-center'>
								Нарисуйте область на карте, чтобы увидеть адреса
							</p>
						</div>
					) : (
						<div className='flex flex-col'>
							<p className='text-sm text-gray-600 mb-2'>
								Найдено адресов: {addresses.length}
							</p>
							<div className='overflow-y-scroll pr-2 space-y-3 h-[calc(100vh-300px)]'>
								{addresses.map((addr, i) => (
									<div
										key={i}
										className='p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors'>
										<div className='font-medium text-gray-800'>
											{addr.tags?.['addr:housenumber'] || ''}{' '}
											{addr.tags?.['addr:street'] || ''}
										</div>
										{addr.tags?.['addr:city'] && (
											<div className='text-sm text-gray-600'>
												{addr.tags['addr:city']}
											</div>
										)}
										{addr.tags?.amenity && (
											<div className='text-sm text-blue-600 mt-1'>
												{addr.tags.amenity}
											</div>
										)}
										{addr.tags?.['name:en'] && (
											<div className='text-sm italic mt-1'>
												{addr.tags['name:en']}
											</div>
										)}
										{addr.tags?.opening_hours && (
											<div className='text-xs text-gray-500 mt-1'>
												<span className='font-medium'>Часы работы:</span>{' '}
												{addr.tags.opening_hours}
											</div>
										)}
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
