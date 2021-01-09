const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("quick.db");
const config = require("../config.js")

module.exports.run = async (client, message, args) => {

let no = "no emojisi id"; 
let yes = "yes emojisi id";
let n = no;
let y = yes;

let embed = new Discord.MessageEmbed().setFooter("Reawen tarafından geliştirildi.").setColor("010000").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp();

let hedefKişi = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

if (!message.member.voice.channel) return message.channel.send(embed.setDescription(`${client.emojis.cache.get(yes)} Ses kanalında olmanız gerekmektedir.`))
if (!hedefKişi.voice.channel) return message.channel.send(embed.setDescription(`${client.emojis.cache.get(yes)} Belirttiğiniz üyenin ses kanalında olması gerekmektedir.`))
if (message.member.voice.channelID == hedefKişi.voice.channelID) return message.channel.send(embed.setDescription(`${client.emojis.cache.get(yes)} Belirttiğiniz üye ile aynı ses kanalındasınız!`))

if (message.member.hasPermission("ADMINISTRATOR") && message.member.roles.cache.has("sahip rolü")) {
  await hedefKişi.voice.setChannel(message.member.voice.channelID);
  message.react(yes).catch();
} else {
  const reactionFilter = (reaction, user) => {
    return [yes].includes(reaction.emoji.id) && user.id === hedefKişi.id;
  };
  message.channel.send(`${hedefKişi}`, {embed: embed.setAuthor(hedefKişi.displayName, hedefKişi.user.avatarURL({dynamic: true, size: 2048})).setDescription(`${message.author} isimli üye sizi **${message.member.voice.channel.name}** isimli odaya çekmek istiyor. Kabul etmek için emojiye tıklamalısın!`)}).then(async msj => {
    await msj.react(yes);
    msj.awaitReactions(reactionFilter, {max: 1, time: 15000, error: ['time']}).then(c => {
      let cevap = c.first();
  if (cevap) {
    hedefKişi.voice.setChannel(message.member.voice.channelID);
        msj.delete();
        message.react(yes).catch();
  };
    });
  });
};
};

exports.config = {
  name: "çek",
  guildOnly: true,
  aliases: ["getir", "taşı"],
};