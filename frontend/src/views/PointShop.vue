<template>
    <div class="pointshop">
        <ShopNav />
        <div>
            <PointsBalanceCard :key="childKey" />
            <Tabs>
                <Tab name="Minutes">
                    <OfferCard @reloadNeeded="onReloadNeeded" v-for="item in minuteItems" :key="item.id" :offerId="item.id" :offer="item.offer" :offerType="item.type" :cost="item.price" :amount="item.amount" imgSrc="/img/call.svg" />
                </Tab>
                <Tab name="Data">
                    <OfferCard @reloadNeeded="onReloadNeeded" v-for="item in dataItems" :key="item.id" :offerId="item.id" :offer="item.offer" :offerType="item.type" :cost="item.price" :amount="item.amount" imgSrc="/img/arrow.svg" />
                </Tab>
                <Tab name="SMS">
                    <div class="nooffers">No offers of this kind.</div>
                </Tab>
                <Tab name="MMS">
                    <div class="nooffers">No offers of this kind.</div>
                </Tab>
                <Tab name="Roaming">
                    <div class="nooffers">No offers of this kind.</div>
                </Tab>
                <Tab name="1 Month Pass">
                    <div class="nooffers">No offers of this kind.</div>
                </Tab>
            </Tabs>
        </div>
    </div>
</template>

<script>
import ShopNav from '../components/ShopNav.vue'
import Card from '../components/Card.vue'
import PointsBalanceCard from '../components/cards/PointsBalanceCard.vue'
import OfferCard from '../components/cards/OfferCard.vue'
import {Tabs, Tab} from 'vue3-tabs-component';
import {listShopItems} from '../remotes/remotes'

export default {
    name: 'PointShop',
    components: { Card, PointsBalanceCard, Tab, Tabs, OfferCard, ShopNav },
    data(){
        return{
            minuteItems: [],
            dataItems: [],
            childKey: 0
        }
    },
    async created() {
        await this.reloadItems();
    },
    methods: {
        onReloadNeeded() {
            this.childKey = this.childKey + 1
        },
        async reloadItems() {
            const shopItems = (await listShopItems())
                .map((item) => {
                    return {
                        id: item.id,
                        price: item.price,
                        ...item.data
                    };
                });
            this.minuteItems = shopItems.filter((item) => item.type === "MINUTE")
            this.dataItems = shopItems.filter((item) => item.type === "DATA")
        }
    }

}
</script>

<style scoped>
.nooffers {
    padding: 30px;
    font-size: 18px;
}
.stitle {
    font-weight: 500;
}

.stitle h2 {
    margin: 0;
}

.sclose {
    position: relative;
}

.sbox {
    height: 50px;
    width: 50px;
}

.sinv {
    visibility: hidden;
}

.sclose::after {
    font-weight: 300;
    content: '\d7';
    position: absolute;
    top: -25px;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 75px; 
    color: var(--brand-black);
    line-height: 100px;
    text-align: center;
}
</style>

<style>
.tabs-component-tabs {
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    background: var(--brand-white);
    overflow-y: scroll;
    padding: 0 5px;
}
.tabs-component-tab {
    display: block;
    padding: 2px 10px;
}
.tabs-component-tab a {
    color: var(--brand-black);
    white-space: nowrap;
}
.tabs-component-tab.is-active {
    border-bottom: 2px solid var(--brand-color);
}
.tabs-component-tab.is-active a {
    font-weight: bold;
}
</style>
