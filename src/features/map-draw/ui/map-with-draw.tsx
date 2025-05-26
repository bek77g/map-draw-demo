'use client';

import L from 'leaflet';
import 'leaflet-draw';
import { useEffect, useRef, useState } from 'react';

import { Address } from '@/entities/address';
import { MAP_CONFIG } from '@/shared/config/constants';
import { fetchAddresses } from '../api/fetch-addresses';
import { AddressList } from './address-list';

import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/leaflet.css';

export const MapWithDraw = () => {
	const mapRef = useRef<HTMLDivElement>(null);
	const [addresses, setAddresses] = useState<Address[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!mapRef.current) return;

		const map = L.map(mapRef.current).setView(
			MAP_CONFIG.DEFAULT_CENTER,
			MAP_CONFIG.DEFAULT_ZOOM
		);
		L.tileLayer(MAP_CONFIG.TILE_LAYER).addTo(map);

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

				try {
					const addressesData = await fetchAddresses({
						south,
						west,
						north,
						east,
					});
					setAddresses(addressesData);
				} catch (error) {
					console.error('Error fetching addresses:', error);
					setAddresses([]);
				} finally {
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
				<AddressList addresses={addresses} loading={loading} />
			</div>
		</div>
	);
};
