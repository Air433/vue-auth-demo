<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-app>
    <div>
      <v-btn color="success" @click="isNewMenu = !isNewMenu">新增</v-btn>
      <v-btn color="info" @click="canUpdate = !canUpdate">编辑</v-btn>
      <v-btn color="error" @click="delDialog = true">删除</v-btn>
    </div>

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
            @click.stop="delMenu"
          >
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-layout row wrap>

    <v-flex xs6>
      <v-card >
        <v-card-text class="px-0">
          <v-treeview
            :items="treeItems"
            activatable
            :active.sync="menuId"
            :open="open"
          >
          </v-treeview>
        </v-card-text>
      </v-card>
    </v-flex>
      <v-flex xs6>
        <v-card  >
          <v-card-text class="px-0">
            <update-menu-form v-if="!isNewMenu && menu" :updateMenu="menu" :treeItems="treeItems" :findMenuList="findMenuList" :canUpdate="canUpdate" :changeMenuForm="changeMenuForm"></update-menu-form>

            <new-menu-form v-if="isNewMenu" :treeItems="treeItems" :changeMenuForm="changeMenuForm" :findMenuList="findMenuList"></new-menu-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>

  import UpdateMenuForm from './UpdateMenuForm'

  import NewMenuForm from './NewMenuForm'

    export default {
      name: "Menu",
      components: {UpdateMenuForm, NewMenuForm},

      data: () => ({
        treeItems: [],
        menuId: null,
        items: [],
        menu: null,
        open: 1,
        canUpdate: 'true',
        isNewMenu: false,
        delDialog: false
      }),
      created(){
        this.findMenuList()
      },
      methods: {
        findMenuList(){
          this.http.get("/sys/menu/list")
            .then(res=>{
              this.items = res.data;
              this.treeItems = this.$Util.buildMenuTree(res.data);
            });
        },
        changeMenuForm(){
          this.isNewMenu = !this.isNewMenu;
        },
        delMenu(){
          if (this.menu){
            this.http.delete('/sys/menu/delete/'+ this.menu.menuId)
              .then(res=>{
                if (res.data.status==200){
                  this.$message.success('删除成功');
                  this.findMenuList();
                } else if (res.data.msg) {
                  this.$message.error('删除失败:'+res.data.msg);
                }
              });
            this.delDialog = false;
          } else {
            this.$message.error('请先选择菜单');
          }
        }
      },
      watch: {
        menuId: {
          handler(){
            this.menu = this.items.find(x=> x.menuId== this.menuId);
          }
        }
      }
    }
</script>

<style scoped>

</style>
