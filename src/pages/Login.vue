<template>
<!--<div style="background-image: url(/static/timg.jpg);background-repeat: no-repeat;">-->
  <div>
  <!--<img src="/static/timg.jpg">-->
  <v-app  style="background-image: url(/static/timg.jpg);background-repeat: no-repeat;background-size:cover">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="teal lighten-3">
                <v-toolbar-title>后台管理</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" v-model="username" label="用户名" type="text"></v-text-field>
                  <v-text-field
                    prepend-icon="lock"
                    v-model="password"
                    label="密码"
                    id="password"
                    @click:append="e1 ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (e1 = !e1)"
                    :type="e1 ? 'text' : 'password'"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="doLogin">登录</v-btn>
              </v-card-actions>
            </v-card>
            <v-alert
              :value="errorFlag"
              color="error" transition="scale-transition">
              {{errorMsg}}
            </v-alert>
          </v-flex>
        </v-layout>
      </v-container>

    </v-content>

    <v-dialog v-model="dialog" width="300px">
      <v-alert icon="warning" color="error" :value="true" >
        用户名和密码不能为空
      </v-alert>
    </v-dialog>
  </v-app>
</div>
</template>

<script>
    export default {
        name: "Login",
        data () {
          return {
            username: "",
            password: "",
            dialog: false,
            e1:false,
            errorFlag: false,
            errorMsg : ""
          }
        },
        methods: {
          tests(){
            this.http.get('/sys/menu/list')
              .then(res=>{
                console.log(res.data)
              },error=>{
                console.log(error.data)
              })
          },
          doLogin(){

            var req = {username:this.username,password:this.password,grant_type:"password",scope:"server"};
            this.http.postForm('/oauth/token', req)
              .then(res=>{
                console.log(res.data);
                // alert('登陆成功'+res.data.access_token);
                localStorage.setItem("auth", JSON.stringify(res.data));
                this.$router.push("/");
              }, error=>{
                console.log(error.data)
                if (error.data.code==408){
                  // alert("用户名或密码错误")
                  this.errorMsg = "用户名或密码错误";
                  // if (!this.errorFlag){
                  //   window.setInterval(() => {
                  //     if (this.errorFlag){
                  //       this.errorFlag = false;
                  //     }
                  //   },3000)
                  // }

                  this.errorFlag = true;

                }
              });
            // this.axios.post("www.baidu.com", {'username':this.username, 'password': this.password})
            //   .then(res =>{
            //
            //   })
            // this.axios({
            //   method: "POST",
            //   url: `http://192.168.8.192:8080/auth_token`,
            //   data: {'username':this.username, 'password': this.password},
            //   headers: {
            //     'Content-Type': 'application/json;charset=UTF-8'
            //   }
            // }).then(function(res) {
            //   console.log(res);
            // });
          }
        }

    }
</script>

<style scoped>

</style>
