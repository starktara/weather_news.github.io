require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    const city = req.body.cityName;
    const country = req.body.ctryName;
    const unit = "metric";
    const appKey = process.env.API_KEY;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&units=" + unit + "&appid=" + appKey;

    https.get(url, function (response) {

        response.on("data", function (data) {
            var wData = JSON.parse(data);
            var temp = wData.main.temp;
            var desc = wData.weather[0].description;
            var icon = wData.weather[0].icon;
            var imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>temperture in your city is " + temp + " degree C. </h1>");
            res.write("<h3> cliamte to be: " + desc + "<h3>");
            res.write("<img src= " + imgUrl + " alt='climate image'>");
            res.send();
        });
    })
})



app.listen(3000, function () {
    console.log("port 3000 started");
});