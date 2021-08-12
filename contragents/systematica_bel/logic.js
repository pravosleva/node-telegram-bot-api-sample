const data = require('./data.json')

const abSort = (a, b) => a.localeCompare(b);

module.exports = (bot) => {
  // Handle callback queries
  bot.on('callback_query', function onCallbackQuery(callbackQuery) {
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    let text = 'Sorry, in progress...';
    let options
    switch(action) {
      case 'systematica_bel':
        text = 'Выберите материалы СистематикаБел';
        options = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: 'Logo', callback_data: 'systematica_bel.logo' }],
              [{ text: 'Blanks', callback_data: 'systematica_bel.blanks' }],
            ]
          })
        };
        bot.sendMessage(msg.chat.id, text, options);
        return

      case 'systematica_bel.logo':
        text = data.systematica_bel.logo.sort(abSort).join('\n\n');
        bot.sendMessage(msg.chat.id, text, { parse_mode: "Markdown" });
        return
      case 'systematica_bel.blanks':
        text = data.systematica_bel.blanks.sort(abSort).join('\n\n');
        bot.sendMessage(msg.chat.id, text, { parse_mode: "Markdown" });
        return

      default:
        return
    }
  });
}
