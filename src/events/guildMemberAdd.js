module.exports = {
    name: 'guildMemberAdd',
    async execute(message,client){   
    if (message.author.bot) return;
    //define the welcome channel
    const channelId = "1007018534242631730";
    const channel = member.guild.channels.cache.get(channelId);

    //console log 
    console.log(member.user.tag);
    //If not in a guild return
    if (!member.guild) return;
    try{
       const embed = new MessageEmbed()
        .setDescription(`**USER:**${member.user.tag} || (${member}) Joined The Server\n**ID:** ${member.user.id}`)
        .setColor('#000001')
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true}))
      channel.send({embeds:[embed]});
    }catch(err){
      console.log(err)
      channel.send({content:`User:${member}\n⛔ ERROR:Having Issues With Getting Slowtown Role Upon Join`})
    }
    },
}; 