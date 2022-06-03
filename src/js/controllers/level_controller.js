import Level1 from "../levels/level1";
import Level2 from "../levels/level2";

/**
 * Load the levels and save the progress the user has made against each level in local storage
 */
export default class LevelController {
    _progress

    constructor() {
        this._loadUserProgress()
    }

    /**
     * When you complete a level you are awarded stars and your progress
     * is saved to local storage
     * @param {number} levelId
     * @param {number} starsEarned
     */
    saveStars(levelId = 1, starsEarned = 1) {
        let currentStars = this._getStars(levelId)
        if (starsEarned > currentStars) {
            currentStars = starsEarned
        }
        this._progress[levelId] = currentStars
        this._saveUserProgress(this._progress)
    }

    getLevelData() {
        return {
            1: {
                name: 'Four Corners',
                description: 'Move a red coin in to each of the 4 corners',
                stars: this._getStars(1),
                locked: false
            },
            2: {
                name: 'Red Top',
                description: 'Create a row of red coins along the top bar',
                stars: this._getStars(2),
                locked: this._isLevelLocked(2)
            }
        }
    }

    /**
     * {number} levelNumber
     * @returns {Level}
     */
    getLevel(levelNumber = 1) {
        switch (levelNumber) {
            case 1: return new Level1()
            case 2: return new Level2()
        }
    }

    /**
     * Level unlocks when the previous level has been completed
     * (at least 1 star)
     * @param levelId
     * @private
     */
    _isLevelLocked(levelId = 1) {
        if (levelId <= 1) {
            return false
        }
        return (this._getStars(levelId - 1) <= 0)
    }

    /**
     * @param {number} levelId
     * @returns {number}
     */
    _getStars(levelId = 1) {
        let stars = this._progress[levelId]
        if (stars == null) {
            stars = 0
        }
        return stars
    }

    /**
     * Load progress but if it's not set then set it
     * to an empty object and save it
     */
    _loadUserProgress() {
        this._progress = JSON.parse(localStorage.getItem('progress'))
        if (this._progress == null) {
            this._progress = {}
            this._saveUserProgress(this._progress)
        }
    }

    /**
     * @param progress
     */
    _saveUserProgress(progress = '') {
        this._progress = progress
        localStorage.setItem('progress', JSON.stringify(progress))
    }
}
