const {SlashCommandBuilder} = require('@discordjs/builders');
const { execute } = require('../../events/ready');
const wait = require('util').promisify(setTimeout);
const {MessageActionRow , MessageButton , MessageEmbed, Message} = require("discord.js");
const Levels = require(`../../funcs/Levels`)
module.exports = {
    data:new SlashCommandBuilder()
    .setName('score')
    .setDescription('see how much numbers you gained')
    .addUserOption(option => option.setName('user').setDescription('the user you would like to spy on')),
    async execute(ctx,client){
        let user = ctx.options.getUser('user')
        if(!user) user = ctx.user
        
        ctx.guild.members.fetch(user.id).then((u)=>{
            Levels.fetch(u.user.id,u.guild.id)
                .then(dbUser=>{
                    const nextLevel = Levels.xpFor(dbUser.level + 1)
                    const scoreEmbed  = new MessageEmbed()
                    .setTitle(`${u.user.username}'s Score`)
                    .setDescription(`<a:level:1016698227078217788> **LEVEL:** ${dbUser.level}\n <:xp:1016698149127065701> **XP:** ${dbUser.xp}\n <:piz:1016698072627167294> **NEXT LEVEL:** ${nextLevel}`)
                    .setColor("#36057c")
                    .setThumbnail(u.displayAvatarURL({ format: "jpg" }))
                ctx.reply({embeds:[scoreEmbed]});
                }).catch(e => console.error(`err in fetching dbuser: ${e}`))
        }).catch(e => console.error(`err in fetching member: ${e}`))
    }
}