import * as Constants from '../constants'

/**
 * Rail rotation needs to be smooth rather than a series of stuttered states
 * we need in between animation frames, e.g. 75% between stateA and stateB
 */
export default class RailRotationController {
    _state
    _lastDirection
    _percentage

    constructor() {
        this._lastDirection = null
        this._percentage = 0
        this._state = Constants.REST
    }

    /**
     * We are rotating the controller but the rail may not click over
     * until the controller has moved 100%.  Percentage is used for
     * animation lerping
     * @param direction
     * @param speed
     */
    rotate(direction = Constants.CLOCKWISE, speed = 1) {
        this._state = Constants.MOVING
        if (this._isMovingInSameDirection(direction)) {
            this._percentage += speed
            if (this._percentage >= 100) {
                this._percentage = 100
            }
        } else {
            this._percentage = 0
        }
        this._lastDirection = direction
    }

    /**
     * When you release the GUI the controller rotate the percentage
     * back to 0%
     * @param speed
     */
    rollback(speed = 1) {
        this._state = Constants.ROLLBACK
        if (this._percentage <= 0) {
            this._state = Constants.REST
            this._percentage = 0

        } else if (this._percentage > 0) {
            this._percentage -= speed
        }
    }

    /**
     * Is the rail ready to rotate to the next state?
     * @returns {boolean}
     */
    isReadyToChangeState() {
        if (this._percentage >= 100) {
            this._percentage = 0
            return true
        }
        return false
    }

    /**
     * @returns {number}
     */
    getState() {
        return this._state
    }

    /**
     * @returns {number}
     */
    getPercentage() {
        return this._percentage
    }

    /**
     * @returns {number}
     */
    getDirection() {
        return this._lastDirection
    }

    /**
     * @param direction
     * @returns {boolean}
     * @private
     */
    _isMovingInSameDirection(direction) {
        return (direction === this._lastDirection || this._lastDirection == null)
    }
}
