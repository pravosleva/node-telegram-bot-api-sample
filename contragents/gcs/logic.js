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
              [{ text: 'ГКС', callback_data: 'gcs.main' }],
              [{ text: 'ДКСБ', callback_data: 'gcs.dcsb' }],
              [{ text: 'ПП', callback_data: 'gcs.pp' }]
            ]
          })
        };
        bot.sendMessage(msg.chat.id, text, options);
        return
      // 1. GCS MAIN
      case 'gcs.main':
        text = 'Выберите материалы ГКС';
        options = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: 'Логотипы ГКС', callback_data: 'gcs.main.logo' }],
              [{ text: 'Info ГКС', callback_data: 'gcs.main.info' }],
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
      // 2. DCSB
      case 'gcs.dcsb':
        text = 'Выберите материалы ДКСБ';
        options = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: 'Логотипы ДКСБ', callback_data: 'gcs.dcsb.logo' }],
              [{ text: 'Info ДКСБ', callback_data: 'gcs.dcsb.info' }],
            ]
          })
        };
        bot.sendMessage(msg.chat.id, text, options);
        return
      case 'gcs.dcsb.logo':
        text = data.gcs.dcsb.logo.join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'gcs.dcsb.info':
        text = data.gcs.dcsb.info.join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      // 3. PP
      case 'gcs.pp':
        text = 'Выберите материалы ДКСБ';
        options = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: 'Info ДКСБ', callback_data: 'gcs.dcsb.info' }],
            ]
          })
        };
        bot.sendMessage(msg.chat.id, text, options);
        return
      case 'gcs.pp.info':
        text = data.gcs.dcsb.logo.join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      default:
        bot.editMessageText(text, userOpts)
        return
    }
  });
}
