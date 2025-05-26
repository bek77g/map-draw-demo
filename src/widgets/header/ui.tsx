'use client';

import { APP_META } from '@/shared/config/constants';

interface HeaderProps {
  subtitle?: string;
}

export const Header = ({ subtitle = 'Нарисуйте область на карте, чтобы найти адреса в выбранном регионе' }: HeaderProps) => {
  return (
    <header className='bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 px-6 shadow-md'>
      <div className='container mx-auto'>
        <h1 className='text-2xl md:text-3xl font-bold'>{APP_META.TITLE}</h1>
        <p className='text-blue-100 mt-1'>
          {subtitle}
        </p>
      </div>
    </header>
  );
};
