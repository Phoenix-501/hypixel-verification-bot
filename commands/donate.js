const Discord = require('discord.js');
const e = require('../embeds.json');
const owner = require('../owner.json');

module.exports = {
    name: 'donate',
    description: 'If you want to support the bot :point_right::point_left:',
    cat: 'other',
    guild: false,
    alias: ['donation', 'don', 'd'],
    execute(message, args, client, prefix) {
        const invite = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setDescription(
                `:flushed: **Donation link**\n` +
                `[paypal.me/foobball](https://paypal.me/foobball)\n\n` +
                `thank you so much :heart::pleading_face:`
            ).setFooter(`Bot by ${owner.tag} | https://bonk.ml/`, owner.avatarURL)

        if (message.guild) {
            message.author.send(invite).then(() => {
                message.react('💖').catch();
            }).catch(() => {
                const embed = new Discord.MessageEmbed()
                    .setColor(e.red)
                    .setDescription(`${e.x} **Please enable DMs from server members.**`);
                message.channel.send(embed).then((newmsg) => {
                    newmsg.delete({ timeout: 4000 }).catch();
                });
            });
        } else {
            message.author.send(invite).catch();
        }
    },
};