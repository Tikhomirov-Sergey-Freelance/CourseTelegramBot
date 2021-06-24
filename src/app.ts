import * as TelegramBot from 'node-telegram-bot-api'

import { telegramToken } from './configs/telegram'

const bot = new TelegramBot(telegramToken, {
    polling: true
})

bot.on('message', (message, meta) => {

    console.log(message, meta)
    bot.sendMessage(message.chat.id, `О, привет!!! ${message.from.first_name}`)
})