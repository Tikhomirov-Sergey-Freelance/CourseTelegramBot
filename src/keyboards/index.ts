import * as TelegramBot from 'node-telegram-bot-api'

import homeButtons, { alias as homeAlias } from './home'
import filmButtons, { alias as filmAlias } from './film'
import cinemaButtons, { alias as cinemaAlias } from './cinemas'

interface iKeyboardsList {
    home: TelegramBot.KeyboardButton[][]
    films: TelegramBot.KeyboardButton[][]
    cinemas: TelegramBot.KeyboardButton[][]
}

export const buttons = {
    home: homeAlias,
    films: filmAlias,
    cinemas: cinemaAlias
}

export const keyboards: iKeyboardsList = {
    home: homeButtons,
    films: filmButtons,
    cinemas: cinemaButtons
}

export type keyboadTypes = keyof iKeyboardsList