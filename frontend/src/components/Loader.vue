<template>
  <div class="loader-container">
      <div class="loader-img"><img src="img/loader.gif" alt="loader"></div>
  </div>
</template>

<script>
export default {
    name: "Loader"
}
</script>

<style>
    .loader-container{
        position: fixed;
        top:0;
        left:0;
        height: 100vh;
        width: 100vw;
        background-color: rgba(111,111,111,.5);
        z-index: 20000;
    }
    .loader-img{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 225px;
    }
    .loader-img img{
        height: 225px;
    }
</style>