const INJECT_TYPES = {
    CONSTANT:'CONSTANT',
    CLASS: 'CLASS'
};

module.exports =  class Injector {
    constructor(configs = {}) {
        this.configs = configs;
        this.addConstant('injector', this);
        this._cache = {};
    }

    addConstant(name, value) {
        this.configs[name] = { type: INJECT_TYPES.CONSTANT, value };
    }

    addClass(name, value) {
        this.configs[name] = { type: INJECT_TYPES.CLASS, value };
    }

    get(name) {
        if (this._cache[name]) {
            return this._cache[name];
        }
        const item = this._create(name);
        this._cache[name] = item;
        return item;
    }

    _create(name) {
        const config = this.configs[name];
        if (!config) {
            throw new Error(`Missing inject: ${name}`);
        }

        switch (config.type) {
            case INJECT_TYPES.CONSTANT: {
                return config.value;
            }
            case INJECT_TYPES.CLASS: {
                const injects = config.value.$inject || [];
                const args = injects.map(injectName => this.get(injectName));
                return new config.value(...args);
            }
        }
    }
};