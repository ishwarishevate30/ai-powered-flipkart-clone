import axios from 'axios';

const URL = 'http://localhost:8000';

export const authenticateSignup = async (data) => {
  try {
    console.log('Payload being sent to /signup:', data); // Debugging log
    return await axios.post(`${URL}/signup`, data);
  } catch (error) {
    console.log('Error while calling signup API', error);
  }
};