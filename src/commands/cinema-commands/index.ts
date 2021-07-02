import BotProwider from '../../code/bot'
import { getChatId, sendHtml } from '../../code/bot-helper'

import FilmHelper from '../../models/films/helper'
import CinemaHelper from '../../models/cinemas/helper'
import UserHelper from '../../models/users/helper'

import { buttons, keyboards } from '../../keyboards'
import { filmsTitlesToHtml, filmDescriptionToHtml, sortCinemasByDistance, cinemasToHtml, cinemaToHtml } from '../../code/cinema-helper'
import { ACTION_TYPES } from '../../constants/callback-data-types'

import * as filmsActions from './films-actions'
import * as cinemasActions from './cinemas-actions'
import * as commonActions from './common-actions'
import films from '../../models/films'


export default () => {

    const bot = BotProwider.bot

    bot.on('message', async message => {

        switch (message.text) {

            case buttons.home.favourite:
                filmsActions.showFavorite(message)
                break

            case buttons.home.films:
                filmsActions.selectGenre(message)
                break

            case buttons.home.cinemas:
                cinemasActions.showLocation(message)
                break

            case buttons.films.comedy: 
                filmsActions.showComedies(message)
                break

            case buttons.films.action: 
                filmsActions.showActions(message)
                break

            case buttons.films.random: 
                filmsActions.showAll(message)
                break

            case buttons.films.back:
                filmsActions.back(message)
                break
        }

        if(message.location) {
            cinemasActions.showCinemasByLocation(message)
        }
    })

    bot.onText(/\/start/, message => {
        commonActions.start(message)
    })

    bot.onText(/\/f(.+)/, (message, match) => {
        filmsActions.showFilmInfo(message, match)
    })

    bot.onText(/\/c(.+)/, async (message, match) => {
        cinemasActions.showCinemaInfo(message, match)
    })

    bot.on('callback_query', async query => {

        const data = JSON.parse(query.data)
        
        switch (data.type) {

            case ACTION_TYPES.TOGGLE_FAVORITE_FILM: 
                filmsActions.toogleFavoriteFilm(query, data)
            break

            case ACTION_TYPES.SHOW_CINEMAS:
                cinemasActions.showCinemasByFilm(query, data)
            break

            case ACTION_TYPES.SHOW_CINEMA_MAP:
                cinemasActions.showCinemasMap(query, data)
            break

            case ACTION_TYPES.SHOW_FILMS_BY_CINEMA:
                filmsActions.showCinemasFilms(query, data)
            break
        }
    })

    bot.on('inline_query', query => {
        filmsActions.inlineQueryShowFilms(query)
    })
}