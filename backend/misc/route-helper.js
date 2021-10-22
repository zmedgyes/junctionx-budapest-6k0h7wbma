const { checkRole } = require("./auth-util");

module.exports = class RouteHelper {
    static get $inject() { return ['app', 'injector']; }
    constructor(app, injector) {
        this.app = app;
        this.injector = injector;
    }

    addRoute(method, route, controllerName, action, requiredRole) {
        const controller = this.injector.get(controllerName);
        if(typeof controller[action] !== 'function') {
            throw new Error(`${action} is not a member of ${controllerName}`);
        }
        const methodName = method.toLowerCase();
        if (typeof this.app[methodName] !== 'function') {
            throw new Error(`${methodName} is not a member of the express app`);
        }


        const routeHandler = (requiredRole) ? async (req, res, next) => {
            if (!checkRole(req.session, requiredRole)){
                res.status(403).send('Unauthorized');
                return;
            }
            await controller[action](req, res, next);
        } : controller[action].bind(controller);
        
        this.app[methodName](route, async (req, res, next) => {
            try {
                await routeHandler(req, res, next);
            } catch (err) {
                next(err);
            }
        });
    }

    addAPIRoute(method, route, controllerName, action, requiredRole) {
        this.addRoute(method, `/api${route}`, controllerName, action, requiredRole);
    }
}