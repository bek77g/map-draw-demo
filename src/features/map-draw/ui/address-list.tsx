'use client';

import { Address, AddressCard } from '@/entities/address';
import { Loader } from '@/shared/ui/loader';

interface AddressListProps {
  addresses: Address[];
  loading: boolean;
}

export const AddressList = ({ addresses, loading }: AddressListProps) => {
  return (
    <div className='bg-white rounded-lg shadow-lg p-6 h-full border border-gray-200 flex flex-col'>
      <h2 className='text-2xl font-bold mb-4 text-gray-800 border-b pb-2'>
        Найденные адреса
      </h2>

      {loading ? (
        <div className='flex items-center justify-center h-32'>
          <Loader text="Загрузка адресов..." />
        </div>
      ) : addresses.length === 0 ? (
        <div className='flex flex-col items-center justify-center h-32 text-gray-500'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-12 w-12 mb-2'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
            />
          </svg>
          <p className='text-center'>
            Нарисуйте область на карте, чтобы увидеть адреса
          </p>
        </div>
      ) : (
        <div className='flex flex-col'>
          <p className='text-sm text-gray-600 mb-2'>
            Найдено адресов: {addresses.length}
          </p>
          <div className='overflow-y-scroll pr-2 space-y-3 h-[calc(100vh-300px)]'>
            {addresses.map((address, index) => (
              <AddressCard key={index} address={address} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
