'use client';

import { useEffect, useRef, useState } from 'react';
import { Address } from '../model';

interface AddressCardProps {
	address: Address;
}

export const AddressCard = ({ address }: AddressCardProps) => {
	const [showDetails, setShowDetails] = useState(false);
	const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
	const cardRef = useRef<HTMLDivElement>(null);

	// Обновление позиции tooltip при наведении
	useEffect(() => {
		if (showDetails && cardRef.current) {
			const rect = cardRef.current.getBoundingClientRect();
			setTooltipPosition({
				top: rect.top + window.scrollY + rect.height / 2,
				left: rect.right + window.scrollX + 10, // 10px отступ от карточки
			});
		}
	}, [showDetails]);

	return (
		<div
			ref={cardRef}
			className='p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors'
			onMouseEnter={() => setShowDetails(true)}
			onMouseLeave={() => setShowDetails(false)}>
			<div className='font-medium text-gray-800'>
				{address.tags?.['addr:street'] || ''}{' '}
				{address.tags?.['addr:housenumber'] || ''}
			</div>
			{address.tags?.['addr:city'] && (
				<div className='text-sm text-gray-600'>{address.tags['addr:city']}</div>
			)}
			{address.tags?.amenity && (
				<div className='text-sm text-blue-600 mt-1'>{address.tags.amenity}</div>
			)}
			{address.tags?.['name:en'] && (
				<div className='text-sm italic mt-1'>{address.tags['name:en']}</div>
			)}
			{address.tags?.opening_hours && (
				<div className='text-xs text-gray-500 mt-1'>
					<span className='font-medium'>Часы работы:</span>{' '}
					{address.tags.opening_hours}
				</div>
			)}

			{/* Tooltip with full address object as code - вынесен в портал */}
			{showDetails && (
				<div
					className='fixed z-50 p-3 bg-gray-800 text-white rounded shadow-lg max-w-md overflow-auto max-h-96'
					style={{
						top: `${tooltipPosition.top}px`,
						left: `${tooltipPosition.left}px`,
						transform: 'translateY(-50%)',
						pointerEvents: 'none',
					}}>
					<pre className='text-xs font-mono whitespace-pre-wrap'>
						{JSON.stringify(address, null, 2)}
					</pre>
				</div>
			)}
		</div>
	);
};
