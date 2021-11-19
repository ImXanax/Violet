module.exports = {
    name: 'ready',
    once: true,
    async execute(){
        const channel = '762670306824290321';
        channel.send('Ready');
        console.log('Ready!');
    },
};