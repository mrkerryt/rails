import Phaser from 'phaser'
import * as Constants from '../constants'
import Button from '../ui/button'
import LevelController from "../controllers/level_controller";

export default class Title extends Phaser.Scene {
    _levelsController

    constructor() {
        super('Title');
        this._levelsController = new LevelController()
    }

    preload() {
    }


    create() {
        this.cameras.main.setBackgroundColor(Constants.GREEN.hex)
        this.cameras.main.fadeIn(
            1000,
            Constants.GREEN.r,
            Constants.GREEN.g,
            Constants.GREEN.b
        )

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        const startButton = new Button(
            screenCenterX,
            screenCenterY,
            'Start Game',
            this,
            () => {
                console.log('clicked')
                this.cameras.main.fadeOut(
                    1000,
                    Constants.GREEN.r,
                    Constants.GREEN.g,
                    Constants.GREEN.b
                )
            })

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            console.log('yo')
            this.scene.start('Game', {level: 1})
        })
    }
}
