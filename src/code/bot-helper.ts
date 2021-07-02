import * as TelegramBot from 'node-telegram-bot-api'
import BotProwider from './bot'

import { keyboards, keyboadTypes } from '../keyboards'

export const getChatId = (message: TelegramBot.Message) => message.chat.id

export const sendHtml = (chatId: number, html: string, keyboardName: keyboadTypes = null) => {

    const options: TelegramBot.SendMessageOptions = {
        parse_mode: 'HTML'
    }

    if(keyboardName) {
        options['reply_markup'] = {
            keyboard: keyboards[keyboardName]
        }
    }

    return BotProwider.bot.sendMessage(chatId, html, options)
}