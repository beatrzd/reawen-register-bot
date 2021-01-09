const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("quick.db");
const config = require("../config.js")

module.exports.run = async (client, message, args) => {

let no = "no emojisi id"; 
let yes = "yes emojisi id";

let embed = new Discord.MessageEmbed().setFooter("Reawen tarafından geliştirildi.").setColor("010000").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp();

let hedefKişi = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

let tag = "tagınız"
let ikinciTag = "tagsızlara yazılacak sembol"

args = args.filter(a => a !== "" && a !== " ").splice(1);
let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
let yaş = args.filter(arg => !isNaN(arg))[0] || "16";
let Isim = `${hedefKişi.user.username.includes(tag) ? tag : (ikinciTag ? ikinciTag : (tag || ""))} ${isim} | ${yaş}`

if(!isim || !yaş) {
message.react(no);
message.channel.send(embed.setDescription(`${client.emojis.cache.get(no)} Geçerli bir isim ve yaş belirtmelisiniz.`))
return;    
};

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

message.react(yes);
hedefKişi.setNickname(Isim);
message.channel.send(embed.setDescription(`${client.emojis.cache.get(yes)} ${hedefKişi} kullanıcısının ismi "${Isim}" olarak değiştirildi.`))
db.push(`isimler.${hedefKişi}`, {Isim: isim, Yaş: yaş, Yetkili: message.author.id})

};

exports.config = {
  name: "isim",
  guildOnly: true,
  aliases: ["name", "nick"],
};
