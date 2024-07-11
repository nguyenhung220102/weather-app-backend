let axios = require('axios')

exports.getWeatherData = async (req, res) => {
    const { city, range } = req.query;

    if (!city) {
      return res.status(400).send('City is required');
    }
  
    try {
      const response = await axios.get(process.env.WEATHER_API_URL, {
        params: {
          key: process.env.WEATHER_API_KEY,
          q: city,
          days: range
        }
      });
      const weatherData = response.data;
      res.status(200).json(weatherData);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving weather data');
    }
};
