import { poll } from "../remotes/remotes"
import { EventBus } from "./event-bus";
import { getCurrentPosition } from "./geolocation"
export const PollingService = new class {
    constructor() {
        this.intervalRef = null;
    }
    startPolling(intervalMs, userId) {
       this.stopPolling();
       this.userId = userId;
       this.intervalRef = setInterval(this.pollHandler.bind(this), intervalMs);
       this.hasRush = false;
    }
    stopPolling() {
        if(this.intervalRef) {
            clearTimeout(this.intervalRef);
        }
    }
    async pollHandler() {
        const { lat, lng } = await getCurrentPosition();
        const pollResult = await poll(this.userId, lat, lng);
        if(pollResult.rushPoints > 0) {
            EventBus.$emit('rushCompleted', pollResult.rushPoints);
        }
        if(pollResult.randomPoints > 0) {
            EventBus.$emit('randomWin', pollResult.randomPoints);
        }
        if(pollResult.hasRush !== this.hasRush) {
            EventBus.$emit('rushStatusChanged', pollResult.hasRush);
            this.hasRush = pollResult.hasRush;
        }
    }
}