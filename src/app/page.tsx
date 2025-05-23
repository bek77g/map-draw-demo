import MapWithDraw from '@/components/MapWithDraw';

export default function HomePage() {
	return (
		<main className='p-6'>
			<h1 className='text-2xl font-bold mb-4'>Рисование границы на карте</h1>
			<MapWithDraw />
		</main>
	);
}
