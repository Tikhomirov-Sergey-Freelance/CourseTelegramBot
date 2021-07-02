import BotProwider from '../code/bot'
import { yooKassaToken } from '../configs/tokens'

export default () => {

    const bot = BotProwider.bot

    bot.onText(/\/pay/, message => {

        const chatId = message.chat.id

        bot.sendInvoice(chatId,
            'Машинка',
            'Точная копия машинки из фильма Тупой и ещё тупее (Открываются двери)',
            'payload',
            yooKassaToken,
            'ttttererferfrandom',
            'RUB',
            [{
                label: 'Одна дикая машинка',
                amount: 30000
            }],
            {
                photo_url: 'https://news-r.ru/upload/iblock/842/84267c0c3329a0c660534875e07d7dd5/36fb2213a7cd5ba135723168e3a31ddc.jpg',
                need_name: true,
                need_phone_number: true,
                is_flexible: true
            })
    })
}