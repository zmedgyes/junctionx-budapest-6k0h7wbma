module.exports = class ShopController {
    static get $inject() { return ['shopService', 'userService']; }

    constructor(shopService, userService) {
        this.shopService = shopService;
        this.userService = userService;
    }

    async listItems(req, res, next) {
        const items = await this.shopService.listItems();
        res.json(items);
    }

    async addItem(req, res, next) {
        const { price, data } = req.body;
        await this.shopService.addItem(price, data);
        res.json({ success: true });
    }

    async deleteItem(req, res, next) {
        const { id } = req.body;
        await this.shopService.deleteItem(id);
        res.json({ success: true });
    }

    async buyItem(req, res, next) {
        const { user_id, item_id } = req.body;
        const item = await this.shopService.getItemById(item_id);
        const userPoints = await this.userService.getPointsByUserId(user_id);
        const hasEnoughPoints = userPoints >= item.price;
        if(hasEnoughPoints) {
            await this.userService.addPointsByUserId(user_id, 0 - item.price);
        }

        res.json({ success: hasEnoughPoints });
    }
}