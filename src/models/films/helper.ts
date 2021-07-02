import Shema, { iFilm } from '.'
import { mongooseRequest } from '../../code/mongo-connect'

export default class FilmsHelper {

    static filmsByQuery(query) {

        return mongooseRequest<iFilm[]>(async () => {
            return Shema.find(query)
        })
    }

    static filmById(id) {

        return mongooseRequest<iFilm>(async () => {
            return Shema.findOne({ uuid: id })
        })
    }

    static filmsByType(type) {

        return mongooseRequest<iFilm[]>(async () => {
            return Shema.find({ type })
        })
    }

    static allFilms() {
        return mongooseRequest<iFilm[]>(async () => {
            return Shema.find() 
        })
    }
}