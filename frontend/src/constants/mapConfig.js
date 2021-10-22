const mapStyles = require("./mapStyles")

const mapConfig = {
    zoom: 14,
    center: { lat: 47.4848873, lng: 19.076491 },
    styles: mapStyles.vodafoneStyleV1,
    disableDefaultUI: true,
}

module.exports = mapConfig;