'use client';

import { useEffect } from 'react';

interface SearchFormProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: (e: React.FormEvent) => void;
}

export const SearchForm = ({
  searchQuery,
  onSearchQueryChange,
  onSearch,
}: SearchFormProps) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedQuery = localStorage.getItem('searchQuery');
      if (savedQuery) onSearchQueryChange(savedQuery);
    }
  }, []);

  const handleSearchQueryChange = (query: string) => {
    onSearchQueryChange(query);
    localStorage.setItem('searchQuery', query);
  };

  return (
    <form onSubmit={onSearch} className="m-6 flex justify-end">
      <div className="flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchQueryChange(e.target.value)}
          placeholder="Search Here..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
    </form>
  );
};
