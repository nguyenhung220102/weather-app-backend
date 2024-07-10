let express = require("express");
let router = express.Router();
let WeatherController = require("../controllers/weather.controller")

router.route("/weathers").get(WeatherController.getWeatherData)

exports.weatherRouter = router;