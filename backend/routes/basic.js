module.exports = (injector) => {
    const app = injector.get('app');

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
};