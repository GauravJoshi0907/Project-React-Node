const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3001;

const API_ENDPOINT = 'https://jsonplaceholder.typicode.com/users';

app.get('/api/users', async (req, res) => {
  try {
    const response = await axios.get(API_ENDPOINT);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data from the API' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
