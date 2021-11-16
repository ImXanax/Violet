const {Client , Intents} = require('discord.js');
const client = new Client({intents:[Intents.FLAGS.GUILDS]});
require('dotenv').config();
//hello this is my bot 
client.on('ready',()=>{
    console.log('Ready!');
});
(async () =>{
    client.login(process.env.TOKEN);
})();