import BotProwider from '../code/bot'
import { getChatId, sendHtml } from '../code/bot-helper'

import FilmHelper from '../models/films/helper'
import CinemaHelper from '../models/cinemas/helper'

import { buttons, keyboards } from '../keyboards'
import { filmsTitlesToHtml, filmDescriptionToHtml, sortCinemasByDistance, cinemasToHtml } from '../code/cinema-helper'


export default () => {

    const bot = BotProwider.bot

    bot.on('message', async message => {

        const chatId = getChatId(message)

        switch (message.text) {

            case buttons.home.favourite:

                break

            case buttons.home.films:
                bot.sendMessage(chatId, 'Выберите жанр', {
                    reply_markup: {
                        keyboard: keyboards.films
                    }
                })
                break

            case buttons.home.cinemas:

                bot.sendMessage(chatId, 'Отправить местомоложение', {
                    reply_markup: {
                        keyboard: keyboards.cinemas
                    }
                })

                break

            case buttons.films.comedy: {

                const filmscomedy = (await FilmHelper.filmsByType('comedy')).result
                const html = filmsTitlesToHtml(filmscomedy)

                sendHtml(chatId, html, 'films')
            }
                break

            case buttons.films.action: {

                const filmsaction = (await FilmHelper.filmsByType('action')).result
                const html = filmsTitlesToHtml(filmsaction)

                sendHtml(chatId, html, 'films')
            }
                break

            case buttons.films.random: {

                const filmsall = (await FilmHelper.allFilms()).result
                const html = filmsTitlesToHtml(filmsall)

                sendHtml(chatId, html, 'films')
            }
                break

            case buttons.films.back:
                bot.sendMessage(chatId, 'Что хотите посмотреть', {
                    reply_markup: {
                        keyboard: keyboards.home
                    }
                })
                break

        }

        if(message.location) {

            const { error, result: cinemas } = await CinemaHelper.loadAll()

            if(error) {
                return sendHtml(chatId, 'Ууупс, не нашли кинотеатры поблизости :((', 'cinemas')
            }

            const sortedCinemas = sortCinemasByDistance(cinemas, message.location)
            const html = cinemasToHtml(sortedCinemas)
            return sendHtml(chatId, html, 'cinemas')
        }

    })

    bot.onText(/\/start/, message => {

        const text = `Здравствуйте, ${message.from.first_name}\nВыберите команду для начала работы`

        bot.sendMessage(getChatId(message), text, {
            reply_markup: {
                keyboard: keyboards.home
            }
        })
    })

    bot.onText(/\/f(.+)/, async (message, [source, match]) => {

        const chatId = message.chat.id
        const { error, result: film } = await FilmHelper.filmById(match)

        if (error) {
            return sendHtml(chatId, 'УУУпс, фильм не найдем :(((', 'films')
        }

        const caption = filmDescriptionToHtml(film)

        bot.sendPhoto(chatId, film.picture, {
            caption,
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Добавить в избранное',
                            callback_data: film.uuid
                        }
                    ],
                    [
                        {
                            text: 'Показать кинотеатры',
                            callback_data: film.uuid
                        }
                    ],
                    [
                        {
                            text: `Кинопоиск ${film.name}`,
                            url: film.link
                        }
                    ]
                ]
            }
        })
    })
}