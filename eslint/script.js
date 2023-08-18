const searchbar = document.getElementById("searchbar");
const searchbtn = document.getElementById("searchbtn");
const cityName = document.getElementById("city");
const tempDisplay = document.getElementById("temp");
const countryDisplay = document.getElementById("country");

const weatherObjectFactory = (name, region, country, temp) => ({
  name,
  region,
  country,
  temp,
});

const searchHistory = [];

function display(object) {
  cityName.innerHTML = object.name;
  tempDisplay.innerHTML = `${object.temp}C`;
  countryDisplay.innerHTML = object.country;
}

async function getData(value) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=e3d0feff70e54b7f86f70022231708&q=${value}`,
      {
        mode: "cors",
      },
    );

    const weatherData = await response.json();
    console.log(weatherData);
    console.log(weatherData.location.name);

    const myObject = weatherObjectFactory(
      weatherData.location.name,
      weatherData.location.region,
      weatherData.location.country,
      weatherData.current.temp_c,
    );
    console.log(myObject);
    searchHistory.push(myObject);
    console.log(searchHistory);
    display(myObject);
  } catch (err) {
    // catches errors both in fetch and response.json
    console.log(err);
  }
}
// getData().catch(alert);

function searchParse() {
  console.log(searchbar.value);
  const { value } = searchbar;
  getData(value);
  searchbar.value = "";
}

searchbtn.addEventListener("click", searchParse);
