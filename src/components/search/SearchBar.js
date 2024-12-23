// src/components/search/SearchBar.js
import React, { useState, useEffect, useRef } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  // ข้อมูลจำลองสำหรับ auto-complete
  const sampleProducts = [
    "iPhone 13 Pro",
    "iPhone 14 Pro",
    "Samsung Galaxy S23",
    "MacBook Pro",
    "MacBook Air",
    "iPad Pro",
    "AirPods Pro",
    "Samsung Galaxy Watch",
    "Apple Watch",
    "Gaming Laptop"
  ];

  useEffect(() => {
    // ปิด suggestions เมื่อคลิกนอกกล่องค้นหา
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // กรองข้อเสนอแนะตามคำค้นหา
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      setSelectedIndex(-1);
      return;
    }

    const filtered = sampleProducts.filter(product =>
      product.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestions(filtered);
    setSelectedIndex(-1);
    setIsOpen(true);
  }, [searchTerm]);

  const handleKeyDown = (e) => {
    // ไม่ทำอะไรถ้าไม่มี suggestions หรือปิดอยู่
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault(); // ป้องกันการเลื่อน cursor ใน input
        setSelectedIndex(prevIndex =>
          prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
        );
        break;

      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prevIndex =>
          prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
        );
        break;

      case 'Enter':
        if (selectedIndex >= 0) {
          e.preventDefault();
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;

      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;

      default:
        break;
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    onSearch(suggestion);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
    setSuggestions([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-xl mx-auto" ref={wrapperRef}>
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Input Field */}
        <input
        ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder="Search products..."
          className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        {/* Clear Button */}
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Search Suggestions (Optional) */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <ul className="py-2 max-h-60 overflow-auto">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`px-4 py-2 cursor-pointer flex items-center space-x-2 ${
                  selectedIndex === index ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'
                }`}
              >
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* No Results */}
      {
        isOpen && searchTerm && suggestions.length === 0 && (
          <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="px-4 py-3 text-sm text-gray-500">
              No results found for "{searchTerm}"
        </div>
          </div>
        )
      }
    </div>
  )
};

export default SearchBar;