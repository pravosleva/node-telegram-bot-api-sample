const data = require('./data.json')

// const abSort = (a, b) => a.localeCompare(b);

module.exports = (bot) => {
  bot.on('callback_query', function onCallbackQuery(callbackQuery) {
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    let text = 'Sorry, in progress...';
    let options

    switch(action) {
      case 'test':
        text = 'Подольская шаболда';
        options = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: 'Не советую =)', callback_data: 'test.one' }],
            ]
          })
        };
        bot.sendMessage(msg.chat.id, text, options);
        return

      case 'test.one':
        text = data.test.one.join('\n\n');
        bot.sendMessage(msg.chat.id, text, { parse_mode: "Markdown" });
        return
      default: return
    }
  })
}
