
const Discord = require('discord.js');
const Canvas = require('canvas');
const config = require("./config.json");
// const fonts = require('google-fonts');
// const Jimp = require("jimp");
// const permanentMarker = require("fontsource-permanent-marker");
const GetGoogleFonts = require('get-google-fonts');

const client = new Discord.Client();

process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error);
});

const applyText = (canvas, text) => {
  const ctx = canvas.getContext('2d');
  let fontSize = 70;

  do {

    ctx.font = `${fontSize -= 10}px sans-serif`;
  } while (ctx.measureText(text).width > canvas.width - 300);

  return ctx.font;
};

new GetGoogleFonts().download('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap')

const prefix = "!";

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === "name") {

    const canvas = Canvas.createCanvas(500, 350);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('https://daycreekhowl.org/wp-content/uploads/2016/11/600px-Hello_my_name_is_sticker.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = '80px Permanent Marker';
    ctx.fillStyle = '#000';
    ctx.fillText(`${args}`, canvas.width / 4, canvas.height / 1.4);

    // ctx.font = applyText(canvas, `${args}`);
    // ctx.fillStyle = 'rgb(0, 0, 0)';
    // ctx.fillText(`${args}`, canvas.width / 2.5, canvas.height / 1.8);

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const attachment = new Discord.MessageAttachment(canvas.toBuffer());
    message.channel.send(attachment);
  }

});

client.login(config.BOT_TOKEN);
