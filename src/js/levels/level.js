import Sequence from "../entities/sequence";
import Command from "../entities/command";
import Board from "../entities/board";
import * as Constants from "../constants";

/**
 * Abstract class should not be implemented
 * Levels consist of a board and a collection of puzzles to solve
 */
export default class Level {
    /** @type {Board} */
    _board

    /** @type {Puzzle} */
    _puzzle

    constructor() {
        this._createBoard()
        this._setCoinAttributes()
        this._createPuzzle()
    }

    _createBoard() {
        let shuffle = this._createShuffleSequence()
        this._board = new Board(shuffle)
    }

    /**
     * @returns {Sequence}
     * @private
     */
    _createShuffleSequence() {
        let shuffle = this._getShuffleData()
        let sequence = new Sequence()
        for (let i = 0; i < shuffle.length; i++) {
            sequence.addCommand(
                new Command(
                    shuffle[i].rail_id,
                    shuffle[i].direction,
                    shuffle[i].clicks
                )
            )
        }
        return sequence
    }

    /**
     * Set the colours of the coins on the rails
     * @private
     */
    _setCoinAttributes() {
        let data = this._getCoinData()
        let railA = this._board.getRail(Constants.RAIL_A)
        let railB = this._board.getRail(Constants.RAIL_B)
        let indexId, railId, colour, indexIds

        for (let i = 0; i < data.length; i++) {
            railId = data[i].rail_id
            colour = data[i].colour
            indexIds = data[i].indexes

            for (let j = 0; j < indexIds.length; j++) {
                indexId = indexIds[j]
                if (railId === Constants.RAIL_A) {
                    railA.setCoinColourAtPosition(indexId, colour)
                } else {
                    railB.setCoinColourAtPosition(indexId, colour)
                }
            }
        }

        this._board.validateIntersections()
    }

    /**
     * Each Level has a different layout of coins
     * @private
     */
    _getCoinData() {
        throw new Error("Implement _getCoinData in a sub class")
    }

    /**
     * Each Level has a different puzzle to solve
     * @private
     */
    _createPuzzle() {
        throw new Error("Implement _createPuzzle in a sub class")
    }

    /**
     * Each level needs to be shuffled differently
     * @private
     */
    _getShuffleData() {
        throw new Error("Implement _getShuffle in a sub class")
    }

    /**
     * @returns {Board}
     */
    getBoard() {
        return this._board
    }

    /**
     * @returns {Puzzle}
     */
    getPuzzle() {
        return this._puzzle
    }
}
