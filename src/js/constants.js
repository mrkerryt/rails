// Game States
export const INTRODUCTION = 1;
export const SHUFFLING = 2;
export const PLAYING = 3;
export const SOLVED = 4;
export const PAUSED = 5;

// directions
export const CLOCKWISE = 1;
export const ANTI_CLOCKWISE = -1;
export const ROTATION_SPEED = 20

// Rails
export const RAIL_A = 1;
export const RAIL_B = 2;

// Rail States
export const REST = 1;
export const MOVING = 2;
export const ROLLBACK = 3;

// Board Dimensions
export const BOARD_BAR_PARTS = 3; // 6
export const BOARD_BEND_PARTS = 5; // 9

// Paths
export const TOP_BAR = 1;
export const TOP_BEND = 2;
export const RIGHT_BAR = 3;
export const RIGHT_BEND = 4;
export const LEFT_BAR = 5;
export const LEFT_BEND = 6;
export const BOTTOM_BAR = 7;
export const BOTTOM_BEND = 8;

// Scaffold points
export const TOP_LEFT = 1;
export const TOP_MIDDLE = 2;
export const TOP_RIGHT = 3;
export const MIDDLE_LEFT = 4;
export const MIDDLE_RIGHT = 5;
export const BOTTOM_LEFT = 6;
export const BOTTOM_MIDDLE = 7;
export const BOTTOM_RIGHT = 8;

// UI Colours
export const BLACK = {
    hex: '#000000',
    r: 0,
    g: 0,
    b: 0
};

export const WHITE = {
    hex: '#eeeeee',
    r: 238,
    g: 238,
    b: 238
};

export const ORANGE = {
    hex: '#e7c24c',
    r: 255,
    g: 178,
    b: 4
};

export const GREEN = {
    hex: '#a4bea0',
    r: 164,
    g: 190,
    b: 160
};

export const TEAL = {
    hex: '#8bad9d',
    r: 139,
    g: 173,
    b: 157
};

export const COTTON = {
    hex: '#dfd7bb',
    r: 223,
    g: 215,
    b: 187
};

export const TERRACOTTA = {
    hex: '#d89065',
    r: 216,
    g: 144,
    b: 101
};

export const BURNT_UMBER = {
    hex: '#c36c5d',
    r: 195,
    g: 108,
    b: 93
};

export function convert(hex) {
    return Number(`0x${hex.substr(1)}`);
}
