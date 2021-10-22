const { METER2DEG } = require("./types");

module.exports = {
    getRandomNumber: (range) => {
        return Math.floor(Math.random()*range);
    },

    shuffleArray: (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    },

    isNearby: (posLat, posLng, origLat, origLng, range) => {
        const rangeDeg = range * METER2DEG;
        return (Math.abs(posLat - origLat) < rangeDeg) && (Math.abs(posLng - origLng) < rangeDeg);
    }
}