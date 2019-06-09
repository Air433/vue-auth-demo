<template>
  <v-app>
    <v-form
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="username"
        label="用户名"
        disabled
      >
      </v-text-field>

      <v-text-field
        v-model="email"
        label="邮箱"
      >
      </v-text-field>
        <v-text-field
          v-model="mobile"
          label="手机号"
        >
        </v-text-field>

      <v-container fluid>
        <v-switch v-model="enable" label="是否启用"></v-switch>
      </v-container>

      <v-btn
        :disabled="!valid"
        color="success"
        @click="updateUser"
      >
        保存
      </v-btn>
    </v-form>

  </v-app>
</template>

<script>
  export default {
    name: "update-user-form",
    props: {
      user: {
        type: Object
      }
    },
    data: ()=>({
      valid: false,
      username: '',
      email: '',
      enable: true
    }),
    methods: {
      updateUser(){

      }
    },
    watch: {
      user: {
        deep: true,
        handler(){
          this.username = this.user.username;
          this.email = this.user.email;
          this.mobile = this.user.mobile;
          this.enable = this.user.status==1?true:false
        }
      }
    }
  }
</script>

<style scoped>

</style>
