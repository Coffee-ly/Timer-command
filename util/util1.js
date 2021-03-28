const { LOG_CHANNEL_ID } = require("../config.json");

module.exports = {

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    list(arr, conj = 'and') {
        const len = arr.length;
        if (len === 0) return '';
        if (len === 1) return arr[0];
        return `${arr.slice(0, -1).join(', ')}${len > 1 ? `${len > 2 ? ',' : ''} ${conj} ` : ''}${arr.slice(-1)}`;
    },

    embedURL(title, url, display) {
        return `[${title}](${url.replace(/\)/g, '%27')}${display ? ` "${display}"` : ''})`;
    },

    formatNumber(number, minimumFractionDigits = 0) {
        return Number.parseFloat(number).toLocaleString(undefined, {
            minimumFractionDigits,
            maximumFractionDigits: 2
        });
    },

    intToEmoji(int){
        let res;
        switch(int){
            case 0:
                res = "0️⃣";
                break;
            case 1:
                res = "1️⃣";
                break;
            case 2:
                res = "2️⃣";
                break;
            case 3:
                res = "3️⃣";
                break;
            case 4:
                res = "4️⃣";
                break;
            case 5:
                res = "5️⃣";
                break;
            case 6:
                res = "6️⃣";
                break;
            case 7:
                res = "7️⃣";
                break;
            case 8:
                res = "8️⃣";
                break;
            case 9:
                res = "9️⃣";
                break;
            default:
                res = "";
                break;
        }
        return res;
    },

    emojiToInt(emoji){
        let res;
        switch(emoji){
            case "0️⃣":
                res = 0;
                break;
            case "1️⃣":
                res = 1;
                break;
            case "2️⃣":
                res = 2;
                break;
            case "3️⃣":
                res = 3;
                break;
            case "4️⃣":
                res = 4;
                break;
            case "5️⃣":
                res = 5;
                break;
            case "6️⃣":
                res = 6;
                break;
            case "7️⃣":
                res = 7;
                break;
            case "8️⃣":
                res = 8;
                break;
            case "9️⃣":
                res = 9;
                break;
            default:
                res = "";
                break;
        }
        return res;
    },

    formatNumber(number, minimumFractionDigits = 0) {
		return Number.parseFloat(number).toLocaleString(undefined, {
			minimumFractionDigits,
			maximumFractionDigits: 2
		});
	},

    formatNumberK(number) {
        return number > 999 ? `${(number / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })}K` : number;
    },

    shorten(text, maxLen = 2000) {
        return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
    },

    cleanAnilistHTML(html, removeLineBreaks = true) {
        let clean = html;
        if (removeLineBreaks) clean = clean.replace(/\r|\n|\f/g, '');
        clean = clean
            .replace(/<br>/g, '\n')
            .replace(/&#039;/g, '\'')
            .replace(/&quot;/g, '"')
            .replace(/<\/?i>/g, '*')
            .replace(/<\/?b>/g, '**')
            .replace(/~!|!~/g, '||')
            .replace(/&mdash;/g, '—');
        if (clean.length > 2000) clean = `${clean.substr(0, 1995)}...`;
        const spoilers = (clean.match(/\|\|/g) || []).length;
        if (spoilers !== 0 && (spoilers && (spoilers % 2))) clean += '||';
        return clean;
    },

    /**
     * Check if member is in the same channel as the bot
     * @param {*} member 
     */
    canModifyQueue(member) {
        const { channel } = member.voice;
        const botChannel = member.guild.me.voice.channel;

        if (channel !== botChannel) {
            member.send("You need to join the voice channel first!").catch(console.error);
            return false;
        }

        return true;
    },

    getUserFromMention(mention) {
        // The id is the first and only match found by the RegEx.
        const matches = mention.match(/^<@!?(\d+)>$/);

        // If supplied variable was not a mention, matches will be null instead of an array.
        if (!matches) return;

        // However the first element in the matches array will be the entire mention, not just the ID,
        // so use index 1.
        const id = matches[1];

        return client.users.cache.get(id);
    }
};