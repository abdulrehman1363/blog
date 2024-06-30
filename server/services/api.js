const axios = require("axios");

const fetchFromAPI = async (body, api_key, url) => {
  try {
    //console.log('body', JSON.stringify(body));
    //console.log('api_key', api_key);
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+ api_key 
      },
    });
    //console.log('response', response);
    //console.log('response', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
  
};

module.exports = {
  fetchFromAPI,
};
