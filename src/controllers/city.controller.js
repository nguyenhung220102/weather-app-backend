let axios = require('axios')
let City = require('../models/city.model')

exports.getAllCountries = async (req, res) => {
    try {
        const cities = await City.find();
        res.status(200).json(cities);
    } catch (err) {
        res.status(500).send('Error retrieving citites');
    }
};

exports.searchCountries = async (req, res) => {
    const { q } = req.params;
    try {
        const cities = await City.find({ 
            name: { $regex: q, $options: 'i' }
        });
        res.status(200).json(cities);
    } catch (err) {
        res.status(500).send('Error retrieving citites');
    }
};
