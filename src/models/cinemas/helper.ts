import Shema, { iCinema } from '.'
import { mongooseRequest } from '../../code/mongo-connect'

export default class CinemaHelper {

    static loadAll() {

        return mongooseRequest<iCinema[]>(async () => {
            return Shema.find()
        })
    }

}