let weather = require('./weather.router').weatherRouter
let email = require('./email.router').emailRouter
let city = require('./city.router').cityRouter

exports.router = (app) => {
    app.use("", weather)
    app.use("", email)
    app.use("", city)
} 