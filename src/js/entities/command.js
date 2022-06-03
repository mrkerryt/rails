import * as Constants from '../constants'

/**
 * Represents the rotation of one of the rails, which direction and how far
 */
export default class Command {
    _railId
    _direction
    _clicks

    constructor(
        railId = Constants.RAIL_A,
        direction = Constants.CLOCKWISE,
        clicks = 1
    ) {
        this._railId = railId
        this._direction = direction
        this._clicks = clicks
    }

    /**
     * @param {number} clicks
     */
    decreaseClicks(clicks = 1) {
        this._clicks -= clicks
    }

    /**
     * @param {number} clicks
     */
    increaseClicks(clicks = 0) {
        this._clicks += clicks
    }

    /**
     * @returns {number}
     */
    getRailId() {
        return this._railId
    }

    /**
     * @returns {number}
     */
    getDirection() {
        return this._direction
    }

    /**
     * @returns {number}
     */
    getClicks() {
        return this._clicks
    }
}
