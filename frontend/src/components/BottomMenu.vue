<template>
  <div class="bmenu">
    <div>Subscriptions</div>
    <div class="menumid">
      <div class="outercircle">
        <div class="innercircle"></div>
      </div>
    </div>
    <div>Account</div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.bmenu {
  height: 75px;
  position: fixed;
  background-color: var(--brand-white);
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin-bottom: 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
}

.bmenu > div {
  flex-grow: 1;
  flex-basis: 0;
}

.bmenu > div:last-child {
  text-align: right;
}

.menumid {
  position: relative;
}

#outercircle {
   position: absolute;
   width: 50%;
   height: 50%;
   background-color: #000000;
   border-radius: 50%;
}

#innercircle{
  margin-top: 25%;
  margin-left: 25%;
  position: absolute;
  width: 50%;
  height: 50%;
  background-color: red;
  border-radius: 50%;
}

/* .bmenu::after {
  content: ' ';
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(50vw - 45px);
  right: calc(50vw - 45px);
  background: purple;
} */
</style>
