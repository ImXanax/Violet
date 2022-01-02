const {SlashCommandBuilder} = require('@discordjs/builders');
const { execute } = require('../../events/ready');
const wait = require('util').promisify(setTimeout);
module.exports = {
    data:new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies With Pong'),
    async execute(interaction){
       await interaction.reply("Im Up Bestie");
       await wait(2000);
       await interaction.editReply("Pong!");
    }
}