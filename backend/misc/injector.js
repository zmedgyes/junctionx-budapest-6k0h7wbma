const INJECT_TYPES = {
    CONSTANT:'CONSTANT',
    CLASS: 'CLASS'
};

module.exports =  class Injector {
    constructor(configs = {}) {
        this.configs = configs;
        this.addConstant('injector', this);
    }

    addConstant(name, value) {
        this.configs[name] = { type: INJECT_TYPES.CONSTANT, value };
    }

    addClass(name, value, dependencies = []) {
        this.configs[name] = { type: INJECT_TYPES.CLASS, value, dependencies };
    }

    get(name) {
        const config = this.configs[name];
        if(!config) {
            throw new Error(`Missing inject: ${name}`);
        }

        switch (config.type) {
            case INJECT_TYPES.CONSTANT: {
                return config.value;
            }
            case INJECT_TYPES.CLASS: {
                const args = config.dependencies.map(dependency => this.get(dependency));
                return new config.value(...args);
            }
        }
    }
};