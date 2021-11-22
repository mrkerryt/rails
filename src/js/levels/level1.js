import Level from './level.js';
import FourCorners from '../puzzles/fourCorners.js';
import * as Constants from "../constants";

export default class Level1 extends Level {

    _createPuzzle() {
        this._puzzle = new FourCorners()
    }

    _getCoinData() {
        return [
            {
                rail_id: Constants.RAIL_A,
                indexes: [0, 3, 8, 11],
                colour: Constants.TEAL.hex
            },
            {
                rail_id: Constants.RAIL_A,
                indexes: [1, 2, 9, 10],
                colour: Constants.BURNT_UMBER.hex
            },
            {
                rail_id: Constants.RAIL_B,
                indexes: [0, 5, 8, 13],
                colour: Constants.TEAL.hex
            },
            {
                rail_id: Constants.RAIL_B,
                indexes: [6, 7, 14, 15],
                colour: Constants.ORANGE.hex
            }
        ]
    }

    _getShuffleData() {
        return [
            {
                rail_id: Constants.RAIL_A,
                direction: Constants.CLOCKWISE,
                clicks: 7
            },
            {
                rail_id: Constants.RAIL_B,
                direction: Constants.ANTI_CLOCKWISE,
                clicks: 1
            },
            {
                rail_id: Constants.RAIL_A,
                direction: Constants.ANTI_CLOCKWISE,
                clicks: 2
            },
            {
                rail_id: Constants.RAIL_B,
                direction: Constants.ANTI_CLOCKWISE,
                clicks: 3
            },
        ]
    }
}
