let express = require("express");
let router = express.Router();
let CityController = require("../controllers/city.controller")

router.route("/cities").get(CityController.getAllCountries)
router.route("/cities/:q").get(CityController.searchCountries)

exports.cityRouter = router;