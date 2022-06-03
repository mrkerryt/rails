import Phaser from 'phaser'
import * as Constants from '../constants'
import eventsCenter from "../controllers/events_center";
import LevelController from "../controllers/level_controller";
import CircleRenderer from "../ui/circle_renderer";

export default class Game extends Phaser.Scene {
    _level
    _levelNumber
    _board
    _puzzle
    _railA
    _railB
    _state
    _cursors
    _text
    _coinSize
    _eventsCenter
    _levelsController
    _circleRenderer

    constructor() {
        super('Game');
    }

    preload() {
    }

    create(data) {
        this.cameras.main.setBackgroundColor(Constants.GREEN.hex)
        this._eventsCenter = eventsCenter
        this._levelsController = new LevelController()
        this._circleRenderer = new CircleRenderer(this)

        this.scene.run('UI')
        this.cameras.main.fadeIn(
            1000,
            Constants.GREEN.r,
            Constants.GREEN.g,
            Constants.GREEN.b
        )

        this._eventsCenter.on('quit-game', this.quitGame, this)

        this._cursors = this.input.keyboard.createCursorKeys();
        this._coinSize = (window.screen.availHeight * 0.02)
        this._railSize = 2.5 * this._coinSize
        this._initLevel(data.level)
        this.drawRailBackgroundShadow(this._railA)
        this.drawRailBackgroundShadow(this._railB)
        this.drawRailBackground(this._railA)
        this.drawRailBackground(this._railB)
    }

    quitGame(){
        this.scene.start('Title', {
            level: this._levelNumber
        })
    }

    /**
     * Set-up the level, called by create and when starting a new level
     * @param {number} levelNumber
     * @private
     */
    _initLevel(levelNumber = 1) {
        this._levelNumber = levelNumber
        this._level = this._levelsController.getLevel(this._levelNumber)
        this._board = this._level.getBoard()
        this._puzzle = this._level.getPuzzle()
        this._railA = this._board.getRail(Constants.RAIL_A)
        this._railB = this._board.getRail(Constants.RAIL_B)
        this.introduction()
    }

    update(time, delta) {
        super.update(time, delta);

        if (this._state === Constants.INTRODUCTION) {
            // this.introduction()
        } else if (this._state === Constants.PAUSED) {
            // Do nothing
        } else if (this._state === Constants.SHUFFLING) {
            this.shuffling()
        } else if (this._state === Constants.PLAYING) {
            this.playing()
        } else if (this._state === Constants.SOLVED) {
            this.solved()
        }

        // Redraw Screen
        this.drawBoard()
    }

    playing() {
        if (this._cursors.right.isDown) {
            this._board.rotateRail(Constants.RAIL_A, Constants.CLOCKWISE, Constants.ROTATION_SPEED)

        } else if (this._cursors.left.isDown) {
            this._board.rotateRail(Constants.RAIL_A, Constants.ANTI_CLOCKWISE, Constants.ROTATION_SPEED)

        } else {
            this._board.rollback(Constants.RAIL_A, Constants.ROTATION_SPEED)
        }

        if (this._cursors.up.isDown) {
            this._board.rotateRail(Constants.RAIL_B, Constants.CLOCKWISE, Constants.ROTATION_SPEED)

        } else if (this._cursors.down.isDown) {
            this._board.rotateRail(Constants.RAIL_B, Constants.ANTI_CLOCKWISE, Constants.ROTATION_SPEED)

        } else {
            this._board.rollback(Constants.RAIL_B, Constants.ROTATION_SPEED)
        }

        if (this._puzzle.isActionable(this._board)) {
            this._puzzle.doAction(this._board, this)
        }

        if (this._puzzle.isSolved(this._board)) {
            this._state = Constants.SOLVED
        }
    }

    /**
     * Outline level objective and then move to shuffle state
     */
    introduction() {
        this._state = Constants.INTRODUCTION
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this._state = Constants.SHUFFLING
            },
            callbackScope: this,
            loop: false
        });
    }

    /**
     * Play some congrats animation and go to next level
     */
    solved() {
        if (this._levelNumber === Object.keys(this._levelsController.getLevelData()).length - 1) {
            this.cameras.main.fadeOut(
                1000,
                Constants.GREEN.r,
                Constants.GREEN.g,
                Constants.GREEN.b,
                () => {
                    // Completed last level
                    console.log('completed')
                    this.scene.start('Title', {level: 1})
                }
            )
        } else {
            // Next Level
            console.log('level complete')
            this._levelNumber++
            this._initLevel(this._levelNumber)
        }
    }

    /**
     * Shuffle the board before we let the player start
     */
    shuffling() {
        let sequence = this._board.getSequence()
        let command = sequence.getCurrentCommand()
        let speed = Constants.ROTATION_SPEED * 2

        if (command === false) {
            this._state = Constants.PLAYING
        } else {
            if (command.getRailId() === Constants.RAIL_A) {
                this._board.rotateRail(Constants.RAIL_A, command.getDirection(), speed, true)
            } else {
                this._board.rotateRail(Constants.RAIL_B, command.getDirection(), speed, true)
            }
        }
    }

    drawBoard() {
        let rotationData
        rotationData = this._board.getRotationData(Constants.RAIL_A)
        this.drawRail(
            this._railA,
            rotationData.state,
            rotationData.direction,
            rotationData.percentage
        )

        rotationData = this._board.getRotationData(Constants.RAIL_B)
        this.drawRail(
            this._railB,
            rotationData.state,
            rotationData.direction,
            rotationData.percentage
        )
    }

    /**
     * @param {Rail} rail
     * @param {string} colour
     */
    drawRailBackground(rail, colour = Constants.COTTON.hex) {
        let r = this.add.curve(
            window.screen.availWidth / 2,
            window.screen.availHeight / 2,
            rail.getCurve()
        )
        r.setStrokeStyle(this._railSize, Constants.convert(colour));
    }

    /**
     * @param {Rail} rail
     * @param {string} colour
     */
    drawRailBackgroundShadow(rail, colour = Constants.COTTON.hex) {
        let b = this.add.curve(
            (window.screen.availWidth / 2) + 5,
            (window.screen.availHeight / 2) + 5,
            rail.getCurve()
        )
        b.setStrokeStyle(this._railSize + 5, Constants.convert(Constants.TEAL.hex));
    }

    /**
     * @param {Rail} rail
     * @param {number} state
     * @param {number} direction
     * @param {number} percentage
     */
    drawRail(
        rail,
        state = Constants.REST,
        direction = Constants.CLOCKWISE,
        percentage= 0
    ) {
        if (direction == null) {
            state = Constants.REST
            direction = Constants.CLOCKWISE
            percentage = 0
        }

        let coins = rail.getCoins()
        for (let i = 0; i < coins.length; i++) {
            this.drawCoin(rail.getRailId(), coins[i], state, direction, percentage)
        }
    }

    /**
     * @param {number} railId
     * @param coin
     * @param {number} state
     * @param direction
     * @param percentage
     */
    drawCoin(
        railId,
        coin,
        state = Constants.REST,
        direction = Constants.CLOCKWISE,
        percentage= 0
    ) {
        let x = coin.getX(state, direction, percentage)
        let y = coin.getY(state, direction, percentage)
        let colour = Constants.convert(coin.getColour())
        let visibility = coin.getVisibility()

        let circle = this._circleRenderer
            .findOrCreateCircle(railId, coin.getNumber(), x, y, this._coinSize, colour)

        this._circleRenderer
            .updateCircle(circle, x, y, this._coinSize, colour, visibility)
    }

    /**
     * @param {Coin[]} coins
     * @param {number[]} snapshot
     */
    explode(
        coins = [],
        snapshot = []
    ) {
        // pause game
        this.setState(Constants.PAUSED)

        // create animated coins
        let circles = []
        let tweens = []
        let currentCoin
        for (let i = 0; i < coins.length; i++) {
            currentCoin = coins[i]
            circles[i] = this.add.circle(
                currentCoin.getX(),
                currentCoin.getY(),
                this._coinSize,
                Constants.convert(snapshot[currentCoin.getNumber() - 1])
            )

            tweens[i] = this.tweens.add({
                targets: circles[i],
                radius: 50,
                alpha: 0,
                ease: 'Elastic.Out',
                colour: Constants.convert(snapshot[i]),
                duration: 500,
                onComplete: () => {
                    circles[i].destroy()
                    this.setState(Constants.PLAYING)
                },
            })
        }
    }

    /**
     * @param {number} state
     */
    setState(state = Constants.PLAYING) {
        this._state = state
    }
}
