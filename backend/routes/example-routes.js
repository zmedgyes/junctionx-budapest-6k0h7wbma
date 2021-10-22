const { USER_ROLES } = require("../misc/auth-util");

module.exports = (injector) => {
    const routeHelper = injector.get('routeHelper');

    routeHelper.addAPIRoute('get', '/public/example', 'exampleController', 'getExample');
    routeHelper.addAPIRoute('get', '/user/example', 'exampleController', 'getExample', USER_ROLES.USER);
    routeHelper.addAPIRoute('get', '/admin/example', 'exampleController', 'getExample', USER_ROLES.ADMIN);
};