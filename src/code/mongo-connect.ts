import * as Mongoose from 'mongoose'

import { mongoUrl } from '../configs/config'


export default () => {

    Mongoose.connect(mongoUrl, {}, (error) => {

        if (error) {
            return console.log(`Mongo connect error. ${error}`)
        }

        console.log('Mongo onnected')
    })
}

type ActionMongoose<T> = () => Promise<T>
export const mongooseRequest = async <T>(action: ActionMongoose<T>) => {
    try {
        const result: T = await action()
        return { result }
    }
    catch(error) {
        return { error }
    }
}
