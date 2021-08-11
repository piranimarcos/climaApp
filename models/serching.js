const axios = require("axios");

class Search {
  history = ["Santa Fe", "Villa Constitucion", "Rosario"];

  constructor() {}

  get paramsMapBox(){
      return {
        'access_token': process.env.MAPBOX_KEY,
        'limit': 5,
        'lenguaje': 'es',
      };
  }

  async city(place = "") {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapBox
      });

      const res = await instance.get();

      console.log(res.data);

      return [];
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Search;
