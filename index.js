const dotenv = require("dotenv");
dotenv.config();
const Discord = require("discord.js");
const ora = require("ora");
const colors = require("colors");
const chalk = require("chalk");
const spinner = ora("Logging into bot.").start();
const blessed = require("./blessed");

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

let prefix = "/";
client.on("ready", async () => {
  // Clear the loading spinner
  spinner.color = "green";
  spinner.succeed("Logged in as ".green + client.user.tag.bold.yellow);
  clearInterval(loading);

  await wait(1000);


  client.on("messageCreate", renderMessage);
  //Create the screen
  let screen = blessed.screen({
    fullUnicode: true,
    forceUnicode: true,
    useBCE: false,
    debug: true,
  });

  let prompt = blessed.prompt({
    parent: screen,
    keys: true,
    vi: true,
    mouse: true,
    tags: true,
  });

  screen.enableKeys();
  screen.enableMouse();
  screen.key(["escape", "q", "C-c"], function (ch, key) {
    console.clear();
    return process.exit(0);
  });
  setInterval(() => {
    screen.render();
  }, 1000 / 20);

  //Variables
  let guild, channel, serverList, channelList, messageList, input;
  input = blessed.textarea({
    keys: true,
    vi: true,
    mouse: true,
    bottom: 0,
    height: "15%",
    padding: {
      top: 1,
      left: 2,
    },
    fg: "#caced6",
    bg: "grey",
    focus: {
      fg: "#f6f6f6",
      bg: "black",
    },
    width: "100%",
    inputOnFocus: true,
  });

  input.key(["escape", "q", "C-c"], function (ch, key) {
    return process.exit(0);
  });

  input.key(["enter"], function (ch, key) {
    let message = input.getValue();
    if (message.length > 0) {
      input.clearValue();
    }

    try {
      if (message.startsWith(prefix)) {
        args = message.slice(prefix.length).trim().split(" ");
        cmd = args.shift().toLowerCase();
        if (cmd === "attach") {
          channel.send("", { files: args });
        }
        if (cmd === "watching") {
          client.user.setPresence({
            activity: { name: args.join(" "), type: "WATCHING" },
            status: "online",
          });
        }
        if (cmd === "listening") {
          client.user.setPresence({
            activity: { name: args.join(" "), type: "LISTENING" },
            status: "online",
          });
        }
        if (cmd === "playing") {
          client.user.setPresence({
            activity: { name: args.join(" "), type: "PLAYING" },
            status: "online",
          });
        }
        if (cmd === "streaming") {
          client.user.setPresence({
            activity: { name: args.join(" "), type: "STREAMING" },
            status: "online",
          });
        }

        if (cmd === "rickroll" || cmd === "rick") {
          rickrolls = [
            "https://tenor.com/view/rick-astley-rick-roll-dancing-dance-moves-gif-14097983",
            "https://tenor.com/view/stick-bug-rick-roll-lol-gif-18118062",
            "https://tenor.com/view/cant-trust-anybody-bird-turn-the-picture-upside-down-rick-rolled-rick-astley-gif-17818758",
            "https://tenor.com/view/things-that-you-shouldnt-stare-at-for-too-long-the-sun-winnie-the-pooh-rickroll-rick-astley-gif-16585085",
            "https://tenor.com/view/rickroll-rickastley-gif-18012371",
            "https://tenor.com/view/rickroll-rick-astley-pupzyy-never-gonna-give-you-up-meme-gif-20503685",
          ];
          channel.send(rickrolls[Math.floor(Math.random() * rickrolls.length)]);
        }
        if (cmd === "embed") {
          parts = args.join(" ").split("|");

          let embed = {};

          for (var part of parts) {
            var field = part.split("=")[0];
            var value = part.split("=")[1];

            if (field == "footer") {
              embed["footer"] = { text: value };
            } else {
              embed[field] = value;
            }
          }

          channel.send({ embeds: [embed] });
        }
        if (cmd == "catgif") {
          var catgifs = [
            "https://tenor.com/view/kitten-gif-20287812",
            "https://tenor.com/view/cat-cats-wake-up-cat-wake-up-wake-up-cat-gif-23378135",
            "https://tenor.com/view/cat-catfat-fat-gif-20536846",
            "https://tenor.com/view/blush-cats-makeup-gif-9370615",
            "https://tenor.com/view/cat-yawn-stf-5614426",
            "https://66.media.tumblr.com/1c78df6a8289fb58bf5625a360c1f7be/tumblr_paj8ie4mM31wvo7i8o1_640.gif",
            "https://tenor.com/view/cat-funny-cat-pc-cat-reading-workaholics-gif-14796708",
            "https://tenor.com/view/happy-gif-18305223",
            "https://tenor.com/view/cat-hilarious-funny-lolcat-hungry-gif-9768957",
            "https://tenor.com/view/reddit-cat-adorable-gif-3955326",
            "https://tenor.com/view/catoo-cats-cute-cat-cute-animals-dancin-gif-15210455",
            "https://tenor.com/view/cat-sleep-tired-cute-fall-gif-17673985",
            "https://tenor.com/view/sad-sad-face-cat-sad-cat-cute-gif-18410833",
            "https://tenor.com/view/m%C3%A8o-cat-gif-18182736",
            "https://tenor.com/view/cat-skateboard-skateboard-cat-kitten-cranberry-gif-19259821",
            "https://tenor.com/view/cat-catt-brush-cuddle-gif-12853117",
            "https://tenor.com/view/uwu-cute-kiss-cat-muah-cat-muah-gif-22484088",
            "https://tenor.com/view/cat-gif-19827448",
            "https://tenor.com/view/jinny-jinnytty-simba-cat-widepeepohappy-gif-21692591",
            "https://tenor.com/view/kitten-videogame-video-games-woofer-mc-wooferson-champ-gif-14178290",
            "https://tenor.com/view/gaming-cat-gaming-kitten-cute-cat-cute-kitten-gif-19682588",
            "https://tenor.com/view/cat-squish-cat-cat-head-rub-head-rub-discord-gif-20128447",
          ];

          channel.send(catgifs[Math.floor(Math.random() * catgifs.length)]);
        }
        if (cmd == "emote") {
          let emote;
          const emoteName = args.join(" ");

          emote = client.emojis.cache.find((emoji) => emoji.name == emoteName);

          if (!emote) channel.send(`:${emoteName}:`);
          else channel.send(emote.toString());
        }
        if (cmd == "doggif") {
          var doggifs = [
            "https://tenor.com/view/malamute-alaskan-gif-18394697",
            "https://tenor.com/view/dogs-wait-for-me-puppies-animals-fur-babies-gif-20183332",
            "https://tenor.com/view/dog-riding-in-a-car-windy-looking-around-strolling-dog-gif-14284934",
            "https://tenor.com/view/code-brenden-brenfam-corgi-corgi-water-dog-gif-23791142",
            "https://tenor.com/view/scratching-cat-dont-talk-to-me-get-away-back-off-let-me-kiss-you-gif-14331453",
            "https://tenor.com/view/swing-puppies-gif-10865180",
            "https://tenor.com/view/pembroke-welsh-corgi-confused-cute-walking-looking-gif-12939274",
            "https://tenor.com/view/golden-retriever-pijama-blue-yawing-yawning-gif-13767222",
            "https://tenor.com/view/flap-ears-waving-ears-cute-adorable-smiling-gif-15965618",
            "https://tenor.com/view/puppies-silly-puppy-cute-puppy-doggys-dogs-gif-17639683",
            "https://tenor.com/view/dog-cute-cuddle-puppy-gif-17035360",
            "https://tenor.com/view/dog-hanging-out-hang-in-there-puppy-fur-baby-gif-18568564",
            "https://tenor.com/view/dog-cute-happy-samoyed-puppy-gif-14818829",
            "https://tenor.com/view/husky-tickle-dog-puppy-gif-7934638",
          ];

          channel.send(doggifs[Math.floor(Math.random() * doggifs.length)]);
        }
        if (cmd == "server") {
          renderGuilds();
        }
        if (cmd == "channel") {
          renderChannels();
        }
      } else {
        if (message.includes(":")) {
          let newMessage = "";
          for (let mPart of message.split(" ")) {
            mPart = mPart.trim();

            if (
              mPart.charAt(0) === ":" &&
              mPart.charAt(mPart.length - 1) === ":"
            ) {
              newMessage += `${getEmote(mPart.slice(1, -1))} `;
            } else newMessage += `${mPart} `;
          }
          message = newMessage;
        }

        if (message.trim() != "") {
          channel.send(message);
        }
      }

    } catch (e) {
      console.error(e);
    } 
  });

  messageList = blessed.list({
    align: "left",
    tags: true,
    keys: true,
    vi: true,
    mouse: true,
    width: "100%",
    height: "80%",
    top: 2,
    right: 0,
    border: "line",
    style: {
      item: {
        hover: {
          bg: "blue",
        },
      },
      selected: {
        bg: "blue",
        bold: true,
      },
    },
    items: [],
    search: function (callback) {
      prompt.input("Search:", "", function (err, value) {
        if (err) return;
        return callback(null, value);
      });
    },
  });

  //Boot up.
  renderGuilds();

  //functions
  function renderGuilds() {
    serverList = blessed.list({
      label: "Your servers".bold.cyan,
      tags: true,
      draggable: true,
      top: 1,
      right: 0,
      width: "100%",
      height: "90%",
      keys: true,
      vi: true,
      mouse: true,
      border: "line",
      style: {
        item: {
          hover: {
            bg: "blue",
          },
        },
        selected: {
          bg: "blue",
          bold: true,
        },
      },
      search: function (callback) {
        prompt.input("Search:", "test", function (err, value) {
          if (err) return;
          return callback(null, value);
        });
      },
    });
    serverList.on("select", function (index) {
      guild = index.guild;
      renderChannels();
    });

    //Set the server list
    client.guilds.cache.forEach(function (guild, id) {
      serverList.appendItem(guild.name).guild = guild;
    });
    screen.append(serverList);
    serverList.focus();
    //Remove all the other screen elements
    if (channelList) screen.remove(channelList);
    screen.remove(messageList);
    screen.remove(input);
  }

  function renderChannels() {
    let channels = guild.channels.cache
      .sort((a, b) => a.rawPosition - b.rawPosition)
      .filter((c) => c.viewable)
      .filter((c) => c.type == 0);

    channelList = blessed.list({
      label: "Channels".bold.cyan,
      tags: true,
      draggable: true,
      top: 1,
      right: 0,
      width: "100%",
      height: "90%",
      keys: true,
      vi: true,
      mouse: true,
      border: "line",
      style: {
        item: {
          hover: {
            bg: "blue",
          },
        },
        selected: {
          bg: "blue",
          bold: true,
        },
      },
      search: function (callback) {
        prompt.input("Search:", "test", function (err, value) {
          if (err) return;
          return callback(null, value);
        });
      },
    });
    channelList.on("select", function (index) {
      channel = index.channel;
      renderMessages();
    });

    channels.forEach(function (channel, id) {
      channelList.appendItem(channel.name).channel = channel;
    });

    screen.append(channelList);
    channelList.focus();

    screen.remove(serverList);
    screen.remove(messageList);
    screen.remove(input);
  }

  async function renderMessages() {
    messageList.items = [];

    screen.append(messageList);
    screen.append(input);
    input.focus();
    messageList.setLabel(guild.name.cyan + ">" + channel.name.red);

    screen.remove(channelList);
    screen.remove(serverList);

    let messages = await channel.messages.fetch({ limit: 50 });
    messages = messages.reverse().values();

    for (let message of messages) {
      await renderMessage(message);
    }
  }

  async function renderMessage(message) {
    if (channel) {
      if (channel.id == message.channel.id) {
        let c = message.member
          ? chalk.hex(message.member.displayHexColor)
          : chalk.cyan;
        messageList.addItem(
          (new Date().getHours() + ":" + new Date().getMinutes()).gray +
          " " +
          (c(
            message.author.username +
            ("#" + message.author.discriminator + ":")
          ) +
            " " +
            message.content +
            " \n")
        ).message = message;

        if (message.attachments) {
          let keys = Array.from(message.attachments.values());
          keys.forEach(function (attachment) {
            messageList.addItem("Attachment:".cyan).message = message;

            messageList.addItem(("Name: " + attachment.name).yellow).message =
              message;

            messageList.addItem(("Size: " + attachment.size).blue).message =
              message;

            messageList.addItem(("URL: " + attachment.url).red).message =
              message;
          });
        }

        if (message.embeds.length !== 0) {
          for (var _e = 0, _f = message.embeds; _e < _f.length; _e++) {
            var embed = _f[_e];
            if (embed.title) {
              messageList.addItem(embed.title.cyan + "\n").message = message;
            }
            if (embed.description) {
              messageList.addItem(embed.description.blue).message = message;
            }
            if (embed.fields.length !== 0) {
              for (var _g = 0, _h = embed.fields; _g < _h.length; _g++) {
                var field = _h[_g];
                messageList.addItem(
                  field.name.yellow + ": " + field.value
                ).message = message;
              }
            }
            if (embed.image) {
              messageList.addItem(
                "Image: " +
                ((_a = embed.image) === null || _a === void 0
                  ? void 0
                  : _a.url
                ).green
              ).message = message;
            }
            if (embed.footer) {
              messageList.addItem(
                ((_b = embed.footer) === null || _b === void 0
                  ? void 0
                  : _b.text
                ).grey
              ).message = message;
            }
          }
        }

        messageList.scrollTo(10000);
      }
    }
  }

  const getEmote = (name) => {
    let emote;

    emote = client.emojis.cache.find(
      (emoji) => emoji.name.toLowerCase() == name.toLowerCase()
    );

    if (!emote) return `:${name}:`;
    else return emote.toString();
  };
});

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
