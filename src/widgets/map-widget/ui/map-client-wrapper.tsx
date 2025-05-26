'use client';

import { Loader } from '@/shared/ui/loader';
import dynamic from 'next/dynamic';

const MapWithDraw = dynamic(
	() =>
		import('@/features/map-draw').then(mod => ({ default: mod.MapWithDraw })),
	{
		ssr: false,
		loading: () => (
			<div className='w-full h-[calc(100vh-300px)] flex items-center justify-center bg-gray-100 rounded-lg'>
				<Loader text='Загрузка карты...' />
			</div>
		),
	}
);

export const MapClientWrapper = () => {
	return <MapWithDraw />;
};
