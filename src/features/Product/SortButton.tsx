import { useEffect, useState } from 'react';

interface SortButtonProps {
  onSort: (sortBy: string, order: 'asc' | 'desc' | 'null') => void;
}

const sortOptions = [
  { label: 'Default', value: 'null', order: 'null' as const },
  { label: 'Rating: High to Low', value: 'rating', order: 'desc' as const },
  { label: 'Rating: Low to High', value: 'rating', order: 'asc' as const },
];

export const SortButton = ({ onSort }: SortButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedSortQuery = localStorage.getItem('sortQuery');
    if (savedSortQuery) {
      const { sortBy, order } = JSON.parse(savedSortQuery);
      onSort(sortBy, order);
    }
  }, []);

  const handleSortQueryChange = (
    sortBy: string,
    order: 'asc' | 'desc' | 'null',
  ) => {
    onSort(sortBy, order);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        sort
      </button>
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            {sortOptions.map((option) => (
              <button
                key={`${option.value}-${option.order}`}
                onClick={() => {
                  handleSortQueryChange(option.value, option.order);
                  setIsOpen(false);
                }}
                className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
