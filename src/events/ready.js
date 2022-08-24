const { Embed } = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");
const mongoose = require("mongoose");
module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
        const embed = new MessageEmbed().setDescription(`\`\`\`All System's Operational\`\`\``).setColor('#36057c')
        client.channels.cache.get('1006982034134155315').send({embeds:[embed]});
        console.log('🟣 Violet Is Online >|<');

        const presenceArr = [
            `(╯°□°）╯Aqua is bald`,
            `\\(°□°)/Stealer is bald `,
            `‿( ́ ̵ _-\`)‿Everyone's bald`,
            `Baldノ( ゜-゜ノ)`,
            `(⌐■_■)Hairless`,
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