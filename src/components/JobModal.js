import React from 'react';
import './JobModal.css';

/**
 * JobModal Component
 * Displays detailed job information in a modal overlay
 */
const JobModal = ({ job, isOpen, onClose }) => {
  if (!isOpen || !job) return null;

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
      month: 'long',
      year: 'numeric'
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="job-modal-overlay" onClick={handleOverlayClick}>
      <div className="job-modal-container">
        <div className="job-modal-header">
          <div className="job-modal-title-section">
            <h2 className="job-modal-title">{job.title}</h2>
            <p className="job-modal-company">{job.company?.display_name}</p>
          </div>
          <button onClick={onClose} className="job-modal-close">
            ✕
          </button>
        </div>

        <div className="job-modal-content">
          <div className="job-modal-details">
            <div className="detail-item">
              <span className="detail-icon">📍</span>
              <div className="detail-content">
                <strong>Location</strong>
                <p>{job.location?.display_name}</p>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-icon">💰</span>
              <div className="detail-content">
                <strong>Salary</strong>
                <p>{formatSalary(job.salary_min, job.salary_max)}</p>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-icon">📅</span>
              <div className="detail-content">
                <strong>Posted</strong>
                <p>{formatDate(job.created)}</p>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-icon">🏷️</span>
              <div className="detail-content">
                <strong>Category</strong>
                <p>{job.category?.label || 'Not specified'}</p>
              </div>
            </div>
          </div>

          <div className="job-modal-description">
            <h3>Job Description</h3>
            <div 
              className="description-content"
              dangerouslySetInnerHTML={{ 
                __html: job.description || 'No description available' 
              }}
            />
          </div>

          <div className="job-modal-actions">
            <a 
              href={job.redirect_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="apply-now-button"
            >
              Apply Now on {job.company?.display_name || 'Company Site'}
            </a>
            <button onClick={onClose} className="close-modal-button">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
