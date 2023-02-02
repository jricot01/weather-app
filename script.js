let time = document.getElementById("current-time");
setInterval(() => {
  let d = new Date();
  time.innerHTML = d.toLocaleTimeString();
}, 1000);

let weather = {
  apiKey: "a7dcf9ed466ee340e23d7d450d5d4471",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("That city doesn't exist");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { description } = data.weather[0];
    const { temp, temp_max, temp_min, humidity } = data.main;
    const { speed } = data.wind;
    const { visibility } = data;
    console.log(
      name,
      description,
      temp,
      temp_max,
      temp_min,
      humidity,
      speed,
      visibility
    );

    document.querySelector(".city").innerText = name;
    document.querySelector(".current-temp").innerText = Math.round(temp) + "˚F";
    document.querySelector(".clear-sky").innerText = description;
    document.querySelector(".high").innerText = Math.round(temp_max);
    document.querySelector(".low").innerText = Math.round(temp_min);
    document.querySelector(".wind-speed").innerText =
      Math.round(speed) + " mph";
    document.querySelector(".humidity-number").innerText =
      Math.round(humidity) + "%";
    // document.querySelector(".visibility-percent").innerText =
    //   Math.abs(visibility / 1000) * 10 + " mi";
    document.querySelector(".visibility-percent").innerText =
      Math.round((10 * visibility) / 10000) + " mi";
  },

  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search-button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });
