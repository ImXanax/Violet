const mongoose = require('mongoose');
const remindSchema = require('../schema/remindSchema.js');
const {time} = require('@discordjs/builders');
const { GuildMember, MessageEmbed, Message } = require('discord.js');

module.exports = (client) =>{
    client.scheduler = async (client) =>{
        //30s Time Check
        setInterval(() => {

            console.log("╚═╣INTERVAL STARTED---");
            remindSchema.find({}, function (err, docs) {
                console.log("╚═╣IN SCHEMA.FIND()---");
                if (err) { return console.log(err); };
                docs.forEach(async (doc) => {
                    console.log("╚═╣FOREACH LOOP---");
                    if (Date.now()>= doc.sendAt) {
                        console.log(`${Date.now()} and ${doc.sendAt}`)
                        console.log("╚═╣IN TIME CONDITIONAL---");
                        try {
                            const user = client.users.cache.find(u => u.id === doc.memberId);
                            if(!user) return console.log(`🔴ERR IN FETCHING USER`);
                            const tstr = time(new Date(doc.sendAt))
                            const dm = await user.createDM();
                            const dmEmbed = new MessageEmbed()
                                .setTitle(`YOUR REMINDER`)
                                .setDescription(`Reminder: ${doc.reason} \nAt: ${tstr}`)
                                .setColor(`#36057c`)
                            await dm.send({embeds:[dmEmbed]})
                        } catch (err) { console.log(err) }
                        await remindSchema.deleteOne(doc).then(console.log("══╣RM DELETED FROM DB---")).catch(e => console.log(e));
                    }
                });
            })
        }, 30000);
    }
} 