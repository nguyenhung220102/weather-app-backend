
# Weather Forecast Dashboard Backend

This is a backend for a Weather App provides real-time weather information including temperature, humidity, wind speed, and conditions for any location. It offers a 14-day forecast, allows selection of multiple locations, and sends daily updates via email, ensuring users stay informed.

Weather API service from: [https://www.weatherapi.com](https://www.weatherapi.com) (free version)

Cities list from: [https://openweathermap.org/storage/app/media/cities_list.xlsx](https://openweathermap.org/storage/app/media/cities_list.xlsx).

## URL API DEMO

[https://go-assignment-qrnp.onrender.com/](https://go-assignment-qrnp.onrender.com/) (Please note that the backend is deployed on a free plan using Render.com. The free instance will spin down with inactivity, which can delay requests by 50 seconds or more. Therefore, you may experience delays of up to 1 minute when first browsing this API URL)

## API Reference

#### Get specific location data

```http
  GET /cities/${q}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `q`      | `string` | **Required**. Latitude and Longitude (Decimal degree) e.g: q=48.8567,2.3508 city name e.g.: q=Paris |

#### Get weather data

```http
  GET /weathers?city=${city}&range={range}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `city`      | `string` | **Required**. Latitude and Longitude (Decimal degree) e.g: q=48.8567,2.3508 city name e.g.: q=Paris |
| `range`      | `int` | **Required**. Range of weather data (e.g., 7 for 7 days) |

#### Subscribe to receive daily weather data

```http
  POST /emails
```

| Request body params  | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `city`      | `string` | **Required**. Latitude and Longitude (Decimal degree) e.g: city:"48.8567,2.3508" city name e.g.: city:"Paris" |
| `email`      | `string` | **Required**. User email e.g.: email: "abc@gmail.com" |



## Installation

Install the necessary dependencies
```bash
  npm install
```
Start the application in development mode
```bash
npm start
```
## Environment Variables

To run this project locally, you will need to add the following environment variables to your .env file

`MONGODB_URL` - Connection string to mongoDB

`EMAIL` - Email account

`EMAIL_PASS` - The password created by NodeMailer in Gmail

`WEATHER_API_KEY` - The API free key generated by [https://www.weatherapi.com](https://www.weatherapi.com) (free version)

`WEATHER_API_URL`=http://api.weatherapi.com/v1/forecast.json

`WEATHER_DAILY_API_URL`=http://api.weatherapi.com/v1/current.json

`WEATHER_LOCATION`=http://api.weatherapi.com/v1/search.json

`PORT`=3001

`BACKEND_URL`=http://localhost:3001/
