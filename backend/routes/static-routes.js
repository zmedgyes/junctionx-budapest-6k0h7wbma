const path = require('path');
const express = require('express');

module.exports = (injector) => {
    const app = injector.get('app');
    const frontendPath = path.resolve(`${__dirname}/../../frontend/dist`);

    app.use(express.static(frontendPath));
    app.route('/*').get((req, res) => { res.sendFile(path.join(frontendPath, 'index.html')); });
} 