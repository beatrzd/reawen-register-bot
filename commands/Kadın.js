const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("quick.db");
const config = require("../config.js")

module.exports.run = async (client, message, args) => {

let no = "no emojisi id"; 
let yes = "yes emojisi id";

let embed = new Discord.MessageEmbed().setFooter("Reawen tarafından geliştirildi.").setColor("010000").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp();

let hedefKişi = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

if (!message.member.roles.cache.some(r => ["rol1", "rol2"].includes(r.id)) && !message.member.hasPermission("ADMINISTRATOR")) {
message.react(no);
message.channel.send(embed.setDescription(`${client.emojis.cache.get(no)} Bu komutu kullanabilmek için yeterli yetkiye sahip değilsiniz.`))
return;    
};

if(!hedefKişi) {
message.react(no);
message.channel.send(embed.setDescription(`${client.emojis.cache.get(no)} Geçerli bir üye belirtmelisiniz.`))
return;    
};

if (db.fetch(`taglıAlım.${message.guild.id}`)) {
if(!hedefKişi.user.username.includes("tagınız") && !hedefKişi.roles.cache.has("vip rolü") && !hedefKişi.roles.cache.has("booster rolü")) {
message.channel.send(embed.setDescription(`${hedefKişi} isimli üye tagımızı almadığı için kayıt işlemi tamamlanamadı.`))    
};
return;   
}

db.add(`kızTeyit.${message.author.id}`, 1);
db.add(`topTeyit.${message.author.id}`, 1);
hedefKişi.roles.add("kadın rol idsi");
hedefKişi.roles.remove("kayıtsız rol idsi");
message.react(yes);
message.channel.send(embed.setDescription(`${client.emojis.cache.get(yes)} ${hedefKişi} isimli üye başarıyla kayıt edildi.`))
};

exports.config = {
  name: "kadın",
  guildOnly: true,
  aliases: ["k", "kız", "woman"],
};
