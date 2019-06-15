<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-app>
    <v-card>
      <v-container>
        <v-layout>
          <v-flex xs12 sm2 md2>
            <v-text-field
              v-model="username"
              label="用户名">
            </v-text-field>
          </v-flex>

          <v-btn color="primary" @click="searchUser">搜索</v-btn>
          <v-btn color="success" @click="addUser">新增</v-btn>
          <v-btn color="error" @click.stop="delDialog = true">批量删除</v-btn>
        </v-layout>

        <v-dialog
          v-model="delDialog"
          max-width="290"
        >
          <v-card>
            <v-card-title>确定要删除选中的角色吗?</v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="green darken-1"
                flat="flat"
                @click="delDialog = false"
              >
                取消
              </v-btn>

              <v-btn
                color="red"
                flat="flat"
                @click.stop="delUser"
              >
                确定
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!--弹出的对话框-->
        <v-dialog max-width="800" v-model="show" persistent scrollable>
          <v-card>
            <!--对话框的标题-->
            <v-toolbar dense dark color="primary">
              <v-toolbar-title>{{isEdit ? '修改' : '新增'}}用户</v-toolbar-title>
              <v-spacer/>
              <!--关闭窗口的按钮-->
              <v-btn icon @click="closeWindow"><v-icon>close</v-icon></v-btn>
            </v-toolbar>
            <!--对话框的内容，表单-->
            <v-card-text class="px-5" style="height:800px">
              <user-form :closeWindow="closeWindow" :searchUser="searchUser" :isEdit="isEdit" :show="show"></user-form>
            </v-card-text>
          </v-card>
        </v-dialog>

        <!--弹出的对话框-->
        <v-dialog max-width="800" v-model="updateShow" persistent scrollable>
          <v-card>
            <!--对话框的标题-->
            <v-toolbar dense dark color="primary">
              <v-toolbar-title>修改用户</v-toolbar-title>
              <v-spacer/>
              <!--关闭窗口的按钮-->
              <v-btn icon @click="closeWindow"><v-icon>close</v-icon></v-btn>
            </v-toolbar>
            <!--对话框的内容，表单-->
            <v-card-text class="px-5" style="height:800px">
              <update-user-form :closeWindow="closeWindow" :searchUser="searchUser" :isEdit="isEdit" :user="user"></update-user-form>
            </v-card-text>
          </v-card>
        </v-dialog>

      </v-container>
      <v-divider/>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :loading="loading"
        :items="users"
        :total-items="pagination.totalItems"
        :pagination.sync="pagination"
        select-all
        item-key="userId"
        class="elevation-1">
        <template v-slot:headers="props">
          <tr>
            <th>
              <v-checkbox
                :input-value="props.all"
                :indeterminate="props.indeterminate"
                primary
                hide-details
                @click.stop="toggleAll"
              ></v-checkbox>
            </th>
            <th
              v-for="header in props.headers"
              :key="header.text"
              :class="header.sortable?['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']:''"
              @click="header.sortable?changeSort(header.value):''"
            >
              <v-icon small v-if="header.sortable">arrow_upward</v-icon>
              {{ header.text }}
            </th>
          </tr>
        </template>
        <template slot="items" slot-scope="props">
          <tr :active="props.selected" @click="props.selected = !props.selected">
            <td>
              <v-checkbox
                :input-value="props.selected"
                primary
                hide-details
              ></v-checkbox>
            </td>
            <td class="text-xs-center">{{ props.item.userId }}</td>
            <td class="text-xs-center">{{ props.item.username }}</td>
            <td class="text-xs-center">{{ props.item.email }}</td>
            <td class="text-xs-center">{{ props.item.mobile }}</td>
            <td class="text-xs-center">{{ props.item.status }}</td>
            <td class="text-xs-center">{{ props.item.createTime }}</td>
            <td class="text-xs-center"><v-btn color="cyan" style="color: white" @click.stop="displayUpdateUser(props.item)">更新</v-btn></td>
          </tr>
        </template>

      </v-data-table>
      <div class="text-xs-center pt-2">
        <v-pagination v-model="pagination.page"
                      :length="pages"
                      circle
        ></v-pagination>
      </div>
    </v-card>
  </v-app>
</template>

<script>

  import UserForm from './UserForm'
  import UpdateUserForm from './UpdateUserForm'

  export default {
    name: "User",
    components: {UserForm, UpdateUserForm},
    data: () => ({
      username: '',
      loading: false,
      pagination: {},
      show: false,
      updateShow: false,
      isEdit:false,
      delDialog: false,
      user: {},
      headers: [ {
        text: 'ID',
        align: 'left',
        value: 'user_id',
        sortable: true,
        width:'10px'
      },
        { text: '用户名', align: 'center', value: 'username', sortable: true, width:'150px' },
        { text: '邮箱', align: 'center', value: 'email', sortable: false, width:'200px' },
        { text: '手机号', align: 'center', value: 'mobile', sortable: true , width:'50px' },
        { text: '状态', align: 'center', value: 'status', sortable: true , width:'50px' },
        { text: '创建时间', align: 'center', value: 'create_time', sortable: true , width:'50px' },
        { text: '操作', sortable: false, width:'10px' }],
      selected: [],
      users: [{
        userId: '33',
        userName: '管理员',
        email: 'yjkgyuj',
        mobile: '65785675',
        status:'偶像',
        createTime:'2019-5-6'
      },
        {
          userId: '33',
          userName: '22',
          email: 'gjgj',
          mobile: '54757',
          status:'偶像',
          createTime:'2019-5-6'
        }]
    }),
    computed: {
      pages() {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0;

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    },
    methods: {
      searchUser() {
        this.loading = true;

        let req = {username: this.username,page:this.pagination.page,
          limit:this.pagination.rowsPerPage,
          orderField: this.pagination.sortBy, order: this.pagination.descending?'DESC':'ASC'}

        this.http.get("/sys/user/list", req)
          .then(res=>{
            this.users = res.data.data.list;
            this.pagination.totalItems = res.data.data.totalCount;
          });

        this.loading = false;

      },
      addUser() {
        this.show = true;
        this.isEdit = false;
      },
      toggleAll () {
        if (this.selected.length) this.selected = [];
        else this.selected = this.users.slice()
      },
      changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column;
          this.pagination.descending = false
        }
      },
      closeWindow(){
        this.updateShow = false;
        this.show = false;
        this.updateRoleId = null;
      },
      delUser(){
       if (!this.selected || this.selected.length == 0){
         this.$message.error('没有选中任何用户');
       }else {
         let userIds = this.selected.map(x=> x.userId);
         this.http.delete('/sys/user/delete', userIds)
           .then(res=>{
             if (res.data.status == 200){
               this.$message.success("删除成功");
               this.searchUser();
             }else {
               this.$message.error("删除失败");
             }
           });

         this.delDialog = false;
       }
      },
      displayUpdateUser(user){
        this.user = user;
        this.updateShow = true;
      }
    },
    watch: {
      pagination: {
        deep: true,
        handler(){
          this.searchUser();
        }
      }
    }
  }
</script>

<style scoped>

</style>
