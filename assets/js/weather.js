var apiKey = "10af18ddf341c9aa44e1a4e1ec8e5d31";
var weatherIcon = "";
// code begins once city is inputted and search button is clicked
document.getElementById("btnGetWeather").addEventListener("click", function () {
  var city = document.querySelector("input").value;
  console.log(city);

  //obtaining latitude and longitude coordinates from inputted city name via api
  var apiURLCoordinates = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
  fetch(apiURLCoordinates)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      } else return resp.json();
    })

    //inputting the obtained latitude and longitude data back into api to obtain the weather
    .then((data) => {
      console.log(data);
      var language = "en";
      var units = "imperial";
      var lat = data[0].lat;
      var lon = data[0].lon;
      console.log(lat);
      console.log(lon);
      var apiURLWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&lang=${language}`;
      fetch(apiURLWeather)
        .then((resp) => {
          if (!resp.ok) {
            throw new Error(resp.statusText);
          } else return resp.json();
        })
        .then((data) => {
          displayWeather(data);
        })
        .catch(function () {
          console.log(Error);
        })
        .catch(function () {
          console.log(Error);
        });
    });

  //creating html to put weather info
  function displayWeather(resp) {
    console.log(resp);
    console.log(city);
    var todaysWeather = document.querySelector(".today");
    var todaysDate = new Date(resp.current.dt * 1000);
    todaysWeather.innerHTML = `<div class="current-city">
    Current Weather in ${city}  <br />
    on ${todaysDate} <br>
    <img src="http://openweathermap.org/img/wn/${resp.current.weather[0].icon}@2x.png"> <br>
    Temp: ${resp.current.temp} ℉<br />
    <div class="uvindex">UV Index: ${resp.current.uvi}<br /></div>`;

    var futureWeather = document.querySelector(".week");
    futureWeather.innerHTML = resp.daily
      .map((day, idx) => {
        if (idx <= 4) {
          console.log(day);
          weatherIcon = day.weather[0].icon;
          console.log(weatherIcon);
          if (weatherIcon == "01d" || weatherIcon == "01n") {
            console.log("if statement");
            starsrc = "./assets/images/cartoonstar0.png";
          } else {
            console.log("else statement");
            starsrc = "./assets/images/cartoonstar01.png";
          }
          var dt = new Date(day.dt * 1000);
          return `
        
          <div class="card-panel futureWeek" style="width: 100rem"> 
          <h5 class="card-title"></h5>
            <p class="card-text"></p>
              <h5>${dt.toDateString()}</h5>
              <img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="weather type icon"> 
              <br>
        <p>
          Temp: ${day.temp.day} ℉<br />
        </p>
        <img id="star${idx}" class="star" src="${starsrc}" height="150px" width="150px" alt="star moon-indicator">
      </div>
    `;
        }
      })
      .join("");
  }
});
