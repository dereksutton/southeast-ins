import API_BASE_URL from '../config/api';

/**
 * Submit a quote request to the backend API
 * @param {Object} formData - The form data to submit
 * @returns {Promise<Object>} Response from the API
 */
export const submitQuoteRequest = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/quotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Error submitting quote request:', error);
    throw error;
  }
};
