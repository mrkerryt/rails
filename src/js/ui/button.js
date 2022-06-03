import * as Constants from '../constants'

/**
 *
 */
export default class Button {

    constructor(x, y, label, scene, callback) {
        let fontSize = (window.screen.availHeight * 0.075)
        let paddingSize = fontSize / 3

        const button = scene.add.text(x, y, label)
            .setOrigin(0.5)
            .setPadding(paddingSize)
            .setStyle({
                font: "bold " + fontSize + "px Arial",
                backgroundColor: Constants.TEAL.hex, // Button background Color
                fill: Constants.WHITE.hex // Text Color
            })
            .setInteractive({
                useHandCursor: true
            })
            .on('pointerover', () => {
                button.setStyle({ fill: Constants.ORANGE.hex })
            })
            .on('pointerdown', () => {
                button.setStyle({ fill: Constants.WHITE.hex })
                callback()
            })
            .on('pointerup', () => {
                button.setStyle({ fill: Constants.ORANGE.hex })
            })
            .on('pointerout', () => {
                button.setStyle({fill: Constants.WHITE.hex})
            });
    }
}
