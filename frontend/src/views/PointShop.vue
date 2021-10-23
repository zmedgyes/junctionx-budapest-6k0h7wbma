<template>
    <div class="pointshop">
        <ShopNav />
        <div>
            <PointsBalanceCard />
            <Tabs>
                <Tab name="Minutes">
                    <OfferCard offer="60 minutes, single use" cost="190" amount="60 minutes" imgSrc="/img/call.svg" />
                    <OfferCard offer="45 minutes, single use" cost="165" amount="45 minutes" imgSrc="/img/call.svg" />
                    <OfferCard offer="30 minutes, single use" cost="125" amount="30 minutes" imgSrc="/img/call.svg" />
                    <OfferCard offer="10 minutes, single use" cost="50" amount="10 minutes" imgSrc="/img/call.svg" />
                </Tab>
                <Tab name="Data">
                    <OfferCard offer="5 GB data, roaming capable" cost="3590" amount="5 GB" imgSrc="/img/arrow.svg" />
                    <OfferCard offer="500 MB data, roaming capable" cost="990" amount="500 MB" imgSrc="/img/arrow.svg" />
                    <OfferCard offer="100 MB data" cost="210" amount="100 MB" imgSrc="/img/arrow.svg" />
                    <OfferCard offer="30 MB data" cost="85" amount="30 MB" imgSrc="/img/arrow.svg" />
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

export default {
    name: 'PointShop',
    components: { Card, PointsBalanceCard, Tab, Tabs, OfferCard, ShopNav },
    data(){
        return{
        }
    },
    methods: {
        
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
