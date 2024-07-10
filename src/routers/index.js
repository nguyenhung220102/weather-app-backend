let weather = require('./weather.router').weatherRouter
let email = require('./email.router').emailRouter
exports.router = (app) => {
    app.use("", weather)
    app.use("", email)
} 