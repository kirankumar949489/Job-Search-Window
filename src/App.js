import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import JobResults from './components/JobResults';
import AdvancedFilters from './components/AdvancedFilters';
import JobModal from './components/JobModal';
import { searchJobs } from './services/adzunaApi';
import './App.css';

/**
 * Main App Component
 * Manages the application state and coordinates between search form and results
 */
function App() {
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState(null);
  const [advancedFilters, setAdvancedFilters] = useState({});
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobModal, setShowJobModal] = useState(false);

  /**
   * Handle job search from SearchForm component
   */
  const handleSearch = async (searchData) => {
    // Prevent search if no country is selected
    if (searchData.country === '00') {
      setError('Please select a country to search for jobs.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setCurrentPage(1);
    setSearchParams(searchData);

    try {
      const response = await searchJobs(
        searchData.country,
        searchData.what,
        searchData.where,
        1,
        20,
        advancedFilters
      );

      setJobs(response.results || []);
      setTotalJobs(response.count || 0);
    } catch (err) {
      setError(err.message);
      setJobs([]);
      setTotalJobs(0);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle search form reset
   */
  const handleSearchReset = () => {
    setJobs([]);
    setTotalJobs(0);
    setError(null);
    setSearchParams(null);
    setCurrentPage(1);
  };

  /**
   * Handle pagination
   */
  const handlePageChange = async (newPage) => {
    if (!searchParams || newPage < 1) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await searchJobs(
        searchParams.country,
        searchParams.what,
        searchParams.where,
        newPage,
        20,
        advancedFilters
      );

      setJobs(response.results || []);
      setCurrentPage(newPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle advanced filters change
   */
  const handleFiltersChange = (filters) => {
    setAdvancedFilters(filters);
    
    // Re-run search if we have search params
    if (searchParams) {
      handleSearch(searchParams);
    }
  };

  /**
   * Handle job card click to show modal
   */
  const handleJobClick = (job) => {
    setSelectedJob(job);
    setShowJobModal(true);
  };

  /**
   * Close job modal
   */
  const closeJobModal = () => {
    setShowJobModal(false);
    setSelectedJob(null);
  };

  return (
    <div className="App">
      <SearchForm 
        onSearch={handleSearch} 
        onReset={handleSearchReset}
        isLoading={isLoading} 
      />
      
      <AdvancedFilters
        filters={advancedFilters}
        onFiltersChange={handleFiltersChange}
        isVisible={showAdvancedFilters}
        onToggle={() => setShowAdvancedFilters(!showAdvancedFilters)}
      />
      
      {(jobs.length > 0 || error || isLoading) && (
        <JobResults
          jobs={jobs}
          totalJobs={totalJobs}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onJobClick={handleJobClick}
          isLoading={isLoading}
          error={error}
        />
      )}

      <JobModal
        job={selectedJob}
        isOpen={showJobModal}
        onClose={closeJobModal}
      />
    </div>
  );
}

export default App;
