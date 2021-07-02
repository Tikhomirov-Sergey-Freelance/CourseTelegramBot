import TelegramBot = require('node-telegram-bot-api')
import * as lodash from 'lodash'
import * as geolib from 'geolib'

import { iFilm } from '../models/films'
import { iCinema } from '../models/cinemas'
import CinemasHelper from '../models/cinemas/helper'

export const filmsTitlesToHtml = (films: iFilm[]) => {

    const filmsHtml = films.map((film, index) => {
        return `<b>${index + 1}</b> ${film.name} - /f${film.uuid}`
    })

    return filmsHtml.join('\n')
}

export const filmDescriptionToHtml = (film: iFilm) => {

    return (
        `Название: ${film.name}\nГод: ${film.year}\nРейтинг: ${film.rate} из 10\nДлительность: ${film.length}\nСтрана: ${film.country}`
    )
}

export const cinemasToHtml = (cinemas: iCinema[]) => {

    const html = cinemas.map((cinema, index) => `<b>${index + 1}</b> ${cinema.name}${cinema.distance ? `.<em>Расстояние</em> - <strong>${distanceForHtml(cinema.distance)}</strong>` : ''} - /c${cinema.uuid}`)
    return html.join('\n')
}

export const cinemaToHtml = (cinema: iCinema) => {

    const html = `Кинотеатр ${cinema.name}`
    return html 
}

export const sortCinemasByDistance = (cinemas: iCinema[], location: TelegramBot.Location) => {

    cinemas.forEach(cinema => {
        cinema.distance = geolib.getDistance(location, cinema.location)
    })

    return cinemas.sort((a, b) => a.distance - b.distance)
}

export const distanceForHtml = (distance: number) => {


    if(distance < 1000) {
        return `${distance} м.`
    }

    return `${Math.round(distance / 1000)} км.`
}
