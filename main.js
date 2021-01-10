const Discord = require("discord.js")    
const client = new Discord.Client();      
const config = require("./config.js") 
const fs = require("fs");
const db = require("quick.db");                
require('./util/Loader.js')(client);    

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();  
fs.readdir('./commands/', (err, files) => { 
  if (err) console.error(err);               
  console.log(`${files.length} komut yüklenecek.`); 
  files.forEach(f => {                    
    let props = require(`./commands/${f}`);
    console.log(`${props.config.name} komutu yüklendi.`); 
    client.commands.set(props.config.name, props);
    props.config.aliases.forEach(alias => {       
      client.aliases.set(alias, props.config.name);
    });
  });
})

client.login(config.token)

client.on("guildMemberAdd", reawMember => {
let tag = "";
let tagsızSembolü = "";
if (reawMember.user.username.includes(tag)) {
reawMember.setNickname(`${tag} İsim | Yaş`)
} else if (!reawMember.user.username.includes(tag)) {
  reawMember.setNickname(`${tagsızSembolü} İsim | Yaş`)
}
reawMember.roles.add("kayıtsız rolü");
})

client.on("userUpdate", async (oldUser, newUser) => { 
  let sunucu = `sunuuc id`;
  let kanal = `kanal id`;
  let taglı = `taglı rol id`;

  let tag = `taglı sembol`;
  let untag = `tagsız sembol`;

  let channel = client.guilds.cache.get(sunucu).channels.cache.get(kanal);

  if (oldUser.username !== newUser.username) {
    if (
      newUser.username.includes(tag) &&
      !client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
        .roles.cache.has(taglı)
    ) {
      await client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
        .roles.add(taglı);

      await client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
        .setNickname(
          client.guilds.cache
            .get(sunucu)
            .members.cache.get(newUser.id)
            .displayName.replace(untag, tag)
        );

      channel.send(`${newUser} adlı kullanıcı "${tag}" sembolünü kullanıcı adına ekleyerek ailemize katıldı.`);
    }
    if (
      !newUser.username.includes(tag) &&
      client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
        .roles.cache.has(taglı)
    ) {
      if (db.fetch(`taglıAlım.${sunucu}`)) {
        await client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
        .roles.remove(taglı);
        await client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
        .roles.set(["kayıtsız rol idsi", "kayıtsız rol idsi"] || []);
      }
      await client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
        .roles.remove(taglı);

      await client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
        .setNickname(
          client.guilds.cache
            .get(sunucu)
            .members.cache.get(newUser.id)
            .displayName.replace(tag, untag)
        );
      channel.send(`${newUser} adlı kullanıcı "${tag}" sembolünü kullanıcı adından kaldırarak ailemizden ayrıldı.`);
    }
  }
});

client.on("guildMemberAdd", reawMember => {
let g = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
const a = new Discord.MessageAttachment("https://cdn.discordapp.com/attachments/791383400664793098/797003351564353576/standard.gif");
reawMember.guild.channels.cache.get("kayıt kanal idsi").send(`
Sunucumuza hoşgeldin, ${reawMember}! Seninle birlikte ${reawMember.guild.memberCount} kişiyiz! ${g ? ":no_entry_sign:" : ""}

Sunucumuzdaki odalara erişim sağlayabilmek için "Teyit Kanallarında" kayıt olduktan sonra isim yaş belirtmen gerekmektedir.

Seninle <@&TEYİTÇİ ROL İD> rolündei arkadaşlarımız ilgilenecektir.

Hesabın: ${g ? "Tehlikeli!" : "Güvenli!"}
`, a)
if (g) {
reawMember.roles.set(["FAKE HESAP ROLÜ"])
reawMember.roles.add("FAKE HESAP ROLÜ")
return;  
}
})

