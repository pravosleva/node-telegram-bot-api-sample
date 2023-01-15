const axios = require('axios')
const data = require('./data.json')
const getTimeAgo = require('../../utils/getTimeAgo').getTimeAgo

// const abSort = (a, b) => a.localeCompare(b);

const compareTs = ({ ts: d1 }, { ts: d2 }) => new Date(d2).getTime() - new Date(d1).getTime()

module.exports = (bot) => {
  bot.on('callback_query', async function onCallbackQuery(callbackQuery) {
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    let text = 'Sorry, in progress...';
    let options

    switch(action) {
      case 'test':
        text = 'Привет из обшарпанного Подольска';
        options = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: 'Почему не советую?', callback_data: 'test.one' }],
              [{ text: 'Пользователи бота', callback_data: 'test.two' }],
            ]
          })
        };
        bot.sendMessage(msg.chat.id, text, options);
        return

      case 'test.one':
        text = data.test.one.join('\n\n');
        bot.sendMessage(msg.chat.id, text, { parse_mode: "Markdown" });
        return
      case 'test.two':
        text = 'In progress'
        const res = await axios.get('http://pravosleva.ru/express-helper/gcs/get-users-map?id=loool')

        // console.log(res.data)

        try {
          if (!!res.data && res.data.success) {
            text = Object.keys(res.data._staticData).length
          } else {
            text = !!res.data ? res.data.message || 'ERR1: No err.message' : 'ERR'
          }
          const keys = Object.keys(res.data._staticData)
          const items = keys.filter((key) => key !== 'pravosleva').map((key) => res.data._staticData[key]).sort(compareTs)
          const getStr = (data) => {
            const res = []
            const keys = ['first_name', 'username', 'last_name', 'count', 'ts']

            for (const key of keys) {
              // console.log(data[key])
              switch (key) {
                case 'first_name':
                case 'username':
                case 'last_name':
                case 'count':
                  if (!!data[key]) res.push(data[key])
                  break
                case 'ts':
                  res.push(`(${getTimeAgo(new Date(data[key]))})`)
                  break
                default:
                  break
              }
            }
            return res.join(' ')
          }
          const strs = items.map(getStr)

          bot.sendMessage(msg.chat.id, `TOTAL: ${items.length}`, { parse_mode: "Markdown" });
          if (strs.length > 0) {
            strs.forEach(s => {
              setTimeout(() => bot.sendMessage(msg.chat.id, `\`${s}\``, { parse_mode: "Markdown" }), 1000);
            })
          } else throw new Error('Empty array')
        } catch (err) {
          text = err.message || 'ERR2: No err.message'
          bot.sendMessage(msg.chat.id, text, { parse_mode: "Markdown" });
        }

        return
      default: return
    }
  })
}
