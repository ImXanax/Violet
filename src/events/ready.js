const { Embed } = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");
const mongoose = require("mongoose");
module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
        const embed = new MessageEmbed().setDescription(`\`\`\`All System's Operational\`\`\``).setColor('#36057c')
        client.channels.cache.get('1012390735611433031').send({embeds:[embed]});
        console.log('🟣 Violet Is Online >|<');

        const presenceArr = [
            `Diamond Sword1`,
            `Stealer:"XD"`,
            `You Boost Me`,
            `[Starters]`,
            `Aqua:"ur mom"`,
            `When is the game starting?`,
            `checkpoint #7`,
            `!buddha get`,
            `Aly:"Mending"`,
            `Krows Services`,
            `Deni:"Friker"`,
        ]
        let i=0;
        setInterval(() => {
            client.user.setPresence({
                activities: [{ 
                    name: presenceArr[i++ % presenceArr.length],
                    type: `WATCHING`,
                   }] 
            });
        }, 5000);
        
    },
};