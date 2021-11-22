import * as Constants from '../constants'
import Puzzle from './puzzle.js';

/**
 * Puzzle: If we match 4 corners with the same colour (non-white) then we
 * remove those colours from the board, keep going until all colours
 * are removed
 */
export default class FourCorners extends Puzzle {
    _matches
    _coinsIds
    _solutions

    constructor() {
        super();
        this._solutions = [
            {
                0: Constants.TEAL.hex,
                3: Constants.TEAL.hex,
                8: Constants.TEAL.hex,
                11: Constants.TEAL.hex
            },
            {
                0: Constants.BURNT_UMBER.hex,
                3: Constants.BURNT_UMBER.hex,
                8: Constants.BURNT_UMBER.hex,
                11: Constants.BURNT_UMBER.hex
            },
            {
                0: Constants.ORANGE.hex,
                3: Constants.ORANGE.hex,
                8: Constants.ORANGE.hex,
                11: Constants.ORANGE.hex
            }
        ]

        this._matches = this._solutions.length
        this._coinsIds = [0, 3, 8, 11]
    }

    /**
     * Are all 4 corners the same colour?
     * @param {Board} board
     * @returns {boolean}
     */
    isActionable(board) {
        let railA = board.getRail(Constants.RAIL_A)

        for (let i = 0; i < this._solutions.length; i++) {
            if (this.isRailMatch(railA, this._solutions[i])) {
                this._matches--
                return true
            }
        }

        return false
    }

    /**
     * Set the 4 corners to white, tween colours maybe or play sound
     * @param {Board} board
     * @param {Game} ctx
     */
    doAction(board, ctx) {
        // Snapshot of coin colours
        let snapshot = board.getRail(Constants.RAIL_A)._getColoursSnapshot()

        // Update the coins
        board.getRail(Constants.RAIL_A).setCoinColourAtPositions(
            this._coinsIds,
            Constants.WHITE.hex
        )
        board.synchroniseRail(Constants.RAIL_B)

        // Play the animations
        let coins = board.getRail(Constants.RAIL_A).getCoinsAtPositions(this._coinsIds)
        ctx.explode(coins, snapshot)
    }

    /**
     * @param {Board} board
     * @returns {boolean}
     */
    isSolved(board) {
        if (this._solved === true) {
            return true
        }

        if (this._matches <= 0) {
            this._solved = true
            return true
        }

        return false
    }
}
