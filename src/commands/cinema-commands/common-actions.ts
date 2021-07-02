import TelegramBot = require('node-telegram-bot-api')

import BotProwider from '../../code/bot'

import { getChatId, sendHtml } from '../../code/bot-helper'

import FilmHelper from '../../models/films/helper'
import CinemaHelper from '../../models/cinemas/helper'
import UserHelper from '../../models/users/helper'

import { buttons, keyboards } from '../../keyboards'
import { filmsTitlesToHtml, filmDescriptionToHtml, sortCinemasByDistance, cinemasToHtml, cinemaToHtml } from '../../code/cinema-helper'
import { ACTION_TYPES } from '../../constants/callback-data-types'

export const start = (message: TelegramBot.Message) => {

    const chatId = message.chat.id
    const text = `Здравствуйте, ${message.from.first_name}\nВыберите команду для начала работы`

    return BotProwider.bot.sendMessage(chatId, text, {
        reply_markup: {
            keyboard: keyboards.home
        }
    })
}

