const axios = require('axios')
const data = require('./data.json')
const getTimeAgo = require('../../utils/getTimeAgo').getTimeAgo

// const abSort = (a, b) => a.localeCompare(b);
// const delay = (ms) => new Promise((res, _rej) => setTimeout(res, ms))
const compareTs = ({ ts: d1 }, { ts: d2 }) => new Date(d2).getTime() - new Date(d1).getTime()

module.exports = (bot) => {
  bot.on('callback_query', async function onCallbackQuery(callbackQuery) {
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    let text = 'Sorry, in progress...';
    let options

    switch(action) {
      case 'test':
        switch (true) {
          case msg.chat.id === 432590698:
            text = 'Hello wsp';
            options = {
              reply_markup: JSON.stringify({
                inline_keyboard: [
                  [{ text: 'Пользователи бота', callback_data: 'test.two' }],
                ]
              })
            }
            bot.sendMessage(msg.chat.id, text, options)
            bot.sendPhoto(msg.chat.id, 'https://pravosleva.ru/dist.viselitsa-2023/images/final/fail-23-from-dusk-till-dawn.webp')
            return
          case msg.chat.id === 1018560815:
            bot.sendPhoto(msg.chat.id, 'https://pravosleva.ru/dist.viselitsa-2023/images/final/fail-23-from-dusk-till-dawn.webp')
            return
          default:
            text = 'Привет из обшарпанного Подольска';
            options = {
              reply_markup: JSON.stringify({
                inline_keyboard: [
                  [{ text: 'Почему не советую?', callback_data: 'test.one' }],
                  [{ text: 'Пользователи бота', callback_data: 'test.two' }],
                ]
              })
            }
            bot.sendMessage(msg.chat.id, text, options)
            return
        }
      case 'test.one':
        switch (true) {
          case msg.chat.id === 1018560815 || msg.chat.id === 432590698:
            // NOTE: https://www.geeksforgeeks.org/node-js-bot-sendphoto-method/s
            bot.sendPhoto(msg.chat.id, 'https://pravosleva.ru/dist.viselitsa-2023/images/final/fail-6-from-dusk-till-dawn.jpg')
            return
          default:
            break
        }
        text = data.test.one.join('\n\n');
        bot.sendMessage(msg.chat.id, text, { parse_mode: "Markdown" });
        return
      case 'test.two':
        text = 'In progress'
        const res = await axios.get('http://pravosleva.ru/express-helper/gcs/get-users-map?id=loool')

        try {
          if (!!res.data && res.data.success) {
            text = Object.keys(res.data._staticData).length
          } else {
            text = !!res.data ? res.data.message || 'ERR1: No err.message' : 'ERR'
          }
          const keys = Object.keys(res.data._staticData)
          const items = keys.filter((key) => key !== 'pravosleva').map((key) => res.data._staticData[key]).sort(compareTs)
          const usernames = items.map(({ username }) => username || null)
          const getName = (data) => {
            const res = []
            const keys = [
              // 'first_name',
              'username',
              // 'last_name',
            ]
            for (const key of keys) {
              switch (key) {
                // case 'first_name':
                case 'username':
                // case 'last_name':
                default:
                  if (!!data[key]) res.push(data[key])
                  break
              }
            }
            return res.join(' ')
          }
          const getStr = (data) => {
            const res = []
            const keys = [
              'first_name',
              'username',
              // 'last_name',
              'count',
              'ts',
            ]

            for (const key of keys) {
              switch (key) {
                case 'first_name':
                case 'username':
                // case 'last_name':
                  if (!!data[key]) res.push(`\`${data[key]}\``)
                  break
                case 'count':
                  if (!!data[key]) res.push(`\`(${data[key]})\``)
                  break
                case 'ts':
                  res.push(`\n_${getTimeAgo(new Date(data[key]))}_`)
                  break
                default:
                  break
              }
            }
            return res.join(' ')
          }
          const strs = items.map(getStr)

          if (strs.length > 0) {
            bot.sendMessage(msg.chat.id, `\`\`\`\n---\nTOTAL: ${items.length}\nLAST: ${getName(items[0])}\nWHEN: ${getTimeAgo(new Date(items[0].ts))}\n---\`\`\``, { parse_mode: "Markdown" });

            for (let i = 0, max = strs.length; i < max; i++) {
              let md = strs[i]
              if (!!usernames[i]) md += `\n\n[${getName(items[i]) || 'NoName'}](https://t.me/${usernames[i]})`
              setTimeout(function timer() {
                bot.sendMessage(msg.chat.id, md, { parse_mode: "Markdown" })
              }, i * 200);
            }
          } else throw new Error('Empty array')
        } catch (err) {
          text = err.message || 'ERR2: No err.message'
          bot.sendMessage(msg.chat.id, text, { parse_mode: "Markdown" })
        }

        return
      default: return
    }
  })
}
