module.exports = class RouteHelper {
    static get $inject() { return ['app', 'injector']; }
    constructor(app, injector) {
        this.app = app;
        this.injector = injector;
    }

    addRoute(method, route, controllerName, action) {
        const controller = this.injector.get(controllerName);
        if(typeof controller[action] !== 'function') {
            throw new Error(`${action} is not a member of ${controllerName}`);
        }
        const methodName = method.toLowerCase();
        if (typeof this.app[methodName] !== 'function') {
            throw new Error(`${methodName} is not a member of the express app`);
        }

        this.app[methodName](route, controller[action].bind(controller));
    }

    addAPIRoute(method, route, controllerName, action) {
        this.addRoute(method, `/api${route}`, controllerName, action);
    }
}