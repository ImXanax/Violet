const { SlashCommandBuilder } = require('@discordjs/builders');
const { execute } = require('../../events/ready');
const { MessageActionRow, MessageButton, MessageEmbed, Message } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('wordle')
        .setDescription('fun guessing game with words'),
    async execute(ctx, client) {
        ctx.reply({content: 'disabled until further notice'})
        // let correctLetters = 0;
        // let blockDiagram = '';
        // let guessCounter = 1;
        // let bD = '';
        // let timesUp = false;

        // const filter = r => r.author.id === ctx.member.id;

        // const checkMessage = (m) => {

        //     const word = ['p', 'r', 'i', 'c', 'e'];
        //     const wordStr = word.join('');
        //     const guessStr = m.join('').toLowerCase();
        //     let arr = [];
        //     let mEmoji = [];
        //     let cTracker = 0;

        //     console.log(`WORD: ${wordStr}\nGUESS: ${guessStr}`);

        //     for (let i = 0; i < 5; i++) {
        //         //if character exists and is in correct spot
        //         if (m[i].toLowerCase() === word[i]) {
        //             cTracker += 1;
        //             console.log(`CORRECT || ${m[i]} - ${word[i]}`)
        //             arr.push(` :green_square: `)
        //             mEmoji.push(` :regional_indicator_${m[i].toLowerCase()}: `)

        //         }
        //         //if character exists and is not in the correct spot
        //         else if (wordStr.includes(m[i].toLowerCase())) {
        //             console.log(`PRESENT || ${m[i]} - ${word[i]}`);
        //             arr.push(` :yellow_square: `);
        //             mEmoji.push(` :regional_indicator_${m[i].toLowerCase()}: `)
        //         }
        //         //if character is not in the word
        //         else {
        //             console.log(`ABSENT || ${m[i]} -> ${wordStr}`)
        //             arr.push(` <:dark_large_square:942867428097019915> `);
        //             mEmoji.push(` :regional_indicator_${m[i].toLowerCase()}: `)
        //         }
        //     }

        //     let result = arr.join('');
        //     let textResult = mEmoji.join('');
        //     return [`${textResult}\n${result}`, cTracker];
        // }

        // const embed = new MessageEmbed()
        //     .setDescription(`**GUIDE:**\n:green_square: = \`LETTER EXISTS AND IS IN THE CORRECT SPOT\`\n:yellow_square: = \`LETTER EXISTS BUT IT'S NOT IN THE CORRECT SPOT\`\n<:dark_large_square:942867428097019915> = \`LETTER DOESN'T EXIST IN THE WORD\`\n**Guess a word to start off...**`)
        //     .setColor(`#36057c`)

        // ctx.reply({embeds: [embed],ephemeral:true})
        //     .then(() => {
        //         //15m inactivity to stop the collection
        //         setTimeout(() => {
        //             timesUp = true;
        //             console.log(`⌛ Ran out of time...`)
        //             collector.stop();
        //         }, 900000)
        //         const collector = ctx.channel.createMessageCollector({ filter, max: 6 });
        //         collector.on('collect', m => {

        //             if (guessCounter <= 7 && m.content !== 'QUIT') {
        //                 console.log(`🔹 COLLECTED: ${m.content}`)
        //                 let msg = m.content;
        //                 msg = msg.split('');

        //                 if (msg.length === 5) {
        //                     bD = checkMessage(msg);
        //                     correctLetters = bD.pop();
        //                     blockDiagram += `\n${bD[0]}`

        //                     ctx.editReply(blockDiagram);

        //                     const embedEdit = new MessageEmbed()
        //                         .setDescription(`**GUIDE:**\n:green_square: = \`LETTER EXISTS AND IS IN THE CORRECT SPOT\`\n:yellow_square: = \`LETTER EXISTS BUT IT'S NOT IN THE CORRECT SPOT\`\n<:dark_large_square:942867428097019915> = \`LETTER DOESN'T EXIST IN THE WORD\`\n**GUESS: [${guessCounter++}/ 6]**`)
        //                         .setColor(`#36057c`)
        //                         .setFooter(`to stop the game type "QUIT"`)

        //                     ctx.editReply({ embeds: [embedEdit]})

        //                     try{
        //                         console.log(`-> deleting... ${m.content}`)
        //                         m.delete()
        //                     }catch(e){
        //                         console.log(e)
        //                     }
        //                     //check for correct answer
        //                     if(correctLetters === 5){
        //                         console.log(`CORRECT ANSWER: ${correctLetters}`)
        //                         collector.stop()
        //                     }
        //                 } else {
        //                     ctx.followUp(`**${m.content}** is not 5 letters`)
        //                     console.log(`-->> INPUT LEGNTH WAS LESS THAN 5`)
        //                 }
        //             } else {
        //                 collector.stop();
        //             }
        //         })
        //         collector.on('end', collected => {
        //             if (collected.last().content === 'QUIT') {
        //                 ctx.followUp(`you took the **L** :pensive:`)
        //             }
        //             else if (timesUp) {
        //                 const endTimeEmbed = new MessageEmbed()
        //                     .setDescription(`**YOU RAN OUT OF TIME...**`)
        //                     .setColor(`#ac2d35`)
        //                 ctx.editReply({ content: `** **`, embeds: [endTimeEmbed]});
        //             }
        //             else if(correctLetters === 5){
        //                 const winEmbed = new MessageEmbed()
        //                     .setDescription(`**GREAT JOB YOU WON!!!**`)
        //                     .setColor(`#377e4d`)
        //                 ctx.editReply({ content: `** **`, embeds: [winEmbed]});
        //             }else if(guessCounter <= 7){
        //                 const guessEmbed = new MessageEmbed()
        //                     .setDescription(`**YOU USED ALL YOUR GUESSES...**`)
        //                     .setColor(`#ac2d35`)
        //                 ctx.editReply({ content: `** **`, embeds: [guessEmbed]});
        //             }
        //         })
        //     }).catch(e => console.log(e))
    }
}