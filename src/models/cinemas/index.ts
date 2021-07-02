import { Schema, Types, model, SchemaTypeOptions } from 'mongoose'

export interface iCinema {
    uuid: string
    name: string
    location: iLocation
    url: string
    films: string[]
    distance?: number
}

interface iLocation {
    latitude: number
    longitude: number
}

const CinemaShema = new Schema<iCinema>({

    uuid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: Schema.Types.Mixed,
        required: true
    },
    url: {
        type: String,
        requered: true
    },
    films: {
        type: [String],
        required: true
    }
})

export default model<iCinema>('cinemas', CinemaShema)