module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
        client.channels.cache.get('762670306824290321').send({
        embed: {
            description: "```All System's Running```",
            color: "#0a00ff"
        }
    })
        console.log('Ready!');
    },
};