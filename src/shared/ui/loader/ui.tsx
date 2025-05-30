'use client';

interface LoaderProps {
	text?: string;
	className?: string;
}

export const Loader = ({
	text = 'Загрузка...',
	className = '',
}: LoaderProps) => {
	return (
		<div className={`flex items-center justify-center ${className}`}>
			<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
			<span className='ml-2 text-gray-600'>{text}</span>
		</div>
	);
};
