const storage = new Storage();
const weatherLocation = storage.getLocationData();
const weather = new Weather(weatherLocation.city);
const ui = new UI();



document.addEventListener('DOMcontentLoaded', getWeather());

document.querySelector('#w-change-btn').addEventListener('click', (e) => {
  const city = document.querySelector('#city').value;
  getWeather();
  weather.changeLocation(city);
  storage.setLocationData(city);
  $('#locModal').modal('hide'); //jQuery 
});

function getWeather() {
  weather.getWeather()
    .then(results=> {
      ui.paint(results.locationData);
      ui.other(results.responseData);
      ui.condition(results.responseData.condition)
    })
    .catch(err => console.log(err));
  }
