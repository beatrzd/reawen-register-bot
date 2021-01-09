const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("quick.db");
const config = require("../config.js")

module.exports.run = async (client, message, args) => {

let no = "no emojisi id"; 
let yes = "yes emojisi id";

let embed = new Discord.MessageEmbed().setFooter("Reawen tarafından geliştirildi.").setColor("010000").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp();

let hedefKişi = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;

let vipRolu = "vip rolü id";

if (!message.member.roles.cache.has("sahip rolü") && !message.member.hasPermission("ADMINISTRATOR")) return;

if(!hedefKişi) {
message.react(no);
message.channel.send(embed.setDescription(`${client.emojis.cache.get(no)} Geçerli bir üye belirtmelisiniz.`))
return;    
};
    
hedefKişi.roles.cache.has(vipRolu) ? hedefKişi.roles.remove(vipRolu) : hedefKişi.roles.add(vipRolu) 
return message.react(yes);
};

exports.config = {
  name: "vip",
  guildOnly: true,
  aliases: ["özelüye", "vip"],
};
