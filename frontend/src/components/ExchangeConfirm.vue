<template>
  <div class="exchange-wrap">
  <UserMessagee @closeUserMessage="emitClose" :style="{position: 'fixed', top: 0}" v-if="showMessage" :userMessageInfo="{mainMessage: 'Activation successful!', subMessage: 'Enjoy the activated service.', icon: 'success'}" />
  <div :style="overlaystyle" class="ecoverlay">
    <ShopNav @close="emitClose" exitTo="PointShop" />
    <div class="textcontent">
      <p class="offer">{{offer}}</p>
      <p class="cost">{{cost}} points</p>
      <br />
    </div>
    <div class="costtable">
      <hr />
      <div class="costinner">
        <p>Amount</p>
        <p>{{amount}}</p>
      </div>
      <hr />
      <div class="costinner">
        <p>Available for</p>
        <p>12 months from activation</p>
      </div>
      <hr />
    </div>
    <button type="button" @click="activateClick" class="btn btn-danger confirm-btn">Activate</button>
  </div>
  </div>
</template>

<script>
import ShopNav from './ShopNav.vue'
import UserMessagee from './UserMessagee.vue'

export default {
  components: {ShopNav, UserMessagee},
  methods: {
    emitClose() {
      this.$emit('close')
    },
    activateClick() {
      this.showMessage = true
    }
  },
  data() { return {
    showMessage: false
  }},
  computed: {
    overlaystyle() {
      return this.showMessage ? {visibility: 'hidden'} : {}
    }
  },
  props: {
    offer: {
      type: String
    },
    cost: {
      type: String
    },
    amount: {
      type: String
    },
    isData: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.ecoverlay {
  top: 0;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: calc(100vh - 50px);
  width: 100vw;
  z-index: 10000;
  background: var(--brand-paper);
}
.textcontent {
  padding: 20px 20px 0 20px;
}
.offer {
  font-weight: bold;
  font-size: 25px;
}
.cost {
  font-weight: bold;
  font-size: 22px;
}
.costtable {
  overflow-y: hidden;
}
.costtable hr {
  margin: 5px 0;
}
.costinner {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
}
.costinner p {
  margin: 0;
}
.confirm-btn {
  background: var(--brand-color);
  width: calc(100% - 60px);
  margin: auto 30px 15px 30px;
}
.exchange-wrap {
  position: relative;
}
</style>
