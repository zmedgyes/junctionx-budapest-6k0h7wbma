<template>
    <div class="pointshop">
        <div class="shopnav">
            <div class="sbox sinv"></div>
            <div class="stitle"><h2>Exchange Voda Points</h2></div>
            <!-- <div class="sclose sbox"></div> -->
            <router-link class="sclose sbox" tag="div" :to="{name : 'Home'}" />
        </div>
        <div>
            <PointsBalanceCard />
            <Tabs>
                <Tab name="SMS">
                    SMS
                </Tab>
                <Tab name="Minutes">
                    <OfferCard imgSrc="/img/call.svg" />
                </Tab>
                <Tab name="Data">
                    Data
                </Tab>
                <Tab name="MMS">
                    MMS
                </Tab>
                <Tab name="Roaming">
                    Roaming
                </Tab>
                <Tab name="1 Month Pass">
                    Month Pass
                </Tab>
            </Tabs>
        </div>
    </div>
</template>

<script>
import Card from '../components/Card.vue'
import PointsBalanceCard from '../components/cards/PointsBalanceCard.vue'
import OfferCard from '../components/cards/OfferCard.vue'
import {Tabs, Tab} from 'vue3-tabs-component';

export default {
    name: 'PointShop',
    components: { Card, PointsBalanceCard, Tab, Tabs, OfferCard },
    data(){
        return{
        }
    },
    methods: {
        
    }

}
</script>

<style scoped>
.shopnav {
    height: 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
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
