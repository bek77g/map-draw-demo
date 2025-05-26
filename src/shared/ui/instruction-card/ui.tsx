'use client';

interface InstructionStep {
  number: number;
  text: string;
}

interface InstructionCardProps {
  title: string;
  steps: InstructionStep[];
}

export const InstructionCard = ({ title, steps }: InstructionCardProps) => {
  return (
    <div className='p-4'>
      <div className='flex items-center mb-4'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-12 w-12 text-blue-500 mr-2'
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
          {title}
        </h2>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm'>
        {steps.map((step) => (
          <div key={step.number} className='flex items-start p-3 bg-blue-50 rounded-lg'>
            <div className='bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 font-bold'>
              {step.number}
            </div>
            <div>{step.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
