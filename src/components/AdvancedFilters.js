import React, { useState } from 'react';
import './AdvancedFilters.css';

/**
 * AdvancedFilters Component
 * Provides additional filtering options for job search
 */
const AdvancedFilters = ({ filters, onFiltersChange, isVisible, onToggle }) => {
  const [localFilters, setLocalFilters] = useState({
    salaryMin: filters.salaryMin || '',
    salaryMax: filters.salaryMax || '',
    jobType: filters.jobType || '',
    sortBy: filters.sortBy || 'relevance',
    ...filters
  });

  // Job type options
  const jobTypes = [
    { value: '', label: 'All Job Types' },
    { value: 'permanent', label: 'Permanent' },
    { value: 'contract', label: 'Contract' },
    { value: 'temporary', label: 'Temporary' },
    { value: 'part_time', label: 'Part Time' },
    { value: 'full_time', label: 'Full Time' }
  ];

  // Sort options
  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'date', label: 'Date Posted' },
    { value: 'salary', label: 'Salary' }
  ];

  const handleFilterChange = (name, value) => {
    const updatedFilters = {
      ...localFilters,
      [name]: value
    };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      salaryMin: '',
      salaryMax: '',
      jobType: '',
      sortBy: 'relevance'
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  if (!isVisible) {
    return (
      <div className="advanced-filters-toggle">
        <button onClick={onToggle} className="toggle-button">
          🔧 Advanced Filters
        </button>
      </div>
    );
  }

  return (
    <div className="advanced-filters-container">
      <div className="filters-header">
        <h3>Advanced Filters</h3>
        <button onClick={onToggle} className="close-button">✕</button>
      </div>

      <div className="filters-grid">
        <div className="filter-group">
          <label htmlFor="salaryMin">Minimum Salary (£)</label>
          <input
            type="number"
            id="salaryMin"
            value={localFilters.salaryMin}
            onChange={(e) => handleFilterChange('salaryMin', e.target.value)}
            placeholder="e.g. 30000"
            className="filter-input"
            min="0"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="salaryMax">Maximum Salary (£)</label>
          <input
            type="number"
            id="salaryMax"
            value={localFilters.salaryMax}
            onChange={(e) => handleFilterChange('salaryMax', e.target.value)}
            placeholder="e.g. 80000"
            className="filter-input"
            min="0"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="jobType">Job Type</label>
          <select
            id="jobType"
            value={localFilters.jobType}
            onChange={(e) => handleFilterChange('jobType', e.target.value)}
            className="filter-select"
          >
            {jobTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sortBy">Sort By</label>
          <select
            id="sortBy"
            value={localFilters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="filter-select"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="filters-actions">
        <button onClick={clearFilters} className="clear-button">
          🔄 Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default AdvancedFilters;
