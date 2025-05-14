import { forwardRef } from 'react';

export const LoadingSpinner = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="col-span-4 flex justify-center items-center h-20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
    </div>
  );
});
