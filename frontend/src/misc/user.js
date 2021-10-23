import { getUserInfo } from "../remotes/remotes"
export const User = new class {
    constructor() {
        this._user = {
            user_id: 1,
            data: {}
        }
    }
    async initUser(userId) {
        this._user = await getUserInfo(userId);
    }

    get id() {
        return this._user.user_id;
    }
    get data() {
        return this._user.data;
    }
}

export const USER_ID = 1;