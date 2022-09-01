const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'guildMemberAdd',
    async execute(member,client){   
      const welcomeEmbed = new MessageEmbed()
        .setTitle(`𝗪𝗘𝗟𝗖𝗢𝗠𝗘 ${member.user.tag}`)
        .setDescription(`𝗕𝗔𝗟𝗗 𝗖𝗢𝗗𝗘: ${member.guild.memberCount}\n𝗣𝗥𝗢𝗙𝗜𝗟𝗘: <@!${member.id}>\n𝗖𝗥𝗘𝗔𝗧𝗘𝗗: ${member.user.createdTimestamp}`)
        .setColor('#36057c')
        .setThumbnail(member.displayAvatarURL({format: "jpg"}))
        .setFooter({text: `ID: ${member.id} | ${member.joinedTimestamp}`})

      const wlChannelId = `1007018534242631730`
      client.channels.fetch(wlChannelId).then(chl =>{
        chl.send({embeds:[welcomeEmbed]})
      }).catch(e => console.error(`ERR FETCHING CHANNEL: ${e}`))
    },
}; 