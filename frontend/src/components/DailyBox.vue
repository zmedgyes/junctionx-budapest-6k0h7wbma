<template>
  <div>
  <UserMessagee @closeUserMessage="msgClosed" :style="{position: 'fixed', top: 0}" v-if="showMessage" :userMessageInfo="{mainMessage: mainMessage, subMessage: subMessage, icon: icon}" />
  <div :style="showMessage ? {display: 'none'} : {}" @click="cancelSelf" class="dailybox">
    <div class="innerWrap">
      <div v-on:click.stop class="dailyCard">
        <p class="ctitle">Daily Challange</p>
        <p class="cquestion">In which color is the newest iPhone available in the Vodafone webshop?</p>
        <input v-model="answer" type="text" class="form-control">
        <button type="button" @click="submitClick" class="btn btn-light wht-btn">Submit</button>
        <button type="button" @click="goToShop" class="btn btn-light wht-btn">Open Store</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import UserMessagee from './UserMessagee.vue'

export default {
  components: {UserMessagee},
  emits: ["cancel, submit"],
  methods: {
    cancelSelf() {
      this.$emit('cancel')
    },
    msgClosed() {
      this.cancelSelf()
    },
    goToShop() {
      eval("window.location.href = 'https://www.vodafone.hu/shop/okostelefonok'")
    },
    submitClick() {
      if ((this.answer) && (this.answer.toUpperCase().includes("BLUE") || this.answer.toUpperCase().includes("BLACK") )) {
        this.icon = 'success'
        this.mainMessage = 'Correct Answer'
        this.subMessage = "You've earned 10 Voda Points."
      } else {
        this.icon = 'error'
        this.mainMessage = 'Incorrect Answer'
        this.subMessage = "Try again later."
      }
      this.showMessage = true
    }
  },
  data() {return {
    answer: "",
    showMessage: false,
    mainMessage: "",
    subMessage: "",
    icon: ""
  }}
}
</script>

<style scoped>
.dailybox {
  top: 0;
  display: block;
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  /* padding: 30px 15px; */
  z-index: 10000;
}

.innerWrap {
  position: relative;
  padding: 50px;
  background-color: rgba(220,220,220,0.75);
  height: 100vh !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dailyCard {
  background: var(--brand-color);
  color: var(--brand-white);
  padding: 25px 20px;
}

.ctitle {
  font-weight: bold;
  font-size: 30px;
  text-align: center;
}

.cquestion {
  font-size: 25px;
}

.wht-btn {
  color: var(--brand-color);
  background: var(--brand-white);
  width: 100%;
  margin: 5px 0;
  font-size: 20px;
}

input::-webkit-input-placeholder {
  color: var(--brand-color);
}

input {
  font-size: 20px;
  margin-bottom: 5px;
}
</style>