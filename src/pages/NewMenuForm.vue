<template>
  <v-app>
    <v-card>
      <v-toolbar dense dark color="primary">
        <v-toolbar-title>新建菜单</v-toolbar-title>
        <v-spacer/>
        <!--关闭窗口的按钮-->
        <v-btn icon @click="changeMenuForm">
          <v-icon>close</v-icon>
        </v-btn>
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


        <v-text-field
          v-model="perms"
          :counter="500"
          label="授权标识"
          v-if="menuType ==1 || menuType==2"
        ></v-text-field>

        <v-layout v-if="menuType ==1" row wrap>
          <v-flex xs1>
            <v-text-field
              v-model="slider"
              class="mt-0"
              hide-details
              single-line
              type="number"
            ></v-text-field>
          </v-flex>
          <v-flex xs11>
            <v-slider
              v-model="slider"
              thumb-label="always"
            ></v-slider>
          </v-flex>

        </v-layout>

        <v-text-field
          v-model="url"
          :counter="500"
          label="菜单路由"
          v-if="menuType ==1"
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
              <choose-menu-dialog :closeWindow="closeWindow" :treeItems="treeItems" :menus="[updateMenu]"
                                  :updateParentMenuId="updateParentMenuId">

              </choose-menu-dialog>
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-btn color="success" @click="saveMenu">保存</v-btn>
      </v-form>
    </v-card>
  </v-app>
</template>

<script>

  import ChooseMenuDialog from './ChooseMenuDialog'

  export default {
    name: "new-menu-form",
    components: {ChooseMenuDialog},
    props: {
      changeMenuForm: {
        type: Function
      },
      treeItems: {
        type: Array,
        default: []
      },
      findMenuList: {
        type: Function
      }
    },
    data() {
      return {
        menuName: '',
        menuType: null,
        chooseMenuShow: false,
        parentMenuId: null,
        perms: null,
        slider: 0,
        url: null,
        menuId: null
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
      },
      saveMenu(){
        let saveDTO = {parentId: this.parentMenuId, name: this.menuName, url: this.url, perms: this.perms,
        type: parseInt(this.menuType),orderNum: this.slider};

        this.http.postJson('/sys/menu/save', saveDTO)
          .then(res=>{
            if (res.data.status == 200){
              this.$message.success("保存成功");
              this.findMenuList();
            }else {
              if (res.data.msg) {
                this.$message.error("保存失败:"+res.data.msg);
              }else{
                this.$message.error("保存失败");
              }

            }
          }).catch(error=>{
          this.$message.error("保存失败")
        })
      }
    }
  }
</script>

<style scoped>

</style>
