import TelegramBot = require('node-telegram-bot-api')

import BotProwider from '../../code/bot'

import { getChatId, sendHtml } from '../../code/bot-helper'

import FilmHelper from '../../models/films/helper'
import CinemaHelper from '../../models/cinemas/helper'
import UserHelper from '../../models/users/helper'

import { buttons, keyboards } from '../../keyboards'
import { filmsTitlesToHtml, filmDescriptionToHtml, sortCinemasByDistance, cinemasToHtml, cinemaToHtml } from '../../code/cinema-helper'
import { ACTION_TYPES } from '../../constants/callback-data-types'

export const showFavorite = async (message: TelegramBot.Message) => {

    const chatId = message.chat.id
    const userId = message.from.id

    const { error, result: films } = await UserHelper.getFavoriteFilms(userId)

    if(error) {

        return BotProwider.bot.sendMessage(chatId, 'Уппс, произошла ошибка :((', {
            reply_markup: {
                keyboard: keyboards.home
            }
        })
    }

    const html = filmsTitlesToHtml(films)
    return sendHtml(chatId, html, 'films')
}

export const selectGenre = (message: TelegramBot.Message) => {

    const chatId = message.chat.id

    return BotProwider.bot.sendMessage(chatId, 'Выберите жанр', {
        reply_markup: {
            keyboard: keyboards.films
        }
    })
}

export const showComedies = async (message: TelegramBot.Message) => {

    const chatId = message.chat.id

    const filmscomedy = (await FilmHelper.filmsByType('comedy')).result
    const html = filmsTitlesToHtml(filmscomedy)

    return sendHtml(chatId, html, 'films')
}

export const showActions = async (message: TelegramBot.Message) => {

    const chatId = message.chat.id

    const filmsaction = (await FilmHelper.filmsByType('action')).result
    const html = filmsTitlesToHtml(filmsaction)

    return sendHtml(chatId, html, 'films')
}

export const showAll = async (message: TelegramBot.Message) => {

    const chatId = message.chat.id

    const filmsall = (await FilmHelper.allFilms()).result
    const html = filmsTitlesToHtml(filmsall)

    return sendHtml(chatId, html, 'films')
}

export const showFilmInfo = async (message: TelegramBot.Message, [source, match]: RegExpExecArray) => {

    const chatId = message.chat.id
    const { error, result: film } = await FilmHelper.filmById(match)

    if (error) {
        return sendHtml(chatId, 'УУУпс, фильм не найдем :(((', 'films')
    }

    const { result: user } = await UserHelper.findUserById(message.from.id)
    const isFavorite = user && user.films.some(f => f === film.uuid)

    const caption = filmDescriptionToHtml(film)

    return BotProwider.bot.sendPhoto(chatId, film.picture, {
        caption,
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: isFavorite ? 'Удалить из избраннго' : 'Добавить в избранное',
                        callback_data: JSON.stringify({
                            type: ACTION_TYPES.TOGGLE_FAVORITE_FILM,
                            id: film.uuid,
                            isFavorite
                        })
                    }
                ],
                [
                    {
                        text: 'Показать кинотеатры',
                        callback_data: JSON.stringify({
                            type: ACTION_TYPES.SHOW_CINEMAS,
                            id: film.uuid
                        })
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
}

export const back = (message: TelegramBot.Message) => {

    const chatId = message.chat.id

    return BotProwider.bot.sendMessage(chatId, 'Что хотите посмотреть', {
        reply_markup: {
            keyboard: keyboards.home
        }
    })
}

export const toogleFavoriteFilm = async (query: TelegramBot.CallbackQuery, data) => {

    const { error } = await UserHelper.toggleFavorite(query.from.id, data.id, data.isFavorite)

    BotProwider.bot.answerCallbackQuery(query.id)

    if (error) {
        return BotProwider.bot.answerCallbackQuery(query.id, { text: 'Упс, произошла ошибка :(' })
    }

    const message = data.isFavorite ? 'Фильм удален из избранного' : 'Фильм добавлен в избранное'
    return BotProwider.bot.answerCallbackQuery(query.id, { text: message })
}

export const showCinemasFilms = async (query: TelegramBot.CallbackQuery, data) => {

    const cinemaId = data.id
    const chatId = query.message.chat.id

    BotProwider.bot.answerCallbackQuery(query.id)

    const { error, result: films } = await FilmHelper.filmsByCinemasId(cinemaId)

    if(error) {

        return BotProwider.bot.sendMessage(chatId, 'Уппс, произошла ошибка :((', {
            reply_markup: {
                keyboard: keyboards.home
            }
        })
    }

    const html = filmsTitlesToHtml(films)
    return sendHtml(chatId, html, 'films')
}

export const inlineQueryShowFilms = async (query: TelegramBot.InlineQuery) => {

    const { error, result: films } = await FilmHelper.filmsByQuery({  })
    
    const results: TelegramBot.InlineQueryResult[] = films.map(film => ({
        id: film.uuid,
        type: 'photo',
        photo_url: film.picture,
        thumb_url: film.picture,
        caption: `Название: ${film.name}\nГод: ${film.year}\nРейтинг: ${film.rate} из 10\nДлительность: ${film.length}\nСтрана: ${film.country}`,
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: `Кинопоиск ${film.name}`,
                        url: film.link
                    }
                ]
            ]
        }
    }))

    return BotProwider.bot.answerInlineQuery(query.id, results, {
        cache_time: 0
    })
}

