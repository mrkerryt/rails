import * as Constants from '../constants'
import Puzzle from './puzzle.js';

/**
 * Puzzle: Place a line of red coins on the top bar
 */
export default class RedTop extends Puzzle {
    /**
     * @param {Board} board
     * @returns {boolean}
     */
    isSolved(board) {
        if (this._solved === true) {
            return true
        }

        let solution = {
            0: Constants.TEAL.hex,
            1: Constants.TEAL.hex,
            2: Constants.TEAL.hex,
            3: Constants.TEAL.hex
        }

        let railA = board.getRail(Constants.RAIL_A)
        if (this.isRailMatch(railA, solution)) {
            this._solved = true
            return true
        }

        return false
    }
}
