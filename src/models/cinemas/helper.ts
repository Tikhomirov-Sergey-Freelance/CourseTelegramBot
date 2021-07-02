import Shema, { iCinema } from '.'
import { mongooseRequest } from '../../code/mongo-connect'

export default class CinemaHelper {

    static cinemaById(id) {

        return mongooseRequest<iCinema>(async () => {
            return Shema.findOne({ uuid: id })
        })
    }

    static loadAll() {

        return mongooseRequest<iCinema[]>(async () => {
            return Shema.find()
        })
    }

    static findCinemasByFildId(filmId) {

        return mongooseRequest<iCinema[]>(async () => {
            return Shema.find({ films: { '$in': filmId } })
        })
    }
}