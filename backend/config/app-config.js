module.exports = {
    initApp: (injector) => {
        const app = injector.get('app');
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`);
        });
    }
};