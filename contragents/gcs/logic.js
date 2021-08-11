const data = require('./data.json')

const abSort = (a, b) => a.localeCompare(b);

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
        text = 'Выберите направление';
        options = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: 'ГКС', callback_data: 'gcs.main' }],
              [{ text: 'ДКСБ', callback_data: 'gcs.dcsb' }],
              [{ text: 'Пром_предприятия', callback_data: 'gcs.pp' }]
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
              [{ text: 'Logo', callback_data: 'gcs.main.logo' }],
              [{ text: 'Info', callback_data: 'gcs.main.info' }],
              [{ text: 'Blanks', callback_data: 'gcs.main.blanks' }],
              [{ text: 'Profiles', callback_data: 'gcs.main.profiles' }],
              [{ text: 'Presentations', callback_data: 'gcs.main.presentations' }],
              [{ text: 'Buklets', callback_data: 'gcs.main.buklets' }],
              [{ text: 'Structure', callback_data: 'gcs.main.structure' }],
              [{ text: 'Materials', callback_data: 'gcs.main.materials' }],
              [{ text: 'Compliance', callback_data: 'gcs.main.compliance' }],
            ]
          })
        };
        bot.sendMessage(msg.chat.id, text, options);
        return
      case 'gcs.main.logo':
        text = data.gcs.main.logo.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'gcs.main.info':
        text = data.gcs.main.info.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'gcs.main.blanks':
        text = data.gcs.main.blanks.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'gcs.main.profiles':
        text = data.gcs.main.profiles.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'gcs.main.presentations':
        text = 'Выберите презентации ГКС';
        options = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: 'General Pres ГКС', callback_data: 'gcs.main.presentations.general' }],
              [{ text: 'Industry Pres ГКС', callback_data: 'gcs.main.presentations.industry' }]
            ]
          })
        };
        bot.sendMessage(msg.chat.id, text, options);
        return
      case 'gcs.main.presentations.general':
        text = data.gcs.main.presentations.general.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'gcs.main.presentations.industry':
        text = data.gcs.main.presentations.industry.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'gcs.main.buklets':
        text = data.gcs.main.buklets.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'gcs.main.structure':
        text = data.gcs.main.structure.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'gcs.main.materials':
        text = data.gcs.main.materials.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'gcs.main.compliance':
        text = data.gcs.main.compliance.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
        

      // 2. DCSB
      case 'gcs.dcsb':
        text = 'Выберите материалы ДКСБ';
        options = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: 'Info ДКСБ', callback_data: 'gcs.dcsb.info' }],
              [{ text: 'Profiles ДКСБ', callback_data: 'gcs.dcsb.profiles' }],
              [{ text: 'Presentations ДКСБ', callback_data: 'gcs.dcsb.presentations' }],
              [{ text: 'Materials', callback_data: 'gcs.dcsb.materials' }],
            ]
          })
        };
        bot.sendMessage(msg.chat.id, text, options);
        return
      case 'gcs.dcsb.info':
        text = data.gcs.dcsb.info.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'gcs.dcsb.profiles':
        text = data.gcs.dcsb.profiles.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'gcs.dcsb.presentations':
        text = data.gcs.dcsb.presentations.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'gcs.dcsb.materials':
        text = data.gcs.dcsb.materials.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return

      // 3. PP
      case 'gcs.pp':
        text = 'Выберите материалы ПП';
        options = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: 'Info', callback_data: 'gcs.pp.info' }],
              [{ text: 'Presentations', callback_data: 'gcs.pp.presentations' }],
              [{ text: 'Materials', callback_data: 'gcs.pp.materials' }],
            ]
          })
        };
        bot.sendMessage(msg.chat.id, text, options);
        return
      case 'gcs.pp.info':
        text = data.gcs.pp.info.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'gcs.pp.presentations':
        text = data.gcs.pp.presentations.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return
      case 'gcs.pp.materials':
        text = data.gcs.pp.materials.sort(abSort).join('\n');
        bot.sendMessage(msg.chat.id, text);
        return

      default:
        bot.editMessageText(text, userOpts)
        return
    }
  });
}
