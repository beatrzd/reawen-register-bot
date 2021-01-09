const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("quick.db");
const config = require("../config.js")

module.exports.run = async (client, message, args) => {

let no = "no emojisi id"; 
let yes = "yes emojisi id";
let n = no;
let y = yes;

let reawSayılar = {
    "0": "0id",
    "1": "1id",
    "2": "2id",
    "3": "3id",
    "4": "4id",
    "5": "5id",
    "6": "6id",
    "7": "7id",
    "8": "8id",
    "9": "9id"
};

let tag = "tagınız";

let embed = new Discord.MessageEmbed().setFooter("Reawen tarafından geliştirildi.").setColor("010000").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp();

message.channel.send(embed.setDescription(`
\`>\` Sunucumuzda toplam ${message.guild.memberCount.toString().split("").map(a => client.emojis.cache.get(reawSayılar[a])).join("")} adet üye bulunmaktadır.
\`>\` Sunucumuzun sesli odalarında ${message.guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.size).reduce((a, b) => a + b).toString().split("").map(a => client.emojis.cache.get(reawSayılar[a])).join("")} adet üye bulunmaktadır.
\`>\` Sunucumuzun tagında ${message.guild.members.cache.filter(m => m.user.username.includes(tag)).size.toString().split("").map(a => client.emojis.cache.get(reawSayılar[a])).join("")} adet üye bulunmaktadır.
`))
};

exports.config = {
  name: "say",
  guildOnly: true,
  aliases: ["count", "sayı"],
};