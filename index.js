
const Discord = require('discord.js');
const Canvas = require('canvas');
const config = require("./config.json");
const http = require('http');

const client = new Discord.Client();

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-type': 'text/plain'
  });
  res.write('Hey');
  res.end();
}).listen(4000);

process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error);
});

const applyText = (canvas, text) => {
  const ctx = canvas.getContext('2d');
  let fontSize = 70;

  do {

    ctx.font = `${fontSize -= 80}px Permanent Marker`;
  } while (ctx.measureText(text).width > canvas.width - 300);

  return ctx.font;
};

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

    ctx.font = '80px arial';
    ctx.fillStyle = '#000';
    ctx.fillText(`${args}`, canvas.width / 4, canvas.height / 1.4);

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const attachment = new Discord.MessageAttachment(canvas.toBuffer());
    message.channel.send(attachment);
  }

});

client.login(config.BOT_TOKEN);
