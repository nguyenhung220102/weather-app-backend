let axios = require("axios");
let City = require("../models/city.model");

exports.getAllCountries = async (req, res) => {
    try {
        const cities = await City.find();
        res.status(200).json(cities);
    } catch (err) {
        res.status(500).send("Error retrieving citites");
    }
};

exports.searchCountries = async (req, res) => {
    const { q } = req.params;
    try {
        const response = await axios.get(process.env.WEATHER_LOCATION, {
            params: {
                key: process.env.WEATHER_API_KEY,
                q: q,
            },
        });
        res.status(200).json(response.data[0]);
    } catch (err) {
        res.status(500).send("Error retrieving citites");
    }
};
