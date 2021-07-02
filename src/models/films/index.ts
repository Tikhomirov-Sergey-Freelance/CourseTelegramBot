import { Schema, Types, model, SchemaTypeOptions } from 'mongoose'
import Helper from './helper'

export interface iFilm {

    name: string
    type: string
    uuid: string

    year?: string
    rate?: number
    length?: string
    country?: string
    link?: string
    picture?: string
    cinemas: string[]

    isFavorite?: boolean
}

const FilmSchema = new Schema<iFilm>({

    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    uuid: {
        type: String,
        required: true
    },
    year: {
        type: String
    },
    rate: {
        type: Number
    },
    length: {
        type: String
    },
    country: {
        type: String
    },
    link: {
        type: String
    },
    picture: {
        type: String
    },
    cinemas: {
        type: [String],
        default: []
    }

})

export default model<iFilm>('films', FilmSchema)
export const FilmHelper = Helper