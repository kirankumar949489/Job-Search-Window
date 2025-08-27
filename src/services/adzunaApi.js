import axios from 'axios';

/**
 * Adzuna API Service
 * Handles all API calls to the Adzuna job search API
 */

const BASE_URL = 'https://api.adzuna.com/v1/api';

// Note: You need to register at https://developer.adzuna.com/ to get your API credentials
const API_CONFIG = {
  app_id: process.env.REACT_APP_ADZUNA_APP_ID || 'YOUR_APP_ID',
  app_key: process.env.REACT_APP_ADZUNA_APP_KEY || 'YOUR_APP_KEY'
};

/**
 * Search for jobs using the Adzuna API
 * @param {string} country - Country code (e.g., 'gb', 'us')
 * @param {string} what - Job title or keywords
 * @param {string} where - Location/city
 * @param {number} page - Page number (default: 1)
 * @param {number} resultsPerPage - Results per page (default: 20)
 * @param {Object} filters - Additional filters (salary, job type, sort)
 * @returns {Promise} API response with job listings
 */
export const searchJobs = async (country = 'gb', what = '', where = '', page = 1, resultsPerPage = 20, filters = {}) => {
  try {
    const params = {
      app_id: API_CONFIG.app_id,
      app_key: API_CONFIG.app_key,
      results_per_page: resultsPerPage,
      what: what.trim(),
      where: where.trim()
    };

    // Add advanced filters
    if (filters.salaryMin) {
      params.salary_min = filters.salaryMin;
    }
    if (filters.salaryMax) {
      params.salary_max = filters.salaryMax;
    }
    if (filters.jobType) {
      params.contract = filters.jobType;
    }
    if (filters.sortBy && filters.sortBy !== 'relevance') {
      params.sort_by = filters.sortBy;
    }

    // Remove empty parameters
    Object.keys(params).forEach(key => {
      if (params[key] === '' || params[key] === null || params[key] === undefined) {
        delete params[key];
      }
    });

    const response = await axios.get(
      `${BASE_URL}/jobs/${country}/search/${page}`,
      { params }
    );

    return response.data;
  } catch (error) {
    console.error('Error searching jobs:', error);
    throw new Error(
      error.response?.data?.exception || 
      'Failed to fetch jobs. Please check your API credentials and try again.'
    );
  }
};

/**
 * Get job categories from Adzuna API
 * @param {string} country - Country code (e.g., 'gb', 'us')
 * @returns {Promise} API response with job categories
 */
export const getJobCategories = async (country = 'gb') => {
  try {
    const params = {
      app_id: API_CONFIG.app_id,
      app_key: API_CONFIG.app_key
    };

    const response = await axios.get(
      `${BASE_URL}/jobs/${country}/categories`,
      { params }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch job categories');
  }
};
