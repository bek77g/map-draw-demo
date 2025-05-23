import MapWithDraw from '@/components/MapWithDraw';

export default function HomePage() {
	return (
		<main className='min-h-screen bg-gray-50'>
			{/* Header */}
			<header className='bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 px-6 shadow-md'>
				<div className='container mx-auto'>
					<h1 className='text-2xl md:text-3xl font-bold'>Карта с адресами</h1>
					<p className='text-blue-100 mt-1'>
						Нарисуйте область на карте, чтобы найти адреса в выбранном регионе
					</p>
				</div>
			</header>

			{/* Main Content */}
			<div className='container mx-auto px-4 py-6'>
				<div className='bg-white rounded-xl shadow-lg overflow-hidden'>
					<div className='p-4'>
						<div className='flex items-center mb-4'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6 text-blue-500 mr-2'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
								/>
							</svg>
							<h2 className='text-xl font-semibold text-gray-800'>
								Инструкция по использованию
							</h2>
						</div>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm'>
							<div className='flex items-start p-3 bg-blue-50 rounded-lg'>
								<div className='bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 font-bold'>
									1
								</div>
								<div>
									Нажмите на кнопку рисования многоугольника или прямоугольника
									на карте
								</div>
							</div>
							<div className='flex items-start p-3 bg-blue-50 rounded-lg'>
								<div className='bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 font-bold'>
									2
								</div>
								<div>Выделите интересующую вас область на карте</div>
							</div>
							<div className='flex items-start p-3 bg-blue-50 rounded-lg'>
								<div className='bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 font-bold'>
									3
								</div>
								<div>Просмотрите найденные адреса в панели справа</div>
							</div>
						</div>
					</div>

					{/* Map Component */}
					<MapWithDraw />
				</div>
			</div>

			{/* Footer */}
			<footer className='bg-gray-800 text-gray-300 py-4 px-6 mt-8'>
				<div className='container mx-auto text-center text-sm'>
					<p>
						© {new Date().getFullYear()} Карта с адресами. Разработано bek77g.
						Данные предоставлены OpenStreetMap.
					</p>
					<p className='mt-2'>
						<a
							href='https://github.com/bek77g'
							target='_blank'
							rel='noopener noreferrer'
							className='text-blue-400 hover:text-blue-300 transition-colors'>
							GitHub
						</a>
					</p>
				</div>
			</footer>
		</main>
	);
}
