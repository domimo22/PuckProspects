const express = require('express');
const router = express.Router(); // You may need to install this dependency
const axios = require('axios');
const cheerio = require('cheerio');

// Sample endpoint to get a list of NHL teams
router.get('/teams', async (req, res) => {
  try {
    const response = await axios.get('https://api.nhle.com/stats/rest/en/team');
    const teams = response.data.data;
    res.json({ success: true, data: teams });
  } catch (error) {
    console.error('Error fetching NHL teams:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Sample data scraping endpoint
app.get('/scrape', async (req, res) => {
  try {
    const url = 'https://www.eliteprospects.com/draft-center/eliteprospects.com'; // Replace with the actual URL
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Use Cheerio to traverse and extract data from the HTML
    const title = $('title').text();
    const description = $('meta[name="description"]').attr('content');

    res.json({ title, description });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
