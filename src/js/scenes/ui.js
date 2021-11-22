import Phaser from 'phaser'
import eventsCenter from "../controllers/events_center";
import Button from '../ui/button'
import * as Constants from "../constants";

export default class UI extends Phaser.Scene {

    constructor() {
        super('UI');
    }

    preload() {
    }

    create() {
        this._eventsCenter = eventsCenter
        const quitButton = new Button(
            100,
            100,
            'Quit',
            this,
            () => {
                this.cameras.main.fadeOut(
                    1000,
                    Constants.GREEN.r,
                    Constants.GREEN.g,
                    Constants.GREEN.b
                )
            })

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            eventsCenter.emit('quit-game')
        })
    }
}
