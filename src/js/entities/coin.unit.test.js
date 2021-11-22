import Coin from './coin.js';
import * as Constants from '../constants'

describe('Coin Object', () => {
    let coin
    beforeAll(() => {
        coin = new Coin(1, 2, 3)
    })

    test('Setting the colour with the Constructor', () => {
        expect(coin.getColour()).toBe(Constants.WHITE.hex);
    })

    test('Updating the colour with setter', () => {
        coin.setColour(Constants.TEAL.hex)
        expect(coin.getColour()).toBe(Constants.TEAL.hex);
    })

    test('Getting the Coordinate', () => {
        expect(coin.getX()).toBe(2);
        expect(coin.getY()).toBe(3);
    })
})
