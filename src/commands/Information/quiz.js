const {SlashCommandBuilder} = require('@discordjs/builders');
const { execute } = require('../../events/ready');
const {MessageEmbed} = require('discord.js');
const wait = require('util').promisify(setTimeout);
const quiz = require('./quiz.json');
module.exports = {
    data:new SlashCommandBuilder()
        .setName('quiz')
        .setDescription('Quiz for twenty one pilots nerds'),

    async execute(interaction){ 
        const item = quiz[Math.floor(Math.random()* quiz.length)];
        const filter = response =>{
            return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
        };
        const q = new MessageEmbed()
            .setDescription(item.question)
            .setColor("#36057c")
            .setFooter("Respond with typing your answer.")
        const r = new MessageEmbed()
            .setDescription(`${collected.first().author} Correct Answer.`)
            .setColor("#36057c")
        
        interaction.reply({embeds:[q]},{fetchReply:true})
            .then(()=>{
                interaction.channel.awaitMessages({filter , max:1,time:30000,errors:['time']})
                .then(collected=>{
                    // correct answer
                    interaction.followUp({embeds:[r]})
                })
                .catch(collected => {
                    // time ran out 
                    interaction.followUp(`Looks like nobody got the right answer`);
                });
            });
    }
}

/*
▬ 60s time limit
▬ 2 attempts
▬ Answers with ABCD options
▬ Embed for response
*/