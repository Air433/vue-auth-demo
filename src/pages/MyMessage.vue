<template>
  <v-alert
    :value="visable"
    :color="color" transition="scale-transition"
    class="message">
    {{text}}
  </v-alert>
</template>

<script>
    export default {
        name: "MyMessage",
        props: {
          color: {
            type: String,
            default: 'success'
          },
          visable: {
            type: Boolean,
            default: false
          },
          text: {
            type: String,
            default: ''
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
    z-index: 1000;
  }
</style>
