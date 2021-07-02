import * as TelegramBot from 'node-telegram-bot-api'

export const alias = {
    films: 'Сейчас в кино',
    favourite: 'Избранное',
    cinemas: 'Кинотеатры'
}

const keyboard: TelegramBot.KeyboardButton[][] = [
    [{ text: alias.films }, { text: alias.cinemas }],
    [{ text: alias.favourite }]
]

export default keyboard