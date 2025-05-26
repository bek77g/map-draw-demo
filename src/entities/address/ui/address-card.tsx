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
	// Добавляем ref для tooltip
	const tooltipRef = useRef<HTMLDivElement>(null);

	// Обработчик клика вне tooltip для его закрытия
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			// Проверяем, что клик был не по карточке и не по tooltip
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

		// Добавляем обработчик клика на документ
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// Удаляем обработчик при размонтировании компонента
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [showDetails]);

	// Обновление позиции tooltip с учетом границ экрана
	useEffect(() => {
		if (showDetails && cardRef.current) {
			const rect = cardRef.current.getBoundingClientRect();
			const windowWidth = window.innerWidth;
			const windowHeight = window.innerHeight;

			// Базовые координаты tooltip
			let top = rect.top + window.scrollY + rect.height / 2;
			let left = rect.right + window.scrollX + 10;

			// Проверяем, поместится ли tooltip справа
			const tooltipWidth = 300; // Примерная ширина tooltip
			if (left + tooltipWidth > windowWidth) {
				// Если не помещается справа, размещаем слева от карточки
				left = rect.left + window.scrollX - tooltipWidth - 10;
			}

			// Проверяем, не выходит ли tooltip за верхнюю или нижнюю границу
			const tooltipHeight = 300; // Примерная высота tooltip
			if (top - tooltipHeight / 2 < window.scrollY) {
				// Если выходит за верхнюю границу
				top = window.scrollY + tooltipHeight / 2 + 10;
			} else if (top + tooltipHeight / 2 > window.scrollY + windowHeight) {
				// Если выходит за нижнюю границу
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

			{/* Tooltip with full address object as code */}
			{showDetails && (
				<div
					ref={tooltipRef}
					className='fixed z-[999] p-3 bg-gray-800 text-white rounded shadow-lg max-w-md overflow-auto max-h-96'
					style={{
						top: `${tooltipPosition.top}px`,
						left: `${tooltipPosition.left}px`,
						transform: 'translateY(-50%)',
						pointerEvents: 'auto', // Изменено на 'auto', чтобы tooltip мог получать события мыши
					}}>
					<div className='flex justify-between items-center mb-2'>
						<span className='font-bold'>Данные адреса</span>
						<button
							className='text-gray-300 hover:text-white'
							onClick={e => {
								e.stopPropagation(); // Предотвращаем всплытие события
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
