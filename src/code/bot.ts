import * as TelegramBot from 'node-telegram-bot-api'
import { telegramToken } from '../configs/tokens'

class BotProwider {
    static bot: TelegramBot
}

export default BotProwider