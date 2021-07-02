import Schema, { iFilm } from '.'
import { mongooseRequest } from '../../code/mongo-connect'

export default class FilmsHelper {

    static filmsByQuery(query) {

        return mongooseRequest<iFilm[]>(async () => {
            return Schema.find(query)
        })
    }

    static filmById(id) {

        return mongooseRequest<iFilm>(async () => {
            return Schema.findOne({ uuid: id })
        })
    }

    static filmsByType(type) {

        return mongooseRequest<iFilm[]>(async () => {
            return Schema.find({ type })
        })
    }

    static allFilms() {

        return mongooseRequest<iFilm[]>(async () => {
            return Schema.find() 
        })
    }

    static filmsByIds(ids: string[]) {

        return mongooseRequest<iFilm[]>(async () => {
            return Schema.find({ uuid: { '$in': ids } })
        })
    }

    static filmsByCinemasId(cinemaId: string) {

        return mongooseRequest<iFilm[]>(async () => {
            return Schema.find({ cinemas: cinemaId })
        })
    }
}