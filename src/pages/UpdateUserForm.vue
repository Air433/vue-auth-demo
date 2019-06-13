<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
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


      <v-flex xs12 sm6>
        <v-select
          v-model="selectedRoleIds"
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

          <!--<template v-slot:item="{ item, index }">-->

            <!--&lt;!&ndash;<v-checkbox v-model="selectedRoleIds" :label="item.roleName" :value="item.roleId"></v-checkbox>&ndash;&gt;-->
            <!--&lt;!&ndash;<v-checkbox>&ndash;&gt;-->

            <!--<span>{{ item.roleName }}</span>-->
            <!--&lt;!&ndash;</v-checkbox>&ndash;&gt;-->

          <!--</template>-->

          <template v-slot:selection="{ item, index }"
          >

            <!--<v-chip v-for="selectRole in selectedRoles">-->
              <!--<span>{{item}}{{selectRole.roleName}}</span>-->
            <!--</v-chip>-->
            <v-chip >
              <span>{{item.roleName}}</span>
            </v-chip>
          </template>

        </v-select>
      </v-flex>

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
      searchUser: {
        type: Function,
        default: null
      },
      user: {
        type: Object
      }
    },
    data: ()=>({
      valid: false,
      username: '',
      email: '',
      enable: true,
      roles: [],
      selectedRoleIds: [],
      selectedRoles: []
    }),
    methods: {
      updateUser(){
        let dto = {userId: this.user.userId, email: this.email, mobile: this.mobile, status: this.enable?1:0
        , roleIdList: this.selectedRoleIds};
        this.http.put('/sys/user/update', dto)
          .then(res=>{
              if (res.data.status == 200){
                this.$message.success("修改成功");
                this.searchUser()
              }
          })
      }
    },
    watch: {
      user: {
        deep: true,
        handler(){
          this.username = this.user.username;
          this.email = this.user.email;
          this.mobile = this.user.mobile;
          this.enable = this.user.status==1?true:false;

          this.http.get('/sys/role/select')
            .then(res=>{
              this.roles = res.data.data;

              this.http.get('/sys/user/info/'+ this.user.userId)
                .then(userInfo=>{
                  this.selectedRoleIds = userInfo.data.data.roleIdList;
                })
            });

        }
      // ,
      // selectedRoleIds: {
      //   deep: true,
      //   handler(){
      //     if (this.selectedRoleIds && this.selectedRoleIds.length > 0){
      //       this.selectedRoles = this.roles.filter(x=> this.selectedRoleIds.some(y=> y==x.roleId));
      //     }else {
      //       this.selectedRoles = [];
      //     }
      //   }
      }
    }
  }
</script>

<style scoped>

</style>
