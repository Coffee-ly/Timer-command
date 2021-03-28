const { Command } = require('discord.js-commando');
const { delay } = require("../../util/util1");

module.exports = class TimerCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'COMMAND_NAME',
			group: 'COMMAND_GROUP',
			memberName: 'COMMAND_MEMBER_NAME',
			description: 'COMMAND_DESCRIPTION`',
			// args are customizable		
			args: [
				{
					key: 'time',
					prompt: 'How long should the timer last (in seconds)?',
					type: 'integer',
					max: 600,
					min: 1
				}
			]
		});
	}

	async run(msg, { time }) {
		const display = time > 59 ? `${time / 60} minutes` : `${time} seconds`;
		await msg.say(`🕰️ Set a timer for **${display}**.`);
		await delay(time * 1000);
		return msg.say(`🕰️ Your **${display}** timer is finished ${msg.author}~!`);
	}
};