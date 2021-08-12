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
      case 'aquarius':
        text = 'Выберите материалы AQUARIUS';
        options = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: 'Info', callback_data: 'aquarius.info' }],
              [{ text: 'Logo', callback_data: 'aquarius.logo' }],
              [{ text: 'Profiles', callback_data: 'aquarius.profiles' }],
              [{ text: 'Presentations', callback_data: 'aquarius.presentations' }],
              [{ text: 'Materials', callback_data: 'aquarius.materials' }],
            ]
          })
        };
        bot.sendMessage(msg.chat.id, text, options);
        return

      case 'aquarius.info':
        text = data.aquarius.info.sort(abSort).join('\n\n');
        bot.sendMessage(msg.chat.id, text, { parse_mode: "Markdown" });
        return
      case 'aquarius.logo':
        text = data.aquarius.logo.sort(abSort).join('\n\n');
        bot.sendMessage(msg.chat.id, text, { parse_mode: "Markdown" });
        return
      case 'aquarius.profiles':
        text = data.aquarius.profiles.sort(abSort).join('\n\n');
        bot.sendMessage(msg.chat.id, text, { parse_mode: "Markdown" });
        return
      case 'aquarius.presentations':
        text = data.aquarius.presentations.sort(abSort).join('\n\n');
        bot.sendMessage(msg.chat.id, text, { parse_mode: "Markdown" });
        return
      case 'aquarius.materials':
        text = data.aquarius.materials.sort(abSort).join('\n\n');
        bot.sendMessage(msg.chat.id, text, { parse_mode: "Markdown" });
        return

      default:
        return
    }
  });
}
