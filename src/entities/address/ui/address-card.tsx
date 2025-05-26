'use client';

import { Address } from '../model';

interface AddressCardProps {
  address: Address;
}

export const AddressCard = ({ address }: AddressCardProps) => {
  return (
    <div className='p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors'>
      <div className='font-medium text-gray-800'>
        {address.tags?.['addr:housenumber'] || ''}{' '}
        {address.tags?.['addr:street'] || ''}
      </div>
      {address.tags?.['addr:city'] && (
        <div className='text-sm text-gray-600'>
          {address.tags['addr:city']}
        </div>
      )}
      {address.tags?.amenity && (
        <div className='text-sm text-blue-600 mt-1'>
          {address.tags.amenity}
        </div>
      )}
      {address.tags?.['name:en'] && (
        <div className='text-sm italic mt-1'>
          {address.tags['name:en']}
        </div>
      )}
      {address.tags?.opening_hours && (
        <div className='text-xs text-gray-500 mt-1'>
          <span className='font-medium'>Часы работы:</span>{' '}
          {address.tags.opening_hours}
        </div>
      )}
    </div>
  );
};
