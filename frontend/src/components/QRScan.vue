<template>
  <div class="qrscan">
    <!-- <p class="qrerror">{{ error }}</p>
    <p class="decode-result">Last result: <b>{{ result }}</b></p> -->
<!-- qrcode-stream-wrapper -->
    <div class="qrwrapwrap">
      <div :class="{_loading : loading}" class="qrStreamContainer">
        <qrcode-stream @decode="onDecode" @init="onInit" />
      </div>
      <div class="qrbottom" v-if="!loading" @click="emitCancel"><p>Cancel</p></div>
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue3-qrcode-reader'

export default {
  components: {QrcodeStream},
  emits: ["closeQR","onQRDecode"],
  data () {
    return {
      result: '',
      error: '',
      loading: false,
    }
  },
  methods: {
    emitCancel() {
      this.$emit('closeQR')
    },

    onDecode (result) {
      this.result = result
      if (this.result) {
        // alert(result)
        this.$emit('onQRDecode',{success:true,QRContent:this.result})
      }else{
        // this.$emit('onQRDecode',{success:false,QRContent:null})
      }
    },

    async onInit (promise) {
      this.loading = true
      this.$store.dispatch('activateLoader')
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permission"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        } else if (error.name === 'InsecureContextError') {
          this.error = 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
        } else {
          this.error = `ERROR: Camera error (${error.name})`;
        }
      } finally {
        this.$store.dispatch('deActivateLoader')
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
._loading {
  display: none;
}
.qrerror {
  font-weight: bold;
  color: red;
}
.qrscan {
  display: block;
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  /* padding: 30px 15px; */
  z-index: 10000;
}

.qrwrapwrap {
  position: relative;
  padding: 50px;
  background-color: rgba(220,220,220,0.75);
  height: 100vh !important;
}

.qrscan >>> div:first-of-type {
  height: calc(100% - 30px);
}

.qrbottom {
  height: 30px;
  width: 100%;
  background: var(--brand-black);
}

.qrbottom p {
  color: var(--brand-white);
  text-align: center;
  width: 100%;
  font-weight: 500;
  font-size: 20px;
  background-color: var(--brand-color);
}

.qrcode-stream-wrapper{
  /* height: 100vh */
  border: 4px solid var(--brand-color);
  margin-top:40%

}

.qrStreamContainer{

  height: 300px !important;
}

</style>
