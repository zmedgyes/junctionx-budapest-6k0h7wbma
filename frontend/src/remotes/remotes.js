async function postData(url = '', data = {}) {
    // Default options are marked with *
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000/'
    const response = await fetch(`${baseUrl}api${url}`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

export async function listChallenges(userId) {
    return postData('/user/challenge/list', { user_id: userId });
}

export async function createTreasueChallenges(userId, lat, lng) {
    return postData('/user/challenge/create', { user_id: userId, type: 'TREASURE', config: { lat, lng } });
}

export async function verifyTreasure(userId, lat, lng, qr) {
    return postData('/user/challenge/verify', { user_id: userId, type: 'TREASURE', params: { lat, lng, qr } });
}

export async function verifyQR(userId, qr) {
    return postData('/user/challenge/verify', { user_id: userId, type: 'QR', params: {  qr } });
}

export async function getStreak(userId) {
    return postData('/user/challenge/getStreak', { user_id: userId });
}

export async function getUserInfo(userId) {
    return postData('/user/getUserInfo', { user_id: userId });
}

export async function getPoints(userId) {
    return postData('/user/getPoints', { user_id: userId });
}

export async function listShopItems() {
    return postData('/shop/listItems');
}

export async function buyShopItem(userId, itemId) {
    return postData('/shop/buyItem', { user_id: userId, item_id: itemId});
}

export async function poll(userId, lat, lng) {
    return postData('/poll', { user_id: userId, lat, lng });
}