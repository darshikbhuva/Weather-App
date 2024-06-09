const con = document.querySelector(".main-con");
const input = document.querySelector(".input input");
const btn = document.getElementById("btn");
let photo = document.getElementById("photo");

window.addEventListener("load", () => getdata("surat"));

btn.addEventListener("click", () => {
  console.log(input.value);
  let query = input.value;
  getdata(query);
});

const url = "https://yahoo-weather5.p.rapidapi.com/weather?location=";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "3784b197f0mshef705fcf790b9dcp1201e2jsn2faad5032016",
    "x-rapidapi-host": "yahoo-weather5.p.rapidapi.com",
  },
};

async function getdata(query) {
  try {
    const response = await fetch(`${url}${query}&format=json&u=f`, options);
    const result = await response.json();
    console.log(result.current_observation.condition.text);
    let celc = (
      (result.current_observation.condition.temperature - 32) *
      (5 / 9)
    ).toFixed(2);

    if (result.current_observation.condition.text.includes("Cloudy") == true) {
      photo.src = "weather-app-img/clouds.png";
    }
    if (result.current_observation.condition.text.includes("Rain") == true) {
      photo.src = "weather-app-img/rain.png";
    }
    if (result.current_observation.condition.text.includes("Snow") == true) {
      photo.src = "weather-app-img/snow.png";
    }
    if (result.current_observation.condition.text.includes("Haze") == true) {
      photo.src = "weather-app-img/mist.png";
    }
    if (result.current_observation.condition.text.includes("Sunny") == true) {
      photo.src = "weather-app-img/clear.png";
    }
    if (result.current_observation.condition.text.includes("Showers") == true) {
      photo.src = "weather-app-img/drizzle.png";
    }

    con.innerHTML = ` <div class="main-data">
            <div class="Weather">
              <img src="${photo.src}" alt="" id="photo" />
            </div>
            <div class="temp">
              <h1>${celc}<sup>o</sup>c</h1>
              <h2>${result.location.city}</h2>
            </div>

            <div class="data">
              <div class="data-1">
                <div class="data-img">
                  <img src="weather-app-img/humidity.png" alt="" />
                </div>
                <div class="details">
                  <p class="font">${result.current_observation.atmosphere.humidity}%</p>
                  <p class="span">Humidity</p>
                </div>
              </div>
              <div class="data-1">
                <div class="data-img">
                  <img src="weather-app-img/wind.png" alt="" />
                </div>
                <div class="details">
                  <p class="font">${result.current_observation.wind.speed} km/h</p>
                  <p class="span">Wind Speed</p>
                </div>
              </div>
            </div> 
           </div> `;
  } catch (error) {
    console.error(error);
  }
}
