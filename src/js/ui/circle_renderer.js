import * as Constants from '../constants'

/**
 * Handles the Circle Shapes that are drawn to represent each coin
 */
export default class CircleRenderer {
    /** @var {Phaser.Scene} ctx */
    _ctx
    _railA
    _railB

    /**
     * @param {Phaser.Scene} ctx
     */
    constructor(ctx) {
        this._ctx = ctx
        this._railA = []
        this._railB = []
    }

    /**
     * @param railId
     * @param coinNumber
     * @param x
     * @param y
     * @param coinSize
     * @param colour
     * @returns {*}
     */
    findOrCreateCircle(railId, coinNumber, x, y, coinSize, colour) {
        let rail
        if (railId === Constants.RAIL_A) {
            rail = this._railA
        } else {
            rail = this._railB
        }

        if (rail[coinNumber] == null) {
            rail[coinNumber] = this._ctx.add.circle(
                x,
                y,
                coinSize,
                colour
            ).setInteractive({
                useHandCursor: true
            })
        }
        return rail[coinNumber]
    }

    /**
     * @param circle
     * @param x
     * @param y
     * @param coinSize
     * @param colour
     * @param visibility
     */
    updateCircle(circle, x, y, coinSize, colour, visibility) {
        circle.setX(x)
        circle.setY(y)
        circle.setFillStyle(colour)

        if (visibility === true) {
            circle.setAlpha(1)
        } else {
            circle.setAlpha(0)
        }
    }
}
