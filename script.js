let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");

let getWeather = () => {
  let cityValue = cityRef.value;

  if (cityValue.length == 0) {
    result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
  }
 
  else {
    document.querySelector(".design").style.display="none"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
    cityRef.value = "";
    fetch(url)
      .then((resp) => resp.json())
    
      .then((data) => {
        console.log(data);
        console.log(data.weather[0].icon);
        console.log(data.weather[0].main);
        console.log(data.weather[0].description);
        console.log(data.name);
        console.log(data.main.temp_min);
        console.log(data.main.temp_max);
        result.innerHTML = `
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
        if(data.weather[0].description=="haze"){
          document.body.style.background="linear-gradient(135deg, orange, blue)";
        }
        else if(data.weather[0].description=="smoke"){
          document.body.style.background="linear-gradient(135deg, gray, black)";
        }
        else if(data.weather[0].description=="scattered clouds"){
          document.body.style.background="linear-gradient(135deg, white, slategray)";
        }
        else if(data.weather[0].description=="broken clouds"){
          document.body.style.background="linear-gradient(135deg,slategray,black)";
        }
        else{
          document.body.style.background="linear-gradient(135deg, #62b8f5, #4475ef)";
        }
      })
      .catch(() => {
        result.innerHTML = `<h3 class="msg">City not found</h3>`;
      });
  }
};
searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);