const axios = require("axios");
const fs = require("fs");

class Search {
  history = [];
  dbPath = "./db/database.json";

  constructor() {
    this.readDB();
  }

  get paramsMapBox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      lenguaje: "es",
    };
  }

  get paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      lang: "es",
      units: "metric",
    };
  }

  get historyCapitalized(){
      return this.history.map( place => {
        let word = place.split(' ');
        word = word.map( w => w[0].toUpperCase() + w.substring(1))

        return word.join(' ')
      })
  }

  async city(place = "") {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapBox,
      });

      const res = await instance.get();
      // console.log(res.data);

      return res.data.features.map((r) => ({
        id: r.id,
        name: r.place_name,
        lat: r.center[1],
        lng: r.center[0],
      }));
    } catch (error) {
      return [];
    }
  }

  async weatherPlace(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsOpenWeather, lat, lon },
      });

      const resp = await instance.get();
      const { weather, main } = resp.data;

      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }

  addHistory(place = "") {
    if (!this.history.includes(place.toLocaleLowerCase())) {
      this.history.unshift(place.toLocaleLowerCase());
    }
    this.history = this.history.splice(0,5)

    this.saveDB();
  }

  saveDB() {
    const payload = {
      history: this.history,
    };

    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  readDB() {
    if (!fs.existsSync(this.dbPath)) return
      const places = JSON.parse(fs.readFileSync(this.dbPath, {encoding: 'utf-8'}));
      this.history = places.history;
    
  }
}
module.exports = Search;
