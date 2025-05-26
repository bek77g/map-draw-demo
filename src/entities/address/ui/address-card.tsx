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
	const tooltipRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				showDetails &&
				cardRef.current &&
				!cardRef.current.contains(event.target as Node) &&
				tooltipRef.current &&
				!tooltipRef.current.contains(event.target as Node)
			) {
				setShowDetails(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [showDetails]);

	useEffect(() => {
		if (showDetails && cardRef.current) {
			const rect = cardRef.current.getBoundingClientRect();
			const windowWidth = window.innerWidth;
			const windowHeight = window.innerHeight;

			let top = rect.top + window.scrollY + rect.height / 2;
			let left = rect.right + window.scrollX + 10;

			const tooltipWidth = 300;
			if (left + tooltipWidth > windowWidth) {
				left = rect.left + window.scrollX - tooltipWidth - 10;
			}

			const tooltipHeight = 300;
			if (top - tooltipHeight / 2 < window.scrollY) {
				top = window.scrollY + tooltipHeight / 2 + 10;
			} else if (top + tooltipHeight / 2 > window.scrollY + windowHeight) {
				top = window.scrollY + windowHeight - tooltipHeight / 2 - 10;
			}

			setTooltipPosition({ top, left });
		}
	}, [showDetails]);

	return (
		<div
			ref={cardRef}
			className='p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors cursor-pointer'
			onClick={() => setShowDetails(!showDetails)}>
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

			{showDetails && (
				<div
					ref={tooltipRef}
					className='fixed z-[999] p-3 bg-gray-800 text-white rounded shadow-lg max-w-md overflow-auto max-h-96'
					style={{
						top: `${tooltipPosition.top}px`,
						left: `${tooltipPosition.left}px`,
						transform: 'translateY(-50%)',
						pointerEvents: 'auto',
					}}>
					<div className='flex justify-between items-center mb-2'>
						<span className='font-bold'>Данные адреса</span>
						<button
							className='text-gray-300 hover:text-white'
							onClick={e => {
								e.stopPropagation();
								setShowDetails(false);
							}}>
							✕
						</button>
					</div>
					<pre className='text-xs font-mono whitespace-pre-wrap'>
						{JSON.stringify(address, null, 2)}
					</pre>
				</div>
			)}
		</div>
	);
};
