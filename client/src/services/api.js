import axios from 'axios';

const URL = 'http://localhost:8000';

export const authenticateSignup = async (data) => {
  try {
    console.log('Payload being sent to /signup:', data); // Debugging log
    return await axios.post(`${URL}/signup`, data);
  } catch (error) {
    console.log('Error while calling signup API', error.response || error.message || error);
  }
};

export const authenticateLogin = async (data) => {
  try {
    console.log('Payload being sent to /login:', data); // Debugging log
    return await axios.post(`${URL}/login`, data);
  } catch (error) {
    console.log('Error while calling login API', error.response || error.message || error);
  }
};

export const fetchReviewIntelligence = async (productId) => {
  try {
    return await axios.get(`${URL}/product/${productId}/review-intelligence`);
  } catch (error) {
    console.log('Error while calling review intelligence API', error.response || error.message || error);
    throw error;
  }
};

export const fetchFAQs = async (message, context = {}) => {
  try {
    return await axios.post(`${URL}/faqs`, { message, context });
  } catch (error) {
    console.log('Error while calling FAQs API', error.response || error.message || error);
    throw error;
  }
};