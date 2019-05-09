<template>
<div>
  <!--<v-card-text>-->
    <!--<v-form>-->


  <v-text-field prepend-icon="person" v-model="username" label="username11" ></v-text-field>


      <v-text-field
        prepend-icon="lock"
        v-model="password"
        id="password"
        :append-icon="e1 ? 'visibility' : 'visibility_off'"
        :type="e1 ? 'text' : 'password'"
        label="Normal"
        counter
        @click:append="e1 = !e1"

      ></v-text-field>

  <!--<v-flex xs12 sm6>-->
  <!--<v-flex xs12 sm6 md3>-->
  <v-text-field prepend-icon="person" v-model="user" label="username11" ></v-text-field>
  <!--</v-flex>-->
    <v-text-field
      prepend-icon="lock"
      v-model="password"
      id="password"
      :append-icon="show1 ? 'visibility' : 'visibility_off'"
      :type="show1 ? 'text' : 'password'"
      label="Normal with hint text"
      counter
      @click:append="show1 = !show1"
    ></v-text-field>


  <!--</v-flex>-->
    <!--</v-form>-->
  <!--</v-card-text>-->

</div>
</template>

<script>
    export default {
        name: "Test",
      data(){
          return {
            user: "",
            username : "",
            password: "",
            el: false,
            show1: false,
            rules: {
              required: value => !!value || 'Required.',
              min: v => v.length >= 8 || 'Min 8 characters',
              emailMatch: () => ('The email and password you entered don\'t match')
            }
          }
      }

    }
</script>

<style scoped>

</style>
