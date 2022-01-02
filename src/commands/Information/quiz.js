const {SlashCommandBuilder} = require('@discordjs/builders');
const { execute } = require('../../events/ready');
const {MessageEmbed} = require('discord.js');
const wait = require('util').promisify(setTimeout);
const quiz = require('./quiz.json');
module.exports = {
    data:new SlashCommandBuilder()
        .setName('quiz')
        .setDescription('How long the bot has been operational'),

    async execute(interaction){ 
        const item = quiz[Math.floor(Math.random()* quiz.length)];
        const filter = response =>{
            return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
        };
        interaction.reply(item.question,{fetchReply:true})
            .then(()=>{
                interaction.channel.awaitMessages({filter , max:1,time:30000,errors:['time']})
                .then(collected=>{
                    interaction.followUp(`${collected.first().author} got the answer correct`)
                })
                .catch(collected => {
                    interaction.followUp(`Looks like nobody got the right answer`);
                });
            });
    }
}