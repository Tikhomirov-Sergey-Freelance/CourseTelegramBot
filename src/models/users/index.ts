import { Schema, model } from 'mongoose'

export interface iUser {
    telegramId: number,
    films: string[]
}

export const UserSchema = new Schema<iUser>({

    telegramId: {
        type: Number,
        requered: true
    },
    films: {
        type: [String],
        default: []
    }

})

export default model<iUser>('users', UserSchema)