let term = require('terminal-kit').terminal;
const dotenv = require('dotenv');
dotenv.config();
const Discord = require('discord.js');
const ora = require('ora');
const colors = require('colors');
const chalk = require('chalk');
const spinner = ora('Logging into bot.').start();

let a = 0;
let loading = setInterval(() => {
    if (a % 3 == 0) {
        spinner.color = 'yellow';
        spinner.text = 'Logging into bot..'.yellow;
    } else if (a % 3 == 1) {
        spinner.color = 'red';
        spinner.text = 'Logging into bot...'.red;
    }
    else {
        spinner.color = 'green';
        spinner.text = 'Logging into bot.'.green;
    }
    a++;
}, 500);


let client = new Discord.Client({
    intents: 3276543,
});
client.login(process.env.TOKEN);

client.on('ready', async () => {
    spinner.color = 'green';
    spinner.succeed('Logged in as '.green + client.user.tag.bold.yellow);
    clearInterval(loading);
    await wait(1000);
    term.clear();
    term.fullscreen();

    term.grabInput({ mouse: 'button' });

    term.on('key', function (name, matches, data) {
        if (name === 'CTRL_C') { terminate(); }
    });

  
    function terminate() {
        term.grabInput(false);
        setTimeout(function () { process.exit() }, 100);
    }


    function renderGuilds() {
        term.clear();
        term.fullscreen();
        term.cyan("Choose Server: ");
        let guilds = client.guilds.cache.map(g => g.name + "-" + g.id);

        term.singleColumnMenu(guilds,{},function(error, response) {
            if (error) {
                console.error(error);
            } else {
                let guild = client.guilds.cache.find(g => g.id == response.selectedText.split("-")[response.selectedText.split("-").length-1]);
               renderChannels(guild);
            }
        });
    }

    renderGuilds();

    renderChannels = (guild) => {
        term.clear();
        term.fullscreen();
        term.cyan("Choose Channel: ");
        let channels = guild.channels.cache.sort((a, b) => a.rawPosition-b.rawPosition).filter((c)=>c.viewable).map(c => c.name + "-" + c.id);
        
        term.singleColumnMenu(channels,{},function(error, response) {
            if (error) {
                console.error(error);
            } else {
                let channel = guild.channels.cache.find(c => c.id == response.selectedText.split("-")[response.selectedText.split("-").length-1]);
                renderMessages(channel);
            }
        });
    }

});


async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}