'use client';

import { APP_META } from '@/shared/config/constants';

export const Footer = () => {
  return (
    <footer className='bg-gray-800 text-gray-300 py-4 px-6 mt-8'>
      <div className='container mx-auto text-center text-sm'>
        <p>
          © {new Date().getFullYear()} {APP_META.TITLE}. Разработано {APP_META.AUTHOR}.
          Данные предоставлены OpenStreetMap.
        </p>
        <p className='mt-2'>
          <a
            href={APP_META.GITHUB_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-400 hover:text-blue-300 transition-colors'>
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
};
