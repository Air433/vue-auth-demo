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


      </v-form>
    </v-card>
  </v-app>
</template>

<script>
  export default {
    name: "update-menu-form",
    props: {
      updateMenu: {
        type: Object,
        default: {}
      }
    },
    data(){
      return {
        menuName: '',
        menuType: null
      }
    },
    watch: {
      updateMenu: {
        deep: true,
        handler(){
          this.menuName = this.updateMenu.name;
          this.menuType = this.updateMenu.type.toString();
        }
      }
    }
  }
</script>

<style scoped>

</style>
