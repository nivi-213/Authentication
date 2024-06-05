const axios = require('axios');

const loginUser = async () => {
  try {
    const response = await axios.post('http://localhost:4000/login', {
      email: 'tommy@example.com',
      password: 'password123',
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error logging in:', error.response ? error.response.data : error.message);
  }
};

export default loginUser;
