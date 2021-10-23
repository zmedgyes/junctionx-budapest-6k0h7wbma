<template>

  <div class="userMessageContainer">
  <audio v-if="this.userMessageInfo.icon =='success'" id="myAudio">
    <!-- <source src="horse.ogg" type="audio/ogg"> -->
    <source src="audio/Yii.mp3" type="audio/mpeg">
  </audio>
    <img v-if="this.userMessageInfo.icon =='success'" class="confetti" src="img/smaller.gif" alt="">
    <div class="containerItems">
      <div class="statusIconContainer">
        <img class="statusIcon" :src="icon" alt="">
      </div>
      <div class="mainMessage messageText">{{mainMessage}}</div>
      <div class="subMessage messageText">{{subMessage}}</div>
      <div class="buttonContainer">
        <button @click="emitClose" type="button" class="btn btn-light btn-lg closeButton">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    userMessageInfo: Object
  },
  emits: ["closeUserMessage"],
    data() {
      return {
        mainMessage:this.userMessageInfo.mainMessage,
        subMessage:this.userMessageInfo.subMessage,
        icon:null,
        imgStaticPath:"img/icons"
      }
  },
  methods:{
    emitClose(){
      this.$emit('closeUserMessage')
    }
  },
  mounted(){
    switch (this.userMessageInfo.icon) {
      case "success":
        this.icon = `${this.imgStaticPath}/icon_success_white.svg`;
        var x = document.getElementById("myAudio");
        x.play(); 
        break;
      case "error":
        this.icon = `${this.imgStaticPath}/icon_error_white.svg`;
        break;
      default:
        this.icon = `${this.imgStaticPath}/icon_success_white.svg`;
        break;
    }
  }
}
</script>

<style>
  .userMessageContainer{
      z-index: 420;
      height: 100vh;
      width: 100vw;
      position:"fixed";
      background: rgb(153,0,0);
      background: linear-gradient(45deg, rgba(153,0,0,1) 0%, rgba(230,0,0,1) 100%);
  }
  .containerItems{
    padding-top: 85px;
  }
  .statusIconContainer img {
      margin-left: auto;
      margin-right: auto;
      display: block;
      width: 100px;
      height: 100px;
      padding-top:40px
  }
  .messageText{
    color:white;
    text-align: center;
  }
  .mainMessage{
    margin-top: 20px;
    font-size:24px;
    padding: 5px 60px;
    font-weight: bold;
  }
  .subMessage{
    font-size: 18px;
    margin-top: 10px;
    padding: 5px 40px
  }
  .buttonContainer{
    position: fixed;
    width: 100vw;
    /* height: 200px; */
    margin: 5% auto; /* Will not center vertically and won't work in IE6/7. */
    left: 0;
    right: 0;
    z-index:8000
  }
  .closeButton{
    width:60vw;
    margin:100px auto;
    display:block;
    
  }
  .confetti{
    position: fixed;
    bottom: 0;
    left:0;
    height: 100vh;
    width:100vw;
    z-index:7000
  }

</style>