import Level from './level.js';
import RedTop from '../puzzles/redTop';
import * as Constants from "../constants";

export default class Level2 extends Level {

    _createPuzzle() {
        this._puzzle = new RedTop()
    }

    _getCoinData() {
        return [
            {
                rail_id: Constants.RAIL_A,
                indexes: [0, 1, 2, 3],
                colour: Constants.TEAL.hex
            },
            {
                rail_id: Constants.RAIL_B,
                indexes: [0, 5],
                colour: Constants.TEAL.hex
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
