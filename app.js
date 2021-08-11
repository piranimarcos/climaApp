require('dotenv').config()

const { readInput, showMenu, pause } = require("./helpers/inquirer");
const Search = require("./models/serching");


const main = async () => {
  let opt = "";

  const search = new Search();

  do {
    opt = await showMenu();

    // console.log({ opt });

    switch (opt) {
      case "1":
        const place = await readInput("Ciudad:");
        await search.city(place);

        console.log('\nInformación de la ciudad\n'.green,);
        console.log('Ciudad:',);
        console.log('Lat:',);
        console.log('Lng:',);
        console.log('Temperatura:',);
        console.log('Máxima:',);
        console.log('Minima:',);

        break;
      case "2":
        break;
    }

    if (opt !== "0") await pause();
  } while (opt != "0");

  console.log("Adios...");
};

main();
