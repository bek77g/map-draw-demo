'use client';

import dynamic from 'next/dynamic';

// Динамический импорт компонента карты без SSR
const MapWithDraw = dynamic(() => import('./MapWithDraw'), {
  ssr: false,
  loading: () => (
    <div className='w-full h-[calc(100vh-300px)] flex items-center justify-center bg-gray-100 rounded-lg'>
      <div className='text-center'>
        <div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2'></div>
        <p className='text-gray-600'>Загрузка карты...</p>
      </div>
    </div>
  ),
});

export default function MapClientWrapper() {
  return <MapWithDraw />;
}
