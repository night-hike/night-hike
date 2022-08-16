var apiKey = "10af18ddf341c9aa44e1a4e1ec8e5d31";

// code begins once city is inputted and search button is clicked
document.getElementById("btnGetWeather").addEventListener("click", function () {
  var city = document.querySelector("input").value;
  console.log(city);

  //obtaining latitude and longitude coordinates from inputted city name via api
  var apiURLCoordinates = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
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
    <img src="http://openweathermap.org/img/wn/${resp.current.weather[0].icon}@4x.png"> <br>
    Temp: ${resp.current.temp} ℉<br />
    Wind: ${resp.current.wind_speed} mph<br />
    Humidity: ${resp.current.humidity}% <br />
    <div class="uvindex">UV Index: ${resp.current.uvi}<br /></div>`;

    var futureWeather = document.querySelector(".week");
    futureWeather.innerHTML = resp.daily
      .map((day, idx) => {
        if (idx <= 7) {
          console.log(day);
          var dt = new Date(day.dt * 1000);
          return `<div>
      <div>
        <h5>${dt.toDateString()}</h5>
        <img src="http://openweathermap.org/img/wn/${
          day.weather[0].icon
        }@2x.png"> <br>
        <p>
          Temp: ${day.temp.day} ℉<br />
          Wind: ${day.wind_speed} mph<br />
          Humidity: ${day.humidity}%<br />
        </p>
      </div>
    </div>`;
        }
      })
      .join("");
  }
});
