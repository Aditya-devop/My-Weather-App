let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");

let weatherCache = {}; // Creating a cache for storing responses


let setBackgroundBasedOnTemp = (temp) => {  // Creating a cache for storing responses
    if (temp > 45) {
        document.body.style.background = "linear-gradient(45deg, #ff3300, #ff6600, #ff9900, #ffcc00)";
    } else if (temp > 35) {
        document.body.style.background = "linear-gradient(60deg, #ff6600, #ff9900, #ffcc00, #ffff33)";
    } else if (temp > 30) {
        document.body.style.background = "linear-gradient(75deg, #ff9933, #ffcc00, #ffff66, #ffff99)";
    } else if (temp > 25) {
        document.body.style.background = "linear-gradient(90deg, #ffd633, #ffeb66, #ffff99, #ffffcc)";
    } else if (temp > 20) {
        document.body.style.background = "linear-gradient(105deg, #ffff99, #ccffcc, #99ffcc, #66ffff)";
    } else if (temp > 15) {
        document.body.style.background = "linear-gradient(120deg, #ffffcc, #99ffcc, #66ffcc, #33ccff)";
    } else if (temp > 10) {
        document.body.style.background = "linear-gradient(135deg, #ccffff, #99ccff, #6699ff, #3366ff)";
    } else if (temp > 5) {
        document.body.style.background = "linear-gradient(150deg, #99ccff, #66b3ff, #3399ff, #0073e6)";
    } else if (temp > 0) {
        document.body.style.background = "linear-gradient(165deg, #cceeff, #99d6ff, #66b3ff, #3385ff)";
    } else if (temp > -5) {
        document.body.style.background = "linear-gradient(180deg, #e6f7ff, #ccf2ff, #b3e6ff, #80d4ff)";
    } else {
        document.body.style.background = "linear-gradient(195deg, #f0f8ff, #e0f7ff, #d0f0ff, #c0e0ff)";
    }
};


let displayWeather = (data) => {
    result.innerHTML += `
    <h2>${data.name}</h2>
    <h4 class="desc">${data.weather[0].description}</h4>
    <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
    <h1>${data.main.temp} &#176;</h1>
    <div class="temp-container">
        <div>
            <h4 class="title">min</h4>
            <h4 class="temp">${data.main.temp_min}&#176;</h4>
        </div>
        <div>
            <h4 class="title">max</h4>
            <h4 class="temp">${data.main.temp_max}&#176;</h4>
        </div>
    </div>
  `;

    setBackgroundBasedOnTemp(data.main.temp);
};

// Function to minimize data payload by only requesting essential fields
let minimizeDataPayload = (city) => {
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&fields=name,main.temp,main.temp_min,main.temp_max,weather[0].icon`;
};


// Function to fetch weather data for a single city
let getWeather = (city) => {
    let url = minimizeDataPayload(city);

    // Fetch weather data for the city
    fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            if (data.cod !== 200) {
                throw new Error(`City ${city} not found`);
            }
            weatherCache[city] = data; // Cache the response
            displayWeather(data);
        })
        .catch(() => {
            result.innerHTML += `<h3 class="msg">City ${city} not found</h3>`;
        });
};

// Batch API call for fetching weather data of multiple cities
let fetchWeatherBatch = () => {
    let cityValue = cityRef.value.trim();

    if (cityValue.length === 0) {
        result.innerHTML = `<h3 class="msg">Please enter one or more city names</h3>`;
    } else {
        let cities = cityValue.split(',').map(city => city.trim());

        // Create an array of fetch promises for each city
        let fetchPromises = cities.map(city => {
            let url = minimizeDataPayload(city);
            return fetch(url)
                .then(resp => resp.json())
                .then(data => {
                    if (data.cod !== 200) {
                        throw new Error(`City ${city} not found`);
                    }
                    weatherCache[city] = data;
                    return data;
                })
                .catch(() => {
                    result.innerHTML += `<h3 class="msg">City ${city} not found</h3>`;
                });
        });

        // Fetch all cities weather data in parallel
        Promise.all(fetchPromises)
            .then(dataArray => {
                dataArray.forEach(data => {
                    if (data) {
                        displayWeather(data); // Display the weather data for each city
                    }
                });
            })
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Error fetching data</h3>`;
            });
    }
};


// Main function to determine whether to use batch or single city fetch
let handleWeatherRequest = () => {
    result.innerHTML = '';
    let cityValue = cityRef.value.trim();

    if (cityValue.length === 0) {
        result.innerHTML = `<h3 class="msg">Please enter one or more city names</h3>`;
    } else {
        let cities = cityValue.split(',').map(city => city.trim());

        if (cities.length > 1) {
            fetchWeatherBatch();
        } else {
            getWeather(cities[0]);
        }
    }
};

searchBtn.addEventListener("click", handleWeatherRequest);
window.addEventListener("load", handleWeatherRequest);
