<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-app>
    <v-form
      v-model="valid"
      lazy-validation
      ref="form"
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
        :rules="repectPasswordRules"
        :error-messages="passworderrorMessage"
        label="确认密码"
        id="password"
        @click:append="e1 ? 'visibility' : 'visibility_off'"
        :append-icon-cb="() => (e1 = !e1)"
        :type="e1 ? 'text' : 'password'"
        @focus="delErrorMsg"
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="邮箱"
        required
      ></v-text-field>

      <v-text-field
        v-model="mobile"
        :counter="11"
        :rules="phoneRules"
        label="手机号"
        required
      ></v-text-field>

      <!--<p class="font-weight-thin">角色:</p>-->

      <!--<v-container fluid>-->
        <!--<v-layout row wrap>-->
          <!--<v-flex xs12 sm4 md4 v-for="item in roles">-->
            <!--<v-checkbox v-model="selected" :label="item.roleName" :value="item"></v-checkbox>-->
          <!--</v-flex>-->
        <!--</v-layout>-->
      <!--</v-container>-->

      <v-flex xs12 sm6>
        <v-select
          v-model="selected"
          :items="roles"
          item-text="roleName"
          item-value="roleId"
          label="选择角色"
          multiple
          chips
          hint="选择角色"
          persistent-hint
          attach
        >

          <template v-slot:selection="{ item, index }">

            <v-chip >
              <span>{{item.roleName}}</span>
            </v-chip>
          </template>

        </v-select>
      </v-flex>

      <v-container fluid>
        <v-switch v-model="enable" label="是否启用"></v-switch>
      </v-container>

      <v-btn
        :disabled="!valid"
        color="success"
        @click="saveUser"
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
      searchUser: {
        type: Function,
        default: null
      },
      closeWindow: {
        type: Function,
        default: null
      },
      show: Boolean
    },
    data: () => ({
      username: '',
      email: '',
      password: '',
      e1: false,
      valid: true,
      repectPassword: '',
      mobile: '',
      enable: true,
      roles: [],
      selected: [],
      passworderrorMessage: '',
      nameRules: [
        v => !!v || '用户名不能为空',
        v => v.length <= 20 || '用户名长度不能超过20位',
        v => v.length > 1 || '用户名长度不能少于2位'
      ],
      passwordRules: [
        v => !!v || '密码不能为空'
      ],
      repectPasswordRules: [
        v => !!v || '确认密码不能为空'

      ],
      emailRules: [
        v => !!v || '邮箱不能为空',
        v => /.+@.+/.test(v) || '邮箱格式不对'
      ],
      phoneRules: [
        v => v.replace(/[^0-9]+/g, '').length==v.length || '手机号必须是数字'
      ]
    }),
    methods: {
      saveUser(){
        if (!this.$refs.form.validate()) {
          return;
        }
        if (!(this.password===this.repectPassword)) {
          this.passworderrorMessage = '两次输入的密码不一样';
          return;
        }
        // let roleIds = this.selected.map(x => x.roleId);
        let params = {username: this.username, status: this.enable?1:0, password: this.password,
        mobile: this.mobile, email: this.email, roleIdList: this.selected};
        this.http.postJson('/sys/user/save', params)
          .then(res=>{
            if (res.data.status == 200){
              this.$message.success("保存成功");
              this.searchUser();
              setTimeout(()=>{
                this.closeWindow()
              }, 1000)

            }else{
              if (res.data.status==331){
                this.$message.error("保存失败，"+ res.data.msg);
              }else{
                this.$message.error("保存失败");
              }

            }
          });
      },
      delErrorMsg(){
        this.passworderrorMessage = ''
      }
    },
    watch: {
      show: {
        handler() {
          if (this.show) {
            this.http.get('/sys/role/select')
              .then(res => {
                this.roles = res.data.data;
              })
          }else {
            this.roles = [];
            this.selected = [];
          }
        }
      }
    }


  }
</script>

<style scoped>

</style>
