import Phaser from 'phaser'

import Boot from './scenes/boot'
import Loading from './scenes/loading'
import Title from './scenes/title'
import Game from './scenes/game'
import GameOver from './scenes/gameover'
import UI from './scenes/ui'

let configuration = {
    'canvas_width_max' : 2048,
    'canvas_width' : 1000,
    'canvas_height_max' : 2048,
    'canvas_height' : 650,
    'scale_ratio' : 1,
    'aspect_ratio' : 1,
};

configuration.canvas_width = window.screen.availWidth * window.devicePixelRatio;
configuration.canvas_height = window.screen.availHeight * window.devicePixelRatio;
configuration.aspect_ratio = configuration.canvas_width / configuration.canvas_height;

if (configuration.aspect_ratio < 1) {
    configuration.scale_ratio = configuration.canvas_height / configuration.canvas_height_max;
} else {
    configuration.scale_ratio = configuration.canvas_width / configuration.canvas_width_max;
}

let config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [
        Boot,
        Loading,
        Title,
        Game,
        GameOver,
        UI
    ],
    fps: {
        target: 30,
        forceSetTimeOut: true
    },
}

let game = new Phaser.Game(config);
