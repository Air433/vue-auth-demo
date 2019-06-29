<template>
  <v-app>
    <v-layout row wrap>
      <v-flex xs6>
        <v-card>
          <v-card-text class="px-0">
            <v-treeview
              :items="treeItems"
              activatable
              :active.sync="chooseMenus"
              return-object="true"
            >
            </v-treeview>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6>

        <v-text-field
          label="Solo"
          :placeholder="menuName"
          solo
          disabled="true"
        ></v-text-field>

      </v-flex>

      <v-flex xs6>
        <v-btn color="success" @click="confirmMenu">确定</v-btn>
      </v-flex>
      <v-flex xs6>
        <v-btn color="info" @click="closeWindow">取消</v-btn>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
  export default {
    name: "choose-menu-dialog",
    props: {
      closeWindow: {
        type: Function
      },
      treeItems: {
        type: Array,
        default: []
      },
      menus: {
        type: Array,
        default: null
      },
      updateParentMenuId: {
        type: Function
      }
    },
    data: () => ({
      chooseMenus: [],
      parentMenuId: null,
      menuName: '',
      menuId: null
    }),
    methods: {
      closeWindow() {
        this.show = false;
      },
      confirmMenu() {
        this.updateParentMenuId(this.chooseMenus[0]);
        this.closeWindow();
      }
    },
    watch: {
      menus: {
        deep: true,
        handler() {
          if (this.menus[0]) {
            this.parentMenuId = this.menus[0].parentId;
            this.menuName = this.menus[0].parentName;
            this.menuId = this.menus[0].parentId;
          }

        }
      },
      chooseMenus: {
        deep: true,
        handler() {
          this.menuName = this.chooseMenus[0].name;
          this.menuId = this.chooseMenus[0].id;
        }
      }
    }
  }
</script>

<style scoped>

</style>
