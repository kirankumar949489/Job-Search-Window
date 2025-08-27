import React from 'react';
import './JobResults.css';

/**
 * JobResults Component
 * Displays search results with job listings and pagination
 */
const JobResults = ({ jobs, totalJobs, currentPage, onPageChange, onJobClick, isLoading, error }) => {
  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h3>⚠️ Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Searching for jobs...</p>
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="no-results">
        <h3>No jobs found</h3>
        <p>Try adjusting your search criteria or location.</p>
      </div>
    );
  }

  const formatSalary = (salaryMin, salaryMax) => {
    if (!salaryMin && !salaryMax) return 'Salary not specified';
    if (salaryMin && salaryMax) {
      return `£${salaryMin.toLocaleString()} - £${salaryMax.toLocaleString()}`;
    }
    return salaryMin ? `£${salaryMin.toLocaleString()}+` : `Up to £${salaryMax.toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const truncateDescription = (description, maxLength = 200) => {
    if (!description) return 'No description available';
    return description.length > maxLength 
      ? description.substring(0, maxLength) + '...' 
      : description;
  };

  return (
    <div className="job-results-container">
      <div className="results-header">
        <h2>Job Results</h2>
        <p className="results-count">
          Found {totalJobs?.toLocaleString()} jobs
        </p>
      </div>

      <div className="job-list">
        {jobs.map((job, index) => (
          <div key={job.id || index} className="job-card" onClick={() => onJobClick(job)}>
            <div className="job-header">
              <h3 className="job-title">
                <span className="job-link">
                  {job.title}
                </span>
              </h3>
              <div className="job-company">
                {job.company?.display_name}
              </div>
            </div>

            <div className="job-details">
              <div className="job-location">
                📍 {job.location?.display_name}
              </div>
              <div className="job-salary">
                💰 {formatSalary(job.salary_min, job.salary_max)}
              </div>
              <div className="job-date">
                📅 Posted: {formatDate(job.created)}
              </div>
            </div>

            <div className="job-description">
              <p>{truncateDescription(job.description)}</p>
            </div>

            <div className="job-footer">
              <div className="job-category">
                {job.category?.label}
              </div>
              <div className="job-actions">
                <button 
                  className="view-details-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onJobClick(job);
                  }}
                >
                  View Details
                </button>
                <a 
                  href={job.redirect_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="apply-button"
                  onClick={(e) => e.stopPropagation()}
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="page-info">
          Page {currentPage}
        </span>
        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={jobs.length < 20}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default JobResults;
