const config = {
  'default': {
    text: null,
    options: null,
    cb: (bot, [...args]) => {
      bot.editMessageText(...args)
    }
  },
  'gcs': {
    text: 'Какие файлы вас интересуют?',
    options: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: 'Презентации', callback_data: 'gcs.pres' }],
          [{ text: 'Логотипы', callback_data: 'gcs.logo' }],
          [{ text: 'Маркетинговые материалы', callback_data: 'gcs.marketing' }],
          [{ text: 'Видеоролики', callback_data: 'gcs.video' }]
        ]
      })
    },
    cb: (bot, [...args]) => {
      bot.sendMessage(...args);
    },
  },
  'gcs.logo': {
    text: 'В каком формате интересуют логотипы?',
    options: {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: 'PNG', callback_data: 'gcs.logo.png' }],
          [{ text: 'JPG', callback_data: 'gcs.logo.jpg' }]
        ]
      })
    },
    cb: (bot, [...args]) => {
      bot.sendMessage(...args);
    },
  },
  'gcs.logo.png': {
    text: null,
    options: undefined,
    cb: (bot, [...args]) => {
      bot.sendMessage(...args);
    },
  },
}

module.exports = {
  config,
}