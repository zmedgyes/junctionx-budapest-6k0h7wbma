module.exports = (injector) => {
    return (error, req, res, next) => {
        console.error(error);
        res.status(500).send('fucked');
    }
};