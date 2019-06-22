<template>
  <v-app>
    <v-card>
      <!--对话框的标题-->
      <v-toolbar dense dark color="primary">
        <v-toolbar-title>菜单信息</v-toolbar-title>
      </v-toolbar>

      <v-form>

        <v-radio-group v-model="menuType" row>
          <v-radio label="目录" value="0"></v-radio>
          <v-radio label="菜单" value="1"></v-radio>
          <v-radio label="按钮" value="2"></v-radio>
        </v-radio-group>


        <v-text-field
          v-model="menuName"
          :counter="50"
          label="菜单名称"
          required
        ></v-text-field>

        <v-text-field
          v-model="parentName"
          :counter="50"
          label="上级菜单"
          required
          @click="showChooseMenu"
        ></v-text-field>



        <v-dialog max-width="800" v-model="chooseMenuShow" persistent scrollable>
          <v-card>
            <!--对话框的标题-->
            <v-toolbar dense dark color="primary">
              <v-toolbar-title>选择菜单</v-toolbar-title>
              <v-spacer/>
              <!--关闭窗口的按钮-->
              <v-btn icon @click="closeWindow">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
            <!--对话框的内容，表单-->
            <v-card-text class="px-5" style="height:800px">
              <choose-menu-dialog  :closeWindow="closeWindow" :treeItems="treeItems" :menus="[updateMenu]" :updateParentMenuId="updateParentMenuId"></choose-menu-dialog>
            </v-card-text>
          </v-card>
        </v-dialog>

      </v-form>
    </v-card>
  </v-app>
</template>

<script>

  import ChooseMenuDialog from './ChooseMenuDialog'

  export default {
    name: "update-menu-form",
    components: {
      ChooseMenuDialog
    },
    props: {
      updateMenu: {
        type: Object,
        default: {}
      },
      treeItems: {
        type: Array,
        default: []
      },
    },
    data(){
      return {
        menuName: '',
        menuType: null,
        chooseMenuShow: false,
        parentMenuId: null
      }
    },
    methods: {
      showChooseMenu(){
        this.chooseMenuShow = true;
      },
      closeWindow(){
        this.chooseMenuShow = false;
      },
      updateParentMenuId(parentMenu){
        this.parentMenuId = parentMenu.id;
        this.parentName = parentMenu.name;
      }
    },
    watch: {
      updateMenu: {
        deep: true,
        handler(){
          this.menuName = this.updateMenu.name;
          this.menuType = this.updateMenu.type.toString();
          this.parentName = this.updateMenu.parentName;
          this.parentMenuId = this.updateMenu.parentId;
        }
      }
    }
  }
</script>

<style scoped>

</style>
