export const EventBus = new class {
    constructor() {
        this.listeners = {};
    }
    $emit(key, value) {
        if(this.listeners[key]) {
            this.listeners[key].forEach((listener) => {
                listener(value);
            });
        }
    }
    $on(key, listener) {
        if (!this.listeners[key]) {
            this.listeners[key] = new Set();
        }
        this.listeners[key].add(listener);
    }
    $off(key, listener) {
        if (this.listeners[key]) {
            this.listeners[key].delete(listener);
        }
    }
};