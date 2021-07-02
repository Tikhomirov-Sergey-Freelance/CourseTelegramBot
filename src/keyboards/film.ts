import * as TelegramBot from 'node-telegram-bot-api'
import { backButton } from './common'

export const alias = {
    random: 'Случайный жанр',
    action: 'Боевики',
    comedy: 'Комедии',
    back: backButton.text
}

const keyboard: TelegramBot.KeyboardButton[][] = [
    [{ text: alias.random }],
    [{ text: alias.action }, { text: alias.comedy }],
    [backButton]
]

export default keyboard