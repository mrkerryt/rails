/**
 * A puzzle can have multiple solutions
 */
export default class Puzzle {
    _solved = false

    constructor() {
        this._solved = false
    }

    /**
     * Is the board in a state where we can perform an action, i.e.
     * change some coins colours
     * @param {Board} board
     * @returns {boolean}
     */
    isActionable(board) {
        return false
    }

    /**
     * If board is in actionable state, then perform an action
     * @param {Board} board
     * @param {Game} ctx
     */
    doAction(board, ctx) {
    }

    /**
     * If board is solved then level complete
     * @param {Board} board
     * @returns {boolean}
     */
    isSolved(board) {
        if (this._solved === true) {
            return true
        }
    }

    /**
     * Pass in an object with key/value pairs which match the rail's
     * coin colours
     * @param rail
     * @param solution
     * @returns {boolean}
     */
    isRailMatch(rail, solution = []) {
        let coin
        for (const key in solution) {
            coin = rail.getCoinAtPosition(key)
            if (coin.getColour() !== solution[key]) {
                return false
            }
        }
        return true
    }
}
