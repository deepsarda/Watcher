let term = require("terminal-kit").terminal;
const termkit = require("terminal-kit");
const dotenv = require("dotenv");
dotenv.config();
const Discord = require("discord.js");
const ora = require("ora");
const colors = require("colors");
const chalk = require("chalk");
const spinner = ora("Logging into bot.").start();

let a = 0;
let loading = setInterval(() => {
  if (a % 3 == 0) {
    spinner.color = "yellow";
    spinner.text = "Logging into bot..".yellow;
  } else if (a % 3 == 1) {
    spinner.color = "red";
    spinner.text = "Logging into bot...".red;
  } else {
    spinner.color = "green";
    spinner.text = "Logging into bot.".green;
  }
  a++;
}, 500);

let client = new Discord.Client({
  intents: 3276543,
});
client.login(process.env.TOKEN);

client.on("ready", async () => {
  spinner.color = "green";
  spinner.succeed("Logged in as ".green + client.user.tag.bold.yellow);
  clearInterval(loading);
  await wait(1000);
  term.clear();
  term.fullscreen();
  term.grabInput({ mouse: "motion" });
  term.on("key", function (name, matches, data) {
    if (name === "CTRL_C") {
      terminate();
    }
  });
  function terminate() {
    term.grabInput(false);
    setTimeout(function () {
      process.exit();
    }, 100);
  }

  let document = term.createDocument({
    label: "Document",

  });
  let rowMenu = new termkit.RowMenu({
    parent: document,
    x: 0,
    y: 0,
    separator: "|",
    justify: true,
    width: 20,
    items: [
      {
        content: "Servers",
        value: "guilds",
      },
      {
        content: "Channels",
        value: "channel",
      },
    ],
  });

  rowMenu.on("submit", (buttonValue) => {
    if (buttonValue == "guilds") {
      renderGuilds();
    }
    if (buttonValue == "channel") {
      renderChannels();
    }
  });


  let guild;
  let channel;


  
  renderGuilds();


   renderGuilds=()=> {
    term.clear();
    term.fullscreen();
    term.cyan("Choose Server: ");
    let guilds = client.guilds.cache.map((g) => g.name + "-" + g.id);

    term.singleColumnMenu(guilds, {}, function (error, response) {
      if (error) {
        console.error(error);
      } else {
        guild = client.guilds.cache.find(
          (g) =>
            g.id ==
            response.selectedText.split("-")[
              response.selectedText.split("-").length - 1
            ]
        );
        renderChannels();
      }
    });
  }

  renderChannels = () => {
    term.clear();
    term.fullscreen();
    term.cyan("Choose Channel: ");
    let channels = guild.channels.cache
      .sort((a, b) => a.rawPosition - b.rawPosition)
      .filter((c) => c.viewable)
      .filter((c) => c.type == 0)
      .map((c) => c.name + "-" + c.id);

    term.singleColumnMenu(channels, {}, function (error, response) {
      if (error) {
        console.error(error);
      } else {
        channel = guild.channels.cache.find(
          (c) =>
            c.id ==
            response.selectedText.split("-")[
              response.selectedText.split("-").length - 1
            ]
        );
        renderMessages();
      }
    });
  };

  renderMessages = () => {
    term.clear();
    term.fullscreen();
    document.show();
  };
});

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
