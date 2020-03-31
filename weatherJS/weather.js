class Weather {
  constructor (city) {
    this.apiKey = '153755bd486846c29de161242202503';
    this.city = city;
    // this.state = state;
  }
  async getWeather() {
    const responseLoc = await fetch(`http://api.weatherapi.com/v1/current.json?key=153755bd486846c29de161242202503&q=${this.city}`);

    const responseCur = await fetch(`http://api.weatherapi.com/v1/current.json?key=153755bd486846c29de161242202503&q=${this.city}`);
    
    const locationData = await responseLoc.json();
    const responseData = await responseCur.json();

    return  {
      locationData: locationData.location,
      responseData: responseData.current,
    } 
  }
    changeLocation(city) {
      this.city = city
    }

}
