import * as Constants from '../constants'
import RailRotationController from "../controllers/rail_rotation_controller";

/**
 * Each board has two crossing rails of coins
 */
export default class Rail {
    /** @type {Coin[]} */
    _coins = []
    _intersections = []
    _curve
    _railId
    _rotationController

    /**
     * IDs of the coins that intersect with the other rail, so we can hide
     * then in the game when the other wheel is rotation
     * @param {number} railId
     * @param {Coin[]} coins
     * @param {number[]} intersections
     * @param {Phaser.Curves.Curve} curve
     */
    constructor(
        railId,
        coins,
        intersections = [],
        curve
    ) {
        this._railId = railId
        this._coins = coins
        this._intersections = intersections
        this._curve = curve
        this._rotationController = new RailRotationController()
    }

    /**
     * @param {number} direction
     */
    changeState(direction) {
        if (direction === Constants.CLOCKWISE) {
            this._rotateClockWise()
        } else {
            this._rotateAntiClockWise()
        }
    }

    _rotateClockWise() {
        let colours = this._getColoursSnapshot();
        let previousCoinId
        let lastIndex = this._coins.length - 1

        for (let i = 0; i < this._coins.length; i++) {
            previousCoinId = this._getPreviousCoinId(i, lastIndex)
            this._coins[i].setColour(colours[previousCoinId])
        }
    }

    _rotateAntiClockWise() {
        let colours = this._getColoursSnapshot();
        let nextCoinId
        let lastIndex = this._coins.length - 1

        for (let i = 0; i < this._coins.length; i++) {
            nextCoinId = this._getNextCoinId(i, lastIndex)
            this._coins[i].setColour(colours[nextCoinId])
        }
    }

    /**
     * @param visible
     */
    setIntersectionCoinsVisibility(visible = true) {
        for (let i = 0; i < this._coins.length; i++) {
            if (this._intersections.includes(i)) {
                this._coins[i].setVisibility(visible)
            }
        }
    }

    /**
     * @returns {*[]}
     */
    _getColoursSnapshot() {
        let colours = []
        for (let i = 0; i < this._coins.length; i++) {
            colours.push(this._coins[i].getColour())
        }
        return colours
    }

    /**
     * @param {number} currentIndex
     * @param {number} lastIndex
     * @returns {number}
     * @private
     */
    _getPreviousCoinId(currentIndex = 0, lastIndex = 0) {
        if (currentIndex === 0) {
            return lastIndex
        }
        return currentIndex - 1
    }

    /**
     * @param {number} currentIndex
     * @param {number} lastIndex
     * @returns {number}
     * @private
     */
    _getNextCoinId(currentIndex = 0, lastIndex = 0) {
        if (currentIndex === lastIndex) {
            return 0
        }
        return currentIndex + 1
    }

    /**
     * @returns {Coin[]}
     */
    getCoins(){
        return this._coins
    }

    /**
     * @returns {Phaser.Curves.Curve}
     */
    getCurve(){
        return this._curve
    }

    /**
     * @param {number} position
     * @returns {Coin}
     */
    getCoinAtPosition(position = 0) {
        return this._coins[position]
    }

    /**
     * @param {number[]} positions
     * @returns {Coin[]}
     */
    getCoinsAtPositions(positions = []) {
        let coins = []
        for (let i = 0; i < positions.length; i++) {
            coins.push(this.getCoinAtPosition(positions[i]))
        }
        return coins
    }

    /**
     * @returns {number}
     */
    getRailId() {
        return this._railId
    }

    /**
     * @param {number} position
     * @param {string} colour
     */
    setCoinColourAtPosition(position = 0, colour = Constants.WHITE.hex) {
        this._coins[position].setColour(colour)
    }

    /**
     * @param {number[]} positions
     * @param {string} colour
     */
    setCoinColourAtPositions(positions = [], colour = Constants.WHITE.hex) {
        for (let i = 0; i < positions.length; i++) {
            this.setCoinColourAtPosition(positions[i], colour)
        }
    }

    /**
     * When you release the GUI the controller rotate the percentage
     * back to 0%
     * @param speed
     */
    rollback(speed = 1) {
        this._rotationController.rollback(speed)
    }

    /**
     * We are rotating the controller but the rail may not click over
     * until the controller has moved 100%.  Percentage is used for
     * animation lerping
     * @param direction
     * @param speed
     */
    rotate(direction = Constants.CLOCKWISE, speed = 1) {
        this._rotationController.rotate(direction, speed)
    }

    /**
     * Is the rail ready to rotate to the next state?
     * @returns {boolean}
     */
    isReadyToChangeState() {
        return this._rotationController.isReadyToChangeState()
    }

    /**
     * @returns {number}
     */
    getState() {
        return this._rotationController.getState()
    }

    /**
     * @returns {number}
     */
    getPercentage() {
        return this._rotationController.getPercentage()
    }

    /**
     * @returns {number}
     */
    getDirection() {
        return this._rotationController.getDirection()
    }
}
