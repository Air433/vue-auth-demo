<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-app>
    <v-layout row wrap>
    <v-flex xs6>
      <v-card >
        <v-card-text class="px-0">
          <v-treeview
            :items="treeItems"
            activatable
            :active.sync="menuId"
          >
          </v-treeview>
        </v-card-text>
      </v-card>
    </v-flex>
      <v-flex xs6>
        <v-card  >
          <v-card-text class="px-0">
            <update-menu-form v-if="menu" :updateMenu="menu"></update-menu-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>

  import UpdateMenuForm from './UpdateMenuForm'

    export default {
      name: "Menu",
      components: {UpdateMenuForm},

      data: () => ({
        treeItems: [],
        menuId: null,
        items: [],
        menu: null
      }),
      created(){
        this.http.get("/sys/menu/list")
          .then(res=>{
            this.items = res.data;
            this.treeItems = this.$Util.buildMenuTree(res.data);
          });
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
