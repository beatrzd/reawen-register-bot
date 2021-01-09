const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("quick.db");
const config = require("../config.js")

module.exports.run = async (client, message, args) => {

let no = "no emojisi id"; 
let yes = "yes emojisi id";

let embed = new Discord.MessageEmbed().setFooter("Reawen tarafından geliştirildi.").setColor("010000").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp();


message.channel.send(client.ws.ping)
};

exports.config = {
  name: "ping",
  guildOnly: true,
  aliases: [],
};