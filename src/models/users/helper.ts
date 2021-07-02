import Schema, { iUser } from '.'
import FilmHelper from '../films/helper'
import { iFilm } from '../films'
import { mongooseRequest } from '../../code/mongo-connect'

export default class UserHelper {

    static findUserById(id: number) {
        return mongooseRequest(async () => {
            return Schema.findOne({ telegramId: id })
        })
    }

    static toggleFavorite(userId: number, filmId: string, isFavorite: boolean) {

        return mongooseRequest<boolean>(async () => {

            let { result: user } = await this.findUserById(userId) 

            if(!user) {
                user = new Schema({ telegramId: userId, films: [] })
            }

            if(isFavorite) {
                user.films = user.films.filter(film => film !== filmId)
            } else {
                user.films.push(filmId)
            }

            await user.save()

            return true
        })
    }

    static getFavoriteFilms(userId: number) {

        return mongooseRequest<iFilm[]>(async () => {

            const { error: loadUserError, result: user } = await this.findUserById(userId) 
            
            if(loadUserError) {
                throw new Error(loadUserError)
            }

            if(!user || !user.films.length) {
                return []
            }

            const { error, result: films } = await FilmHelper.filmsByIds(user.films)

            if(error) {
                throw new Error(error)
            }

            return films
        })

    }
}