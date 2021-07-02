import BotProwider from '../code/bot'
import * as fs from 'fs'
import * as path from 'path'

export default () => {

    const bot = BotProwider.bot

    bot.onText(/\/pic1/, message => {
        bot.sendPhoto(message.chat.id, fs.readFileSync(path.normalize(__dirname + '/../data/bicycle.jpg')))
    })

    bot.onText(/\/pic2/, message => {
        bot.sendPhoto(message.chat.id, 'https://images.all-free-download.com/images/wallpapers_thum/bicycle_mountain_view_13776.jpg', {
            caption: 'this is bicycle'
        })
    })

    bot.onText(/\/audio/, message => {

        bot.sendMessage(message.chat.id, 'Загружаем песенку')

        fs.readFile(path.normalize(__dirname + '/../data/music-for-travel.mp3'), (error, buffer) => {

            if (error) {
                return bot.sendMessage(message.chat.id, 'Упс, ошибочка')
            }

            bot.sendAudio(message.chat.id, buffer, {
                caption: 'Когда в автобусе, если стримите на твич',
                title: 'Музычка для путешествий'
            })
        })
    })

    bot.onText(/\/file1/, message => {
        bot.sendPhoto(message.chat.id, fs.readFileSync(path.normalize(__dirname + '/../data/file.txt')))
    })

    bot.onText(/\/file2/, async message => {

        const messageLoading = await bot.sendMessage(message.chat.id, 'Загружаем ФАЙЛИК')

        fs.readFile(path.normalize(__dirname + '/../data/jjj.zip'), async (error, buffer) => {

            if (error) {
                return bot.sendMessage(message.chat.id, 'Упс, ошибочка')
            }

            await bot.sendDocument(message.chat.id, buffer, {
                caption: 'Когда в автобусе, если стримите на твич',
            }, {})

            bot.deleteMessage(message.chat.id, messageLoading.message_id.toString())
        })
    })

    bot.onText(/\/sticker1/, message => {
        bot.sendSticker(message.chat.id, fs.readFileSync(path.normalize(__dirname + '/../data/sticker.webp')))
    })

    bot.onText(/\/sticker2/, async message => {
        const messageLoading = await bot.sendMessage(message.chat.id, 'Загружаем Стикер')

        fs.readFile(path.normalize(__dirname + '/../data/sticker.webp'), async (error, buffer) => {

            if (error) {
                console.log(error)
                await bot.sendMessage(message.chat.id, 'Упс, ошибочка')
            } else {
                await bot.sendSticker(message.chat.id, buffer)
            }

            bot.deleteMessage(message.chat.id, messageLoading.message_id.toString())
        })
    })

    bot.onText(/\/video1/, async message => {

        const messageLoading = await bot.sendMessage(message.chat.id, 'Загружаем видео')

        fs.readFile(path.normalize(__dirname + '/../data/video.mov'), async (error, buffer) => {

            if (error) {
                console.log(error)
                await bot.sendMessage(message.chat.id, 'OOOPS error :(')
            } else {
                await bot.sendVideo(message.chat.id, buffer, {

                })
            }

            bot.deleteMessage(message.chat.id, messageLoading.message_id.toString())
        })

    })

    bot.onText(/\/location/, async message => {
        bot.sendLocation(message.chat.id, 56.351667, 41.317548)
    })

    bot.onText(/\/contact/, message => {
        bot.sendContact(message.chat.id, '89190130053', 'Sergey', { last_name: 'Tikhomirov', vcard: 'ffffff' })
    })
}