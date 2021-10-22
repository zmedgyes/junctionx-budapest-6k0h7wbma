function _parseJSONFields(item) {
    if (!item) {
        return;
    }
    if (item.data) {
        item.data = JSON.parse(item.data);
    }
    return item;
}

module.exports = class ShopService {
    static get $inject() { return ['db']; };
    constructor(db) {
        this.db = db;
    }

    async addItem(price, data) {
        await this.db.query('INSERT INTO shop_item (price, data) VALUES (?,?)', [price, JSON.stringify(data)]);
    }

    async listItems() {
        const items = await this.db.query('SELECT * FROM shop_item');
        return items.map(_parseJSONFields);
    }

    async getItemById(id) {
        const items = await this.db.query('SELECT * FROM shop_item WHERE id = ?', [id]);
        return _parseJSONFields(items[0]);
    }

    async deleteItem(id) {
        await this.db.query('DELETE FROM shop_item WHERE id = ?', [id]);
    }
}