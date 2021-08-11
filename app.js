require("dotenv").config();
require("colors");

const {
  readInput,
  showMenu,
  pause,
  listPlaces,
} = require("./helpers/inquirer");
const Search = require("./models/serching");

const main = async () => {
  let opt = "";

  const search = new Search();

  do {
    opt = await showMenu();

    // console.log({ opt });

    switch (opt) {
      case "1":
        const query = await readInput("Ciudad:");
        const places = await search.city(query);

        const idPlaceSelected = await listPlaces(places);
        if (idPlaceSelected === "0") continue;

        const placeSelected = await places.find((l) => l.id === idPlaceSelected);

        search.addHistory(placeSelected.name);

        const weather = await search.weatherPlace(
          placeSelected.lat,
          placeSelected.lng
        );

        console.clear();
        console.log("\nInformación de la ciudad\n".green);
        console.log("Ciudad:", placeSelected.name.green);
        console.log("Lat:", placeSelected.lat);
        console.log("Lng:", placeSelected.lng);
        console.log("Temperatura:", weather.temp);
        console.log("Máxima:", weather.max);
        console.log("Minima:", weather.min);
        console.log("Como está el clima:", weather.desc.green);

        break;
      case "2":
        search.historyCapitalized.forEach((place, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${place}`);
        });
        break;
    }

    if (opt !== "0") await pause();
  } while (opt != "0");

  console.log("Adios...");
};

main();
