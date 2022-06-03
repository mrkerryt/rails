/**
 * Sequence of commands used for shuffling rails and undo operations
 */
export default class Sequence {
    /**
     * @type {Command[]}
     */
    _commands = []

    constructor() {
        this._commands = []
    }

    getCommands() {
        return this._commands
    }

    /**
     * @returns {Command|boolean}
     */
    getCurrentCommand() {
        if (this._commands.length === 0) {
            return false
        }
        return this._commands[this._commands.length - 1]
    }

    updateCurrentCommand() {
        let command = this.getCurrentCommand()
        if (command === false) {
            return false
        }

        command.decreaseClicks()
        if (command.getClicks() <= 0) {
            this.removeCurrentCommand()
        }
    }

    /**
     * Add new command unless it's the same rail as the last command,
     * and then we just modify the vector
     * @param {Command} command
     */
    addCommand(command) {
        let currentCommand = this.getCurrentCommand()
        if (currentCommand === false) {
            // Command list is empty so add a new command
            this._commands.push(command)

        } else {
            if (currentCommand.getRailId() === command.getRailId()
                && currentCommand.getDirection() === command.getDirection()
            ) {
                currentCommand.increaseClicks(command.getClicks())
            } else {
                this._commands.push(command)
            }
        }
    }

    removeCurrentCommand() {
        this._commands.pop()
    }
}
