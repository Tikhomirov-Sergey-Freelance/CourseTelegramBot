import mongoConnect from './code/mongo-connect'
import initBot from './init-bot'
import initCommands from './init-commands'

mongoConnect()
initBot()
initCommands()