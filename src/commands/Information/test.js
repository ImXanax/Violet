const {SlashCommandBuilder, time} = require("@discordjs/builders");
const {MessageEmbed ,MessageButton, Message,MessageActionRow,GuildMember,Guild} = require("discord.js");
const { execute } = require("../../events/ready");

module.exports={
    data:new SlashCommandBuilder()
        .setName('test')
        .setDescription('test command'),
        async execute(ctx,client){
            let u =client.users.cache.find(user => user.id === '413755451373518864')
            const dm = await u.createDM();
            let timeStr = time(Date())
            await dm.send({content:`${new Date()}\n${timeStr}\n${Date()}`})
    }
}