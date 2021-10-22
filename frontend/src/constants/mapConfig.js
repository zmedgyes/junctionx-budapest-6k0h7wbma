const mapStyles = require("./mapStyles")

const mapConfig = {
    zoom: 4,
    center: { lat: -25.344, lng: 131.036 },
    styles: mapStyles.defaultTestStyle,
    disableDefaultUI: true,
}

module.exports = mapConfig;