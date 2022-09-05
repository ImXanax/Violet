const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'guildMemberAdd',
    async execute(member,client){   
      let date = new Date(member.user.createdTimestamp);
        date = `\`${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()} ${date.getHours()}:${
          date.getMinutes()
        }:${date.getSeconds()}\``;
        let joined = new Date(member.joinedTimestamp)
      const welcomeEmbed = new MessageEmbed()
        .setTitle(`𝗪𝗘𝗟𝗖𝗢𝗠𝗘 ${member.user.tag}`)
        .setDescription(`𝗕𝗔𝗟𝗗 𝗖𝗢𝗗𝗘: ${member.guild.memberCount}\n𝗣𝗥𝗢𝗙𝗜𝗟𝗘: <@!${member.id}>\n𝗖𝗥𝗘𝗔𝗧𝗘𝗗: ${date}`)
        .setColor('#36057c')
        .setThumbnail(member.displayAvatarURL({format: "jpg"}))
        .setFooter({text: `ID: ${member.id} | JOINED: ${joined.toUTCString()}`})

      const wlChannelId = `1007018534242631730`
      client.channels.fetch(wlChannelId).then(chl =>{
        chl.send({embeds:[welcomeEmbed]})
      }).catch(e => console.error(`ERR FETCHING CHANNEL: ${e}`))
    },
}; 