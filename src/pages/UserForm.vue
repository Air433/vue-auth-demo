<template>
  <v-app>
    <v-form
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="username"
        :counter="50"
        :rules="nameRules"
        label="用户名"
        required
      ></v-text-field>

      <v-text-field
        prepend-icon="lock"
        v-model="password"
        :rules="passwordRules"
        label="密码"
        id="password"
        @click:append="e1 ? 'visibility' : 'visibility_off'"
        :append-icon-cb="() => (e1 = !e1)"
        :type="e1 ? 'text' : 'password'"
      ></v-text-field>

      <v-text-field
        prepend-icon="lock"
        v-model="repectPassword"
        :rules="passwordRules"
        label="确认密码"
        id="password"
        @click:append="e1 ? 'visibility' : 'visibility_off'"
        :append-icon-cb="() => (e1 = !e1)"
        :type="e1 ? 'text' : 'password'"
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="邮箱"
        required
      ></v-text-field>

      <v-text-field
        v-model="phone"
        :counter="11"
        :rules="phoneRules"
        label="手机号"
        required
      ></v-text-field>

      <p class="font-weight-thin">角色:</p>

      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 sm4 md4>
            <v-checkbox v-model="selected" label="John" value="sdf"></v-checkbox>
            <v-checkbox v-model="selected" label="Jacob" value="xcvfs"></v-checkbox>
            <v-checkbox v-model="selected" label="Jacob" value="dsdfsdf"></v-checkbox>
          </v-flex>
          <v-flex xs12 sm4 md4>
            <v-checkbox v-model="selected" label="John" value="Johnwer3c"></v-checkbox>
          </v-flex>
          <v-flex xs12 sm4 md4 v-for="item in roles">
            <v-checkbox v-model="selected" :label="item.roleName" :value="item"></v-checkbox>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container fluid>
        <v-switch v-model="enable" label="是否启用"></v-switch>
      </v-container>

      <v-btn
        :disabled="!valid"
        color="success"
        @click="validate"
      >
        保存
      </v-btn>
    </v-form>
  </v-app>

</template>

<script>

  export default {
    name: "user-form",
    props: {
      show: Boolean
    },
    data: () => ({
      username: '',
      email: '',
      password: '',
      e1: false,
      valid: true,
      repectPassword: '',
      phone: '',
      enable: true,
      roles: [],
      selected: [],
      nameRules: [
        v => !!v || '用户名不能为空',
        v => v.length <= 20 || '用户名长度不能超过20位',
        v => v.length > 1 || '用户名长度不能少于2位'
      ],
      passwordRules: [
        v => !!v || '密码不能为空'
      ],
      emailRules: [
        v => !!v || '邮箱不能为空',
        v => /.+@.+/.test(v) || '邮箱格式不对'
      ],
      phoneRules: [
        v => !!v.replace(/[^0-9]+/g, '') || '手机号必须是数字'
      ]
    }),
    watch: {
      show: {
        handler() {
          if (this.show) {
            this.http.get('/sys/role/select')
              .then(res => {
                this.roles = res.data.data.list;
                console.log(this.roles)
              })
          }
        }
      }
    }


  }
</script>

<style scoped>

</style>
