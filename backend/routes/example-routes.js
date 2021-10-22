const { USER_ROLES } = require("../misc/auth-util");

module.exports = (injector) => {
    const routeHelper = injector.get('routeHelper');

    routeHelper.addAPIRoute('get', '/public/example', 'exampleController', 'getExamples');
    routeHelper.addAPIRoute('get', '/user/example', 'exampleController', 'getExamples', USER_ROLES.USER);
    routeHelper.addAPIRoute('get', '/admin/example', 'exampleController', 'getExamples', USER_ROLES.ADMIN);
};