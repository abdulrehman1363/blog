const axios = require("axios");

const fetchFromAPI = async (body, api_key, url) => {
  try {
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+ api_key 
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
  
};

module.exports = {
  fetchFromAPI,
};
