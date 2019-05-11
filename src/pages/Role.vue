<template xmlns:v-solt="http://www.w3.org/1999/XSL/Transform">
  <v-app>
    <TestForm></TestForm>
    <v-card>
  <v-form v-model="valid">
    <v-container>
      <v-layout>
        <v-flex
          xs12 sm2 md2
        >
          <v-text-field
            v-model="roleName"
            :rules="nameRules"
            label="角色名称搜索"
            required
          ></v-text-field>
        </v-flex>

        <v-btn color="primary" @click="searchRole">搜索</v-btn>
        <v-btn color="success" @click="addRole">新增</v-btn>
        <v-btn color="error">批量删除</v-btn>
      </v-layout>

      <!--弹出的对话框-->
      <v-dialog max-width="800" v-model="show" persistent scrollable>
        <v-card>
          <!--对话框的标题-->
          <v-toolbar dense dark color="primary">
            <v-toolbar-title>{{isEdit ? '修改' : '新增'}}角色</v-toolbar-title>
            <v-spacer/>
            <!--关闭窗口的按钮-->
            <v-btn icon @click="closeWindow"><v-icon>close</v-icon></v-btn>
          </v-toolbar>
          <!--对话框的内容，表单-->
          <v-card-text class="px-5" style="height:800px">
            <role-form @close="closeWindow"  :isEdit="isEdit"></role-form>
          </v-card-text>
        </v-card>
      </v-dialog>

    </v-container>
    <v-divider/>
    <v-data-table
      :headers="headers"
      :loading="loading"
      :items="roles"
      :total-items="100"
      :pagination.sync="pagination"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.roleId }}</td>
        <td class="text-xs-center">{{ props.item.roleName }}</td>
        <td class="text-xs-center">{{ props.item.remark }}</td>
        <td class="text-xs-center">{{ props.item.createTime }}</td>
      </template>

    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
  </v-form>
      </v-card>
  </v-app>
</template>

<script>

  import RoleForm from './RoleForm'

  export default {
        name: "Role",
    components: {RoleForm},
    data: () => ({
          pagination: {},
          valid: false,
          roleName: '',
          lastname: '',
          show: false,
          isEdit:false,
          nameRules: [
            v => !!v || '角色名称是别填的'

          ],
          headers:[
            {
              text: 'ID',
              align: 'left',
              value: 'roleId'
            },
            { text: '角色名称', align: 'center', value: 'roleName' },
            { text: '备注', align: 'center', value: 'remark' },
            { text: '创建时间', align: 'center', value: 'createTime' },
            { text: '操作' }
          ],
          loading: false, // 是否在加载中
          roles:[
            {
              roleId: '33',
              roleName: '管理员',
              remark:'偶像',
              createTime:'2019-5-6'
            },
            {
              roleName: '22',
              name: '财务',
              remark:'偶像',
              createTime:'2019-5-6'
            }
          ]
        }),
          methods:{
           searchRole(){
             this.loading = true;
             let req = {roleName: this.roleName,page:this.pagination.page, limit:this.pagination.rowsPerPage};
             this.http.get("/sys/role/list", req)
               .then(res=>{
                  this.roles = res.data.data.page.list;
               });
             this.loading = false;
           }
           ,
          addRole() {
            this.show = true;
            this.isEdit = false
          },
          closeWindow(){
            this.show = false;
          }
        },
        computed: {
          pages () {
            if (this.pagination.rowsPerPage == null ||
              this.pagination.totalItems == null
            ) return 0;

            return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
          }
        },
        compoents:{
          RoleForm
        }
    }


</script>

<style scoped>

</style>
