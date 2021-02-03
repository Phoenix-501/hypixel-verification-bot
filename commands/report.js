const Discord = require('discord.js');
const { report_channel } = require('../config.json');
const e = require('../embeds.json');

module.exports = {
    name: 'report',
    description: 'Report a problem with the bot',
    cat: 'other',
    alias: ['rep', 'problem'],
    execute(message, args, client, prefix) {
        const reportchannel = client.channels.cache.get(report_channel);

        if (args.join(' ').length < 10) {
            const embed = new Discord.MessageEmbed()
                .setColor(e.red)
                .setDescription(`${e.x} **Your report must be at least 10 characters.**\n${e.bunk} Example: \`${prefix}report Can't verify\``);
            message.channel.send(embed).then((newmsg) => {
                newmsg.delete({ timeout: 10000 }).catch();
            });
        } else {
            reportchannel.send(`${message.author.tag} | ${message.author.id}\n${args.join(' ').substr(0, 1000)}`).then(() => {
                const embed = new Discord.MessageEmbed()
                    .setColor(e.green)
                    .setDescription(`${e.check} **Report submitted successfully!**`);
                message.channel.send(embed).then((newmsg) => {
                    newmsg.delete({ timeout: 10000 }).catch();
                });
            }).catch(() => {
                const embed = new Discord.MessageEmbed()
                    .setColor(e.red)
                    .setDescription(`${e.x} **Your report couldn't be submitted**\n${e.bunk} uhhh this should never happen`);
                message.channel.send(embed).then((newmsg) => {
                    newmsg.delete({ timeout: 10000 }).catch();
                });
            })
        }
    },
};