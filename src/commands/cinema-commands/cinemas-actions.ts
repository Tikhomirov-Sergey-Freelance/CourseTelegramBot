import TelegramBot = require('node-telegram-bot-api')

import BotProwider from '../../code/bot'

import { getChatId, sendHtml } from '../../code/bot-helper'

import FilmHelper from '../../models/films/helper'
import CinemaHelper from '../../models/cinemas/helper'
import UserHelper from '../../models/users/helper'

import { buttons, keyboards } from '../../keyboards'
import { filmsTitlesToHtml, filmDescriptionToHtml, sortCinemasByDistance, cinemasToHtml, cinemaToHtml } from '../../code/cinema-helper'
import { ACTION_TYPES } from '../../constants/callback-data-types'
import { AsyncLocalStorage } from 'async_hooks'

export const showLocation = (message: TelegramBot.Message) => {

    const chatId = message.chat.id

    return BotProwider.bot.sendMessage(chatId, 'Отправить местомоложение', {
        reply_markup: {
            keyboard: keyboards.cinemas
        }
    })
}

export const showCinemasByLocation = async (message: TelegramBot.Message) => {

    const chatId = message.chat.id

    const { error, result: cinemas } = await CinemaHelper.loadAll()

    if (error) {
        return sendHtml(chatId, 'Ууупс, не нашли кинотеатры поблизости :((', 'cinemas')
    }

    const sortedCinemas = sortCinemasByDistance(cinemas, message.location)
    const html = cinemasToHtml(sortedCinemas)
    return sendHtml(chatId, html, 'cinemas')
}

export const showCinemaInfo = async (message: TelegramBot.Message, [source, match]: RegExpExecArray) => {

    const chatId = message.chat.id
    const { error, result: cinema } = await CinemaHelper.cinemaById(match)

    if (error) {
        return sendHtml(chatId, 'УУУпс, не нашли кинотеатр', 'cinemas')
    }

    const html = cinemaToHtml(cinema)

    BotProwider.bot.sendMessage(chatId, html, {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: cinema.name,
                        url: cinema.url
                    }
                ],
                [
                    {
                        text: 'Показать на карте',
                        callback_data: JSON.stringify({
                            type: ACTION_TYPES.SHOW_CINEMA_MAP,
                            id: cinema.uuid
                        })
                    }
                ],
                [
                    {
                        text: 'Показать фильмы',
                        callback_data: JSON.stringify({
                            type: ACTION_TYPES.SHOW_FILMS_BY_CINEMA,
                            id: cinema.uuid
                        })
                    }
                ]
            ]
        }
    })
}

export const showCinemasByFilm = async (query: TelegramBot.CallbackQuery, data) => {

    const filmId = data.id
    const chatId = query.message.chat.id

    const { error, result: cinemas } = await CinemaHelper.findCinemasByFildId(filmId)

    if(error) {

        return BotProwider.bot.sendMessage(chatId, 'Уппс, произошла ошибка :((', {
            reply_markup: {
                keyboard: keyboards.home
            }
        })
    }

    const html = cinemasToHtml(cinemas)
    return sendHtml(chatId, html, 'cinemas')
}

export const showCinemasMap = async (query: TelegramBot.CallbackQuery, data) => {

    const cinemaId = data.id
    const chatId = query.message.chat.id

    BotProwider.bot.answerCallbackQuery(query.id)

    const { error, result: cinema } = await CinemaHelper.cinemaById(cinemaId)

    if(error) {

        return BotProwider.bot.sendMessage(chatId, 'Уппс, произошла ошибка :((', {
            reply_markup: {
                keyboard: keyboards.home
            }
        })
    }

    return BotProwider.bot.sendLocation(chatId, cinema.location.latitude, cinema.location.longitude)
}

