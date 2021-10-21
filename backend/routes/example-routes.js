module.exports = (injector) => {
    const routeHelper = injector.get('routeHelper');

    routeHelper.addAPIRoute('get', '/example', 'exampleController', 'getExample');
};