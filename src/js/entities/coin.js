import * as Constants from '../constants'

/**
 * Each rail has multiple coins
 */
export default class Coin {
    _number
    _colour
    _visibility
    _x
    _y
    _previousX
    _previousY
    _nextX
    _nextY

    /**
     * @param {number} number
     * @param {number} x
     * @param {number} y
     * @param {number} previousX
     * @param {number} previousY
     * @param {number} nextX
     * @param {number} nextY
     */
    constructor(
        number = 1,
        x = 0,
        y = 0,
        previousX = 0,
        previousY = 0,
        nextX = 0,
        nextY = 0
    ) {
        this._colour = Constants.WHITE.hex
        this._visibility = true
        this._number = number
        this._x = x
        this._y = y
        this._previousX = previousX
        this._previousY = previousY
        this._nextX = nextX
        this._nextY = nextY
    }

    /**
     * @returns {number}
     */
    getInitialX() {
        return this._x
    }

    /**
     * @returns {number}
     */
    getInitialY() {
        return this._y
    }

    /**
     * @param {string} colour
     */
    setColour(colour) {
        this._colour = colour
    }

    /**
     * @returns {string}
     */
    getColour() {
        return this._colour
    }

    /**
     * @param visible
     */
    setVisibility(visible = true) {
        this._visibility = visible
    }

    /**
     * @returns {*}
     */
    getVisibility() {
        return this._visibility
    }

    /**
     * @param {number} state
     * @param {number} direction
     * @param {number} percentage
     * @returns {number}
     */
    getX(state = Constants.REST, direction = Constants.CLOCKWISE, percentage = 0) {
        if (percentage <= 0 || state === Constants.REST) {
            return this._x
        }

        percentage = (percentage/100).toFixed(2)
        if (direction === Constants.CLOCKWISE) {
            return Math.round(Phaser.Math.Interpolation.Linear([this._x, this._nextX], percentage))
        } else {
            return Math.round(Phaser.Math.Interpolation.Linear([this._x, this._previousX], percentage))
        }
    }

    /**
     * @param {number} state
     * @param {number} direction
     * @param {number} percentage
     * @returns {number}
     */
    getY(state = Constants.REST, direction = Constants.CLOCKWISE, percentage = 0) {
        if (percentage <= 0 || state === Constants.REST) {
            return this._y
        }

        percentage = (percentage/100).toFixed(2)
        if (direction === Constants.CLOCKWISE) {
            return Phaser.Math.Interpolation.Linear([this._y, this._nextY], percentage)
        } else {
            return Phaser.Math.Interpolation.Linear([this._y, this._previousY], percentage)
        }
    }

    /**
     * @returns {number}
     */
    getNumber() {
        return this._number
    }
}
