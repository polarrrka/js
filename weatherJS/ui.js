class UI {
  constructor() {
    this.loc = document.querySelector('#w-location');
    this.desc = document.querySelector('#w-desc');
    this.string = document.querySelector('#w-string');
    this.details = document.querySelector('#w-details');
    this.icon = document.querySelector('#w-icon');
    this.humidity = document.querySelector('#w-humidity');
    this.feelsLike = document.querySelector('#w-feels-like');
    this.visibility = document.querySelector('#w-visibility');
    this.wind = document.querySelector('#w-wind');
  }

  paint (weather) {
    this.loc.textContent = `${weather.name}, ${weather.country}`;
  }

  other (pocasi) {
    this.string.textContent = `${pocasi.temp_c} °C`;
    this.humidity.textContent = `${pocasi.humidity} %`;
    this.feelsLike.textContent = `${pocasi.feelslike_c} °C`;
    this.visibility.textContent = `${pocasi.vis_km} km`;
    this.wind.textContent = `${pocasi.wind_kph} kph`;
  }

  condition (kondice) {
    this.desc.textContent = kondice.text.toLowerCase();
    this.icon.setAttribute('src', kondice.icon);
  }
}