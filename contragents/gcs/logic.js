const data = require('./data.json')

module.exports = (bot) => {
  // Handle callback queries
  bot.on('callback_query', function onCallbackQuery(callbackQuery) {
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    const userOpts = {
      chat_id: msg.chat.id,
      message_id: msg.message_id,
    };
    let text = 'Sorry, in progress...';
    let options
    switch(action) {
      case 'gcs':
        text = 'Выберите компанию-дочку';
        options = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              // [{ text: 'Презентации', callback_data: 'gcs.pres' }],
              [{ text: 'ГКС', callback_data: 'gcs.main' }],
              // [{ text: 'Маркетинговые материалы', callback_data: 'gcs.marketing' }],
              // [{ text: 'Видеоролики', callback_data: 'gcs.video' }]
            ]
          })
        };
        bot.sendMessage(msg.chat.id, text, options);
        return
      case 'gcs.main':
        text = 'Выберите материалы';
        options = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              // [{ text: 'Презентации', callback_data: 'gcs.pres' }],
              [{ text: 'Логотипы', callback_data: 'gcs.main.logo' }],
              [{ text: 'Info', callback_data: 'gcs.main.info' }],
              // [{ text: 'Видеоролики', callback_data: 'gcs.video' }]
            ]
          })
        };
        bot.sendMessage(msg.chat.id, text, options);
        return
      case 'gcs.main.logo':
        text = data.gcs.main.logo.join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'gcs.main.info':
        text = data.gcs.main.info.join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      // case 'gcs.logo.<LEVEL_3>':
      //   text = data.gcs.logo.png.join('\n');
      //   bot.sendMessage(msg.chat.id, text);
      //   return
      default:
        bot.editMessageText(text, userOpts)
        return
    }
  });
}
