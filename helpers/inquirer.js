const inquirer = require("inquirer");
require("colors");

const menuOpts = [
  {
    type: "list",
    name: "option",
    message: "¿Que desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Buscar Ciudad`,
      },
      {
        value: "2",
        name: `${"2.".green} Historial`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

const showMenu = async () => {
  console.clear();
  console.log("============================".green);
  console.log("       Seleccione menu      ".green);
  console.log("============================\n".green);

  const { option } = await inquirer.prompt(menuOpts);

  return option;
};

const pause = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"Enter".green} para continuar`,
    },
  ];

  console.log("\n");

  return await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
    },
  ];

  const { desc } = await inquirer.prompt(question);

  return desc;
};

const listDeleteTask = async (task = []) => {
  const choices = task.map((t, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: t.id,
      name: `${idx} ${t.desc}`,
    };
  });

  choices.unshift({
    value: '0',
    name: '0. '.green + 'Cancelar'
  })

  const question = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(question);
  return id;
};

const confirm = async(message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const showCheckList = async (task = []) => {
  const choices = task.map((t, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: t.id,
      name: `${idx} ${t.desc}`,
      checked: (t.completed) ? true : false
    };
  });

  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(question);
  return ids;
}; 

module.exports = {
  showMenu,
  pause,
  readInput,
  listDeleteTask,
  confirm,
  showCheckList
};
