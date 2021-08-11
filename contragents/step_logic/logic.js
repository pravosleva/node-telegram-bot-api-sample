const data = require('./data.json')

const abSort = (a, b) => a.localeCompare(b);

module.exports = (bot) => {
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
      case 'step_logic':
        text = 'Выберите материалы STEP LOGIC';
        options = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: 'Info', callback_data: 'step_logic.info' }],
              [{ text: 'Logo', callback_data: 'step_logic.logo' }],
              [{ text: 'Profiles', callback_data: 'step_logic.profiles' }],
              [{ text: 'Materials', callback_data: 'step_logic.materials' }],
            ]
          })
        };
        bot.sendMessage(msg.chat.id, text, options);
        return

      case 'step_logic.info':
        text = data.step_logic.info.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'step_logic.logo':
        text = data.step_logic.logo.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'step_logic.profiles':
        text = data.step_logic.profiles.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'step_logic.materials':
        text = data.step_logic.materials.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return

      default:
        bot.editMessageText(text, userOpts)
        return
    }
  });
}
