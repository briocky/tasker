'use client';
import { Step } from '@/types/stepper/stepper-types';

export default function Stepper({ steps, activeStep }: { steps: Step[]; activeStep: number }) {
  return (
    <ol className="flex m-1 items-center justify-center p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white sm:text-base sm:p-4 sm:space-x-4">
      {steps.map((step) => (
        <li key={step.number} className={'flex items-center ' + (step.number === activeStep ? 'text-blue-600' : '')}>
          <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-solid rounded-full shrink-0">
            {step.number}
          </span>
          {step.name}
          <svg
            className={'w-3 h-3 ml-2 sm:ml-4 ' + (step.number === steps.length ? 'hidden' : '')}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
        </li>
      ))}
    </ol>
  );
}
