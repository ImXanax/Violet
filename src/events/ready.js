module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
        client.channels.cache.get('762670306824290321').send("READY");
        console.log('Ready!');
    },
};