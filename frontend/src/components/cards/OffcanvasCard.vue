<template>
<div class="card" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">
    <div :class="{redbody : isStyleRed}" class="card-body">
        <div :class="{redbody : isStyleRed}" class="card-title"><b>{{mainText}}</b></div>
        <div :class="{redbody : isStyleRed}" class="card-text">{{subText}}</div>
        <img class="card-img" :src="iconUrl" alt="">
    </div>
</div>
<!-- <input :class="{myClass : success}" type="text"> -->
</template>

<script>
export default {
  props: {
    mainText:String,
    subText:String,
    icon:String,
    initStyle:String
  },
  data() {
    return {
        iconUrl:"",
        isStyleRed:false
    }
  },
  mounted(){
      switch (this.icon) {
          case "daily":
              this.iconUrl = "./img/icon_daily_circle.svg"
              break;
          case "scan":
              this.iconUrl = "./img/icon_qr_circle.svg"
              break;
          case "home":
              this.iconUrl = "./img/icon_home_circle.svg"
              break;
          default:
              this.iconUrl = "./img/icon_daily_circle.svg"
              break;
      }
      switch (this.initStyle) {
          case "red":
              this.isStyleRed = true
              break;
          default:
              this.isStyleRed = false
              break;
      }
  }
}
</script>

<style>
    .redbody{
        background-color: red !important;
        color:white !important
    }
    .card-text{
        font-size:11px;
    }
    .card-title{
        color:black;
    }
    .card-body{
        border:1px solid red;
        border-radius: 20px;
        line-height: 1em;
        height: 17vh;
        padding: 0.5rem 0.5rem !important;
    }
    .card-img{
    height: 50px;
    position: absolute;
    top: 100px;
    left: 0px;
    }
    .card{
        border:none
    }
</style>