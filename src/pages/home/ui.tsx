import { InstructionCard } from '@/shared/ui/instruction-card';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
import { MapClientWrapper } from '@/widgets/map-widget';

const instructionSteps = [
	{
		number: 1,
		text: 'Нажмите на кнопку рисования многоугольника или прямоугольника на карте',
	},
	{
		number: 2,
		text: 'Выделите интересующую вас область на карте',
	},
	{
		number: 3,
		text: 'Просмотрите найденные адреса в панели справа',
	},
];

export const HomePage = () => {
	return (
		<main className='min-h-screen bg-gray-50'>
			{/* Header */}
			<Header />

			{/* Main Content */}
			<div className='container mx-auto px-4 py-6'>
				<div className='bg-white rounded-xl shadow-lg overflow-hidden'>
					<InstructionCard
						title='Инструкция по использованию'
						steps={instructionSteps}
					/>

					{/* Map Component */}
					<MapClientWrapper />
				</div>
			</div>

			{/* Footer */}
			<Footer />
		</main>
	);
};
