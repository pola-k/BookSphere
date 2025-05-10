// components/SearchBar.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center border-[0.25vh] border-[var(--bordercolor)] bg-[var(--bgcolorlight)] text-[var(--headingcolordark)] rounded-4xl px-[1vw] py-[1.25vh] w-[50vw] text-[1vw]">
      <input
        type="text"
        placeholder="Search for books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="outline-none w-full bg-transparent"
      />
      <button type="submit" className="text-gray-500 hover:cursor-pointer">
        <img src="/images/search.png" alt="Search" className='h-[1.5vw]' />
      </button>
    </form>
  );
}
