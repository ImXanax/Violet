const {Client , Intents} = require('discord.js');
const client = new Client({intents:[Intents.FLAGS.GUILDS]});

client.on('ready',()=>{
    console.log('Ready!');
});
(async () =>{
    client.login(process.env.TOKEN);
})();