import initTestCommands from './commands/test'
import initPayCommands from './commands/pay-test'
import initCinemaCommands from './commands/cinema-commands'

export default () => {

    initPayCommands()
    initTestCommands()
    initCinemaCommands()

}