import * as TelegramBot from 'node-telegram-bot-api'
import { backButton } from './common'

export const alias = {
    location: 'Отправить местоположение',
    back: backButton.text
}

const keyboard: TelegramBot.KeyboardButton[][] = [
    [
        {
            text: alias.location,
            request_location: true
        }
    ],
    [backButton]
]

export default keyboard