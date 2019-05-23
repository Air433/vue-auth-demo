<template xmlns:v-solt="http://www.w3.org/1999/XSL/Transform">
  <v-app>
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
        <v-btn color="error" @click.stop="delDialog = true">批量删除</v-btn>
      </v-layout>

      <v-dialog
        v-model="delDialog"
        max-width="290"
      >
        <v-card>
          <v-card-title >确定要删除选中的角色吗?</v-card-title>

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
              @click.stop="delRole"
            >
              确定
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-alert
        :value="displayAlert"
        color="error"
        icon="new_releases"
      >
       {{alertMsg}}
      </v-alert>

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
            <role-form @close="closeWindow" :searchRole="searchRole" :isEdit="isEdit"></role-form>
          </v-card-text>
        </v-card>
      </v-dialog>

    </v-container>
    <v-divider/>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :loading="loading"
      :items="roles"
      :total-items="pagination.totalItems"
      :pagination.sync="pagination"
      select-all
      item-key="roleId"
      class="elevation-1"
    >
      <template v-slot:headers="props" >
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
        <td class="text-xs-center">{{ props.item.roleId }}</td>
        <td class="text-xs-center">{{ props.item.roleName }}</td>
        <td class="text-xs-center">{{ props.item.remark }}</td>
        <td class="text-xs-center">{{ props.item.createTime }}</td>
        </tr>
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
      displayAlert: false,
          alertMsg:"",
          delDialog: false,
          selected:[],
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
              value: 'role_id',
              sortable: true
            },
            { text: '角色名称', align: 'center', value: 'role_name', sortable: true },
            { text: '备注', align: 'center', value: 'remark', sortable: false},
            { text: '创建时间', align: 'center', value: 'create_time', sortable: true },
            { text: '操作', sortable: false}
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
             let req = {roleName: this.roleName,page:this.pagination.page, limit:this.pagination.rowsPerPage
             , orderByColumn: this.pagination.sortBy,asc : !this.pagination.descending};
             this.http.get("/sys/role/list", req)
               .then(res=>{
                  this.roles = res.data.data.page.list;
                 this.pagination.totalItems = res.data.data.page.totalCount;
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
          },
          toggleAll () {
            if (this.selected.length) this.selected = [];
            else this.selected = this.roles.slice()
          },
            changeSort (column) {
              if (this.pagination.sortBy === column) {
                this.pagination.descending = !this.pagination.descending
              } else {
                this.pagination.sortBy = column;
                this.pagination.descending = false
              }
            },
            delRole(){
               if (!this.selected || this.selected.length == 0){
                  this.alertMsg = "没有选中任何角色";
                   this.displayAlert  = true;
                   this.delDialog = false;
                   setTimeout(()=>{
                     this.displayAlert = false;
                   },3000);
               }else{
                 let roleIds = this.selected.map(x=> x.roleId);

                 this.http.postJson('/sys/role/delete', roleIds)
                   .then(res=>{
                     if (res.data.status==200){
                       this.searchRole();
                     }
                   });
                 this.delDialog = false;

               }

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
        watch:{
          pagination:{
            deep: true,
            handler(){
              this.searchRole();
            }
          }
        },
        created(){
          this.searchRole();
        },
        compoents:{
          RoleForm
        }
    }


</script>

<style scoped>

</style>
