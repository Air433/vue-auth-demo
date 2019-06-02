<template>
  <v-alert
    :value="visable"
    color="error" transition="scale-transition"
  class="message">
    {{alertMessage}}
  </v-alert>
</template>

<script>
    export default {
        name: "MyMessage",
        props: {
          visable: {
            type: Boolean,
            default: false
          },
          alertMessage: {
            type: String,
            default: ''
          }
        },
        data(){
          return{
            visable: false,
            alertMessage:''
          }
        }
    }
</script>

<style scoped>
  .message{
    position: fixed;
    top: 40px;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
    min-width: 400px;
  }
</style>
