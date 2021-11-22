import * as Constants from '../constants'
import Coin from './coin'

/**
 * Builds an array of coins, complete with their X and Y
 * coordinates for displaying the rail on screen
 */
export default class RailBuilder {
    /** @type {Coin[]} */
    _coins
    _railCurve
    _positionX
    _positionY
    _scale
    _unit

    constructor(){
        // window.devicePixelRatio
        this._unit = 50

        // want board to be 80% of the height
        this._scale = (window.screen.availHeight * 0.8) / (4 * this._unit)
        this._positionX = (window.screen.availWidth / 2) - ((2 * this._unit) * this._scale)
        this._positionY = (window.screen.availHeight * .1)
    }

    /**
     * @param {number} railId
     * @returns {Coin[]}
     */
    build(railId = Constants.RAIL_A) {
        let railPoints = this._getRailPoints(
            railId,
            this._positionX,
            this._positionY,
            this._scale,
            Constants.BOARD_BAR_PARTS,
            Constants.BOARD_BEND_PARTS
        )

        this._railCurve = new Phaser.Curves.Spline(railPoints.concat(railPoints[0]));

        let lastIndex = railPoints.length - 1
        let previousCoin
        let nextCoin
        let currentCoin
        let number = 1

        this._coins = []
        for (let i = 0; i < railPoints.length; i++) {
            number = i + 1
            currentCoin = railPoints[i]
            previousCoin = railPoints[this._getPreviousCoinId(i, lastIndex)]
            nextCoin = railPoints[this._getNextCoinId(i, lastIndex)]

            this._coins.push(
                new Coin(
                    number,
                    Math.round(currentCoin.x),
                    Math.round(currentCoin.y),
                    Math.round(previousCoin.x),
                    Math.round(previousCoin.y),
                    Math.round(nextCoin.x),
                    Math.round(nextCoin.y)
                )
            )
        }
    }

    /**
     * @returns {Coin[]}
     */
    getCoins() {
        return this._coins
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
     * @param {number} railId
     * @param {number} positionX
     * @param {number} positionY
     * @param {number} scale
     * @param {number} barParts
     * @param {number} bendParts
     * @returns {Phaser.Math.Vector2[]}
     */
    _getRailPoints(
        railId = Constants.RAIL_A,
        positionX = 0,
        positionY = 0,
        scale = 1,
        barParts = 10,
        bendParts = 10
    ) {
        let combinedPoints
        if (railId === Constants.RAIL_A) {
            let topBar = this._getScaffoldPoints(Constants.TOP_BAR, positionX, positionY, scale, barParts)
            let rightBend = this._getScaffoldPoints(Constants.RIGHT_BEND, positionX, positionY, scale, bendParts)
            let bottomBar = this._getScaffoldPoints(Constants.BOTTOM_BAR, positionX, positionY, scale, barParts)
            let leftBend = this._getScaffoldPoints(Constants.LEFT_BEND, positionX, positionY, scale, bendParts)

            combinedPoints = this._joinPoints(topBar, rightBend, false, false)
            combinedPoints = this._joinPoints(combinedPoints, bottomBar, false, false)
            combinedPoints = this._joinPoints(combinedPoints, leftBend, false, true)
        } else {
            let topBend = this._getScaffoldPoints(Constants.TOP_BEND, positionX, positionY, scale, bendParts)
            let rightBar = this._getScaffoldPoints(Constants.RIGHT_BAR, positionX, positionY, scale, barParts)
            let bottomBend = this._getScaffoldPoints(Constants.BOTTOM_BEND, positionX, positionY, scale, bendParts)
            let leftBar = this._getScaffoldPoints(Constants.LEFT_BAR, positionX, positionY, scale, barParts)

            combinedPoints = this._joinPoints(topBend, rightBar, false, false)
            combinedPoints = this._joinPoints(combinedPoints, bottomBend, false, false)
            combinedPoints = this._joinPoints(combinedPoints, leftBar, false, true)
        }
        return combinedPoints
    }

    /**
     * @param {Phaser.Math.Vector2[]} pointsA
     * @param {Phaser.Math.Vector2[]} pointsB
     * @param {boolean} trimStart
     * @param {boolean} trimEnd
     * @returns {Phaser.Math.Vector2[]}
     */
    _joinPoints(
        pointsA = [],
        pointsB = [],
        trimStart = false,
        trimEnd = false
    ) {
        pointsB.shift()
        if (trimStart) {
            pointsB.shift()
        }

        if (trimEnd) {
            pointsB.pop()
        }
        return pointsA.concat(pointsB)
    }

    /**
     * @param {number} curveId
     * @param {number} positionX
     * @param {number} positionY
     * @param {number} scale
     * @param {number} parts
     * @returns {Phaser.Math.Vector2[]}
     */
    _getScaffoldPoints(
        curveId = Constants.TOP_BAR,
        positionX = 0,
        positionY = 0,
        scale = 1,
        parts = 10
    ) {
        let curve = this._getScaffoldCurve(curveId, positionX, positionY, scale)
        return curve.getPoints(parts);
    }

    _offsetX(value = 0) {
        return (value * this._scale) + this._positionX
    }

    _offsetY(value = 0) {
        return (value * this._scale) + this._positionY
    }

    _getScaffoldRadius() {
        return this._unit * this._scale
    }

    _getScaffoldPoint(name = Constants.TOP_LEFT) {
        switch (name) {
            case Constants.TOP_LEFT:
                return {
                    x: this._offsetX(this._unit),
                    y: this._offsetY(this._unit)
                }
            case Constants.TOP_MIDDLE:
                return {
                    x: this._offsetX(2 * this._unit),
                    y: this._offsetY(this._unit)
                }
            case Constants.TOP_RIGHT:
                return {
                    x: this._offsetX(3 * this._unit),
                    y: this._offsetY(this._unit)
                }
            case Constants.MIDDLE_LEFT:
                return {
                    x: this._offsetX(this._unit),
                    y: this._offsetY(2 * this._unit)
                }
            case Constants.MIDDLE_RIGHT:
                return {
                    x: this._offsetX(3 * this._unit),
                    y: this._offsetY(2 * this._unit)
                }
            case Constants.BOTTOM_LEFT:
                return {
                    x: this._offsetX(this._unit),
                    y: this._offsetY(3 * this._unit)
                }
            case Constants.BOTTOM_MIDDLE:
                return {
                    x: this._offsetX(2 * this._unit),
                    y: this._offsetY(3 * this._unit)
                }
            case Constants.BOTTOM_RIGHT:
                return {
                    x: this._offsetX(3 * this._unit),
                    y: this._offsetY(3 * this._unit)
                }
        }
    }

    /**
     *
     * @param {number} curveId
     * @param {number} positionX
     * @param {number} positionY
     * @param {number} scale
     * @returns {Phaser.Curves.Curve}
     */
    _getScaffoldCurve(
        curveId = Constants.TOP_BAR,
        positionX = 0,
        positionY = 0,
        scale = 1
    ) {
        let from
        let to
        switch (curveId) {
            // RailA
            case Constants.TOP_BAR:
                from = this._getScaffoldPoint(Constants.TOP_LEFT)
                to = this._getScaffoldPoint(Constants.TOP_RIGHT)

                return new Phaser.Curves.Line(
                    new Phaser.Math.Vector2(from.x, from.y),
                    new Phaser.Math.Vector2(to.x, to.y)
                )
            case Constants.RIGHT_BEND:
                from = this._getScaffoldPoint(Constants.MIDDLE_RIGHT)

                return new Phaser.Curves.Ellipse(
                    from.x,
                    from.y,
                    this._getScaffoldRadius(),
                    this._getScaffoldRadius(),
                    270,
                    90,
                    false
                )
            case Constants.BOTTOM_BAR:
                from = this._getScaffoldPoint(Constants.BOTTOM_RIGHT)
                to = this._getScaffoldPoint(Constants.BOTTOM_LEFT)

                return new Phaser.Curves.Line(
                    new Phaser.Math.Vector2(from.x, from.y),
                    new Phaser.Math.Vector2(to.x, to.y)

                );
            case Constants.LEFT_BEND:
                from = this._getScaffoldPoint(Constants.MIDDLE_LEFT)

                return new Phaser.Curves.Ellipse(
                    from.x, // centre
                    from.y,
                    this._getScaffoldRadius(),
                    this._getScaffoldRadius(),
                    90,
                    270,
                    false
                );

            // RailB
            case Constants.TOP_BEND:
                from = this._getScaffoldPoint(Constants.TOP_MIDDLE)

                return new Phaser.Curves.Ellipse(
                    from.x,
                    from.y,
                    this._getScaffoldRadius(),
                    this._getScaffoldRadius(),
                    180,
                    0,
                    false
                );
            case Constants.RIGHT_BAR:
                from = this._getScaffoldPoint(Constants.TOP_RIGHT)
                to = this._getScaffoldPoint(Constants.BOTTOM_RIGHT)

                return new Phaser.Curves.Line(
                    new Phaser.Math.Vector2(from.x, from.y),
                    new Phaser.Math.Vector2(to.x, to.y)
                );
            case Constants.BOTTOM_BEND:
                from = this._getScaffoldPoint(Constants.BOTTOM_MIDDLE)

                return new Phaser.Curves.Ellipse(
                    from.x,
                    from.y,
                    this._getScaffoldRadius(),
                    this._getScaffoldRadius(),
                    0,
                    180,
                    false
                );
            case Constants.LEFT_BAR:
                from = this._getScaffoldPoint(Constants.BOTTOM_LEFT)
                to = this._getScaffoldPoint(Constants.TOP_LEFT)

                return new Phaser.Curves.Line(
                    new Phaser.Math.Vector2(from.x, from.y),
                    new Phaser.Math.Vector2(to.x, to.y)
                );
        }
    }

    /**
     * @returns {Phaser.Curves.Curve}
     */
    getRailCurve() {
        return this._railCurve
    }
}
