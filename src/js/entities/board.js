import * as Constants from '../constants'
import RailBuilder from "./rail_builder";
import Command from "./command"

/**
 * Abstract class should not be implemented
 * A board has a couple of intersecting rails of varying sizes
 */
export default class Board {
    /** @type {Rail} */
    _railA

    /** @type {Rail} */
    _railB

    /** @type {Sequence} */
    _sequence

    /**
     * @param {Sequence} shuffleSequence
     */
    constructor(shuffleSequence) {
        this._sequence = shuffleSequence
        this._railA = this._buildRail(Constants.RAIL_A)
        this._railB = this._buildRail(Constants.RAIL_B)
    }

    /**
     * We were between two states so we have to animate back to the
     * previous state before we took our finger off the button
     * @param railId
     * @param speed
     */
    rollback(
        railId = Constants.RAIL_A,
        speed = Constants.ROTATION_SPEED
    ){
        if (railId === Constants.RAIL_A) {
            this._railA.rollback(speed)
        } else {
            this._railB.rollback(speed)
        }
    }

    /**
     * Rotate the rail round, just the animation, we do not necessarily
     * change state until it clicks over
     * @param railId
     * @param direction
     * @param speed
     * @param {boolean} isShuffle
     */
    rotateRail(
        railId = Constants.RAIL_A,
        direction = Constants.CLOCKWISE,
        speed = Constants.ROTATION_SPEED,
        isShuffle = false
    ) {
        if (railId === Constants.RAIL_A) {
            // RailA Moving, so hide RailB
            this._railA.rotate(direction, speed)
            if (this._railA.isReadyToChangeState()) {
                this.clickRail(railId, direction, isShuffle)
            }
            this._setIntersectionCoinsVisibility(Constants.RAIL_A, true)
            this._setIntersectionCoinsVisibility(Constants.RAIL_B, false)

        } else {
            // RailB Moving, so hide RailA
            this._railB.rotate(direction, speed)
            if (this._railB.isReadyToChangeState()) {
                this.clickRail(railId, direction, isShuffle)
            }
            this._setIntersectionCoinsVisibility(Constants.RAIL_B, true)
            this._setIntersectionCoinsVisibility(Constants.RAIL_A, false)
        }
    }

    /**
     * Rail clicks over to the next state
     * @param {number} railId
     * @param {number} direction
     * @param {boolean} isShuffle
     */
    clickRail(
        railId = Constants.RAIL_A,
        direction = Constants.CLOCKWISE,
        isShuffle = false
    ) {
        if (railId === Constants.RAIL_A) {
            if (direction === Constants.CLOCKWISE) {
                this._railA._rotateClockWise()
            } else {
                this._railA._rotateAntiClockWise()
            }
            this.synchroniseRail(Constants.RAIL_B)

        } else {
            if (direction === Constants.CLOCKWISE) {
                this._railB._rotateClockWise()
            } else {
                this._railB._rotateAntiClockWise()
            }
            this.synchroniseRail(Constants.RAIL_A)
        }

        if (isShuffle) {
            // removing command from shuffle stack
            this._sequence.updateCurrentCommand()
        } else {
            // Saving move in to history for undo command
            this._sequence.addCommand(new Command(railId, direction))
        }
    }

    /**
     * Hide or Show coins on the intersection points
     * @param {number} railId
     * @param {boolean} visible
     */
    _setIntersectionCoinsVisibility(railId = Constants.RAIL_A, visible = true) {
        if (railId === Constants.RAIL_A) {
            this._railA.setIntersectionCoinsVisibility(visible)
        } else {
            this._railB.setIntersectionCoinsVisibility(visible)
        }
    }

    /**
     * Check ALL intersection points for matching colours
     */
    validateIntersections() {
        if (this._checkIntersectionMatches(1) === false
            || this._checkIntersectionMatches(2) === false
            || this._checkIntersectionMatches(3) === false
            || this._checkIntersectionMatches(4) === false
        ) {
            throw new Error('There is an intersection error between the rails')
        }
    }

    /**
     * Check a single intersection point for matching colours
     * @param {number} intersectionId
     * @returns {boolean}
     * @private
     */
    _checkIntersectionMatches(intersectionId = 1) {
        let coinA = this._railA.getCoinAtPosition(
            this._getIntersectionId(Constants.RAIL_A, intersectionId)
        )

        let coinB = this._railB.getCoinAtPosition(
            this._getIntersectionId(Constants.RAIL_B, intersectionId)
        )

        if (coinA.getColour() !== coinB.getColour()) {
            throw Error('Mismatch at intersection '
                + intersectionId
                + ' ' + coinA.getColour()
                + ' !== ' + coinB.getColour()
            )
        }
        return true
    }

    /**
     * @param {number} from
     * @param {number} to
     * @private
     */
    _copyCoinAttributesFromRailAtoRailB(from = 0, to = 0) {
        let coin = this._railA.getCoinAtPosition(from)
        this._railB.setCoinColourAtPosition(to, coin.getColour())
    }

    /**
     * @param {number} from
     * @param {number} to
     * @private
     */
    _copyCoinAttributesFromRailBtoRailA(from = 0, to = 0) {
        let coin = this._railB.getCoinAtPosition(from)
        this._railA.setCoinColourAtPosition(to, coin.getColour())
    }

    /**
     * If we moved railA, then we need to synchronise the data in railB and vice versa
     * before drawing the sprites.
     * @param {number} railId
     */
    synchroniseRail(railId = Constants.RAIL_A) {
        if (railId === Constants.RAIL_A) {
            // B was updated so we need to synchronise A
            this._copyCoinAttributesFromRailBtoRailA(
                this._getIntersectionId(Constants.RAIL_B, 1),
                this._getIntersectionId(Constants.RAIL_A, 1),
            )
            this._copyCoinAttributesFromRailBtoRailA(
                this._getIntersectionId(Constants.RAIL_B, 2),
                this._getIntersectionId(Constants.RAIL_A, 2),
            )
            this._copyCoinAttributesFromRailBtoRailA(
                this._getIntersectionId(Constants.RAIL_B, 3),
                this._getIntersectionId(Constants.RAIL_A, 3),
            )
            this._copyCoinAttributesFromRailBtoRailA(
                this._getIntersectionId(Constants.RAIL_B, 4),
                this._getIntersectionId(Constants.RAIL_A, 4),
            )
        } else {
            // A was updated so we need to synchronise B
            this._copyCoinAttributesFromRailAtoRailB(
                this._getIntersectionId(Constants.RAIL_A, 1),
                this._getIntersectionId(Constants.RAIL_B, 1),
            )
            this._copyCoinAttributesFromRailAtoRailB(
                this._getIntersectionId(Constants.RAIL_A, 2),
                this._getIntersectionId(Constants.RAIL_B, 2),
            )
            this._copyCoinAttributesFromRailAtoRailB(
                this._getIntersectionId(Constants.RAIL_A, 3),
                this._getIntersectionId(Constants.RAIL_B, 3),
            )
            this._copyCoinAttributesFromRailAtoRailB(
                this._getIntersectionId(Constants.RAIL_A, 4),
                this._getIntersectionId(Constants.RAIL_B, 4),
            )
        }
    }

    /**
     * @param {number} railId
     * @returns {{percentage: number, state: *, direction: (number|*)}}
     */
    getRotationData(railId = Constants.RAIL_A) {
        if (railId === Constants.RAIL_A) {
            return {
                state: this._railA.getState(),
                direction: this._railA.getDirection(),
                percentage: this._railA.getPercentage()
            }
        } else {
            return {
                state: this._railB.getState(),
                direction: this._railB.getDirection(),
                percentage: this._railB.getPercentage()
            }
        }
    }

    /**
     * @param railId
     * @returns {number[]}
     * @private
     */
    _getIntersectionIds(railId = Constants.RAIL_A) {
        return [
            this._getIntersectionId(railId, 1),
            this._getIntersectionId(railId, 2),
            this._getIntersectionId(railId, 3),
            this._getIntersectionId(railId, 4)
        ]
    }

    /**
     * Depending on the number of coins each rail on a board has, this will give us different
     * intersection points on the rails.  So they are set at the board level.
     * @param railId
     * @param number
     * @returns {number}
     * @private
     */
    _getIntersectionId(railId = Constants.RAIL_A, number = 1) {
        if (railId === Constants.RAIL_A) {
            switch(number) {
                case 1:
                    return 0
                case 2:
                    return 3
                case 3:
                    return 8
                case 4:
                    return 11
            }
        } else {
            switch(number) {
                case 1:
                    return 0
                case 2:
                    return 5
                case 3:
                    return 8
                case 4:
                    return 13
            }
        }
    }

    /**
     * @returns {Rail}
     */
    _buildRail(railId = Constants.RAIL_A) {
        let railBuilder = new RailBuilder(
            this._getIntersectionIds(Constants.RAIL_A),
            this._getIntersectionIds(Constants.RAIL_B)
        )

        if (railId === Constants.RAIL_A) {
            return railBuilder.build(Constants.RAIL_A)
        } else {
            return railBuilder.build(Constants.RAIL_B)
        }
    }

    /**
     * @param {number} railId
     * @returns {Rail}
     */
    getRail(railId = Constants.RAIL_A) {
        if (railId === Constants.RAIL_A) {
            return this._railA;
        } else {
            return this._railB;
        }
    }

    /**
     * @returns {Sequence}
     */
    getSequence() {
        return this._sequence
    }
}
