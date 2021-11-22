import Phaser from 'phaser'

export default class Boot extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        // Preload the 'loading' images
    }

    create() {
        this.cameras.main.setBackgroundColor('#DBAB85')


        this.scene.start('Loading')
    }
}
