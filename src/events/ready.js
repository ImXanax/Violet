const { Embed } = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");
const mongoose = require("mongoose");
module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
        const embed = new MessageEmbed().setDescription(`\`\`\`All System's Operational\`\`\``).setColor('#36057c')
        client.channels.cache.get('762670306824290321').send({embeds:[embed]});
        console.log('🟣 Violet Is Online >|<');

        const presenceArr = [
            `(╯°□°）╯︵ ┻━┻`,
            `\\(°□°)/︵ ┻━┻ `,
            `‿( ́ ̵ _-\`)‿`,
            `┬─┬ ノ( ゜-゜ノ)`,
            `(⌐■_■)`,
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