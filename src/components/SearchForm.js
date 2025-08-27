import React, { useState } from 'react';
import './SearchForm.css';

/**
 * SearchForm Component
 * Handles job search input with keyword, location, and country filters
 */
const SearchForm = ({ onSearch, onReset, isLoading }) => {
  const [searchData, setSearchData] = useState({
    what: '',
    where: '',
    country: '00'
  });

  // Country options for the dropdown
  const countries = [
    { code: '00', name: 'Select Country' },
    { code: 'gb', name: 'United Kingdom' },
    { code: 'us', name: 'United States' },
    { code: 'ca', name: 'Canada' },
    { code: 'au', name: 'Australia' },
    { code: 'de', name: 'Germany' },
    { code: 'fr', name: 'France' },
    { code: 'nl', name: 'Netherlands' },
    { code: 'za', name: 'South Africa' },
    { code: 'in', name: 'India' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchData);
  };

  const clearSearchForm = () => {
    setSearchData({
      what: '',
      where: '',
      country: '00'
    });
    // Call the reset handler to clear job results
    if (onReset) {
      onReset();
    }
  };

  return (
    <div className="search-form-container">
      <h1>Job Finder</h1>
      <p className="subtitle">Find your next opportunity with ease</p>
      
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="what">Job Title or Keywords</label>
            <input
              type="text"
              id="what"
              name="what"
              value={searchData.what}
              onChange={handleInputChange}
              placeholder="e.g. Software Developer, Marketing Manager"
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="where">Location</label>
            <input
              type="text"
              id="where"
              name="where"
              value={searchData.where}
              onChange={handleInputChange}
              placeholder="e.g. London, New York, Remote"
              className="form-input"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <select
              id="country"
              name="country"
              value={searchData.country}
              onChange={handleInputChange}
              className="form-select"
            >
              {countries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <button 
              type="submit" 
              className="search-button"
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Search Jobs'}
            </button>
          </div>
          
          <div className="form-group">
            <button 
              type="button" 
              onClick={clearSearchForm}
              className="reset-button"
              disabled={isLoading}
            >
              🔄 Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
