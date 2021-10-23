<template>
  <div class="qrscan">
    <!-- <p class="qrerror">{{ error }}</p>
    <p class="decode-result">Last result: <b>{{ result }}</b></p> -->

    <div class="qrwrapwrap">
      <qrcode-stream @decode="onDecode" @init="onInit" />
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
      if (result) {
        // alert(result)
        this.$emit('onQRDecode',{success:true,QRContent:result})
      }else{
        this.$emit('onQRDecode',{success:false,QRContent:null})
      }
    },

    async onInit (promise) {
      this.loading = true
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
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
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
}

.qrscan >>> div:first-of-type {
  /* margin-top: -50px; */
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
}
</style>
