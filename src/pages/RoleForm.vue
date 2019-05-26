<template>
  <v-app>

    <v-form
      lazy-validation
    >
      <v-text-field
        v-model="roleName"
        :counter="50"
        :rules="nameRules"
        label="角色名称"
        required
      ></v-text-field>

      <v-text-field
        v-model="remark"
        label="备注"
        required
      ></v-text-field>

      <v-treeview
        :items="items" selectable open-on-click
        v-model="tree"
      >
      </v-treeview>

      <v-btn
        color="success"
        @click="saveRole"
      >
        确定
      </v-btn>

      <v-btn
        color="warning"
        @click="close()"
      >
        取消
      </v-btn>
    </v-form>
  </v-app>
</template>

<script>
    export default {
      name: "role-form",
      props:{
        searchRole:{
          type: Function,
          default:null
        },
        updateRoleId: Number,
        updateRoleName: String,
        updateRoleRemark: String
      },
      data: () => ({
        breweries: [],
        roleName:'',
        remark:'',
        nameRules: [
          v => !!v || '角色名称是必填的'
        ],
        tree: [],
        types: [],
        items:[
          {
            id: 1,
            name: 'Applications :',
            children: [
              { id: 2, name: 'Calendar : app' },
              { id: 3, name: 'Chrome : app' },
              { id: 4, name: 'Webstorm : app' }
            ]
          },
          {
            id: 5,
            name: 'Documents :',
            children: [
              {
                id: 6,
                name: 'vuetify :',
                children: [
                  {
                    id: 7,
                    name: 'src :',
                    children: [
                      { id: 8, name: 'index : ts' },
                      { id: 9, name: 'bootstrap : ts' }
                    ]
                  }
                ]
              },
              {
                id: 10,
                name: 'material2 :',
                children: [
                  {
                    id: 11,
                    name: 'src :',
                    children: [
                      { id: 12, name: 'v-btn : ts' },
                      { id: 13, name: 'v-card : ts' },
                      { id: 14, name: 'v-window : ts' }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 15,
            name: 'Downloads :',
            children: [
              { id: 16, name: 'October : pdf' },
              { id: 17, name: 'November : pdf' },
              { id: 18, name: 'Tutorial : html' }
            ]
          },
          {
            id: 19,
            name: 'Videos :',
            children: [
              {
                id: 20,
                name: 'Tutorials :',
                children: [
                  { id: 21, name: 'Basic layouts : mp4' },
                  { id: 22, name: 'Advanced techniques : mp4' },
                  { id: 23, name: 'All about app : dir' }
                ]
              },
              { id: 24, name: 'Intro : mov' },
              { id: 25, name: 'Conference introduction : avi' }
            ]
          },

        ]


      }),
      computed: {
        selections () {
          const selections = [];


          for (const leaf of this.tree) {
            const brewery = this.breweries.find(brewery => brewery.id === leaf);

            if (!brewery) continue;

            selections.push(brewery)
          }
          console.log(selections);
          return selections
        },
        shouldShowTree () {
          return this.breweries.length > 0 && !this.isLoading
        }
      },
        methods: {
          saveRole(){
            if (this.roleId){
              let req = {menuIdList:this.tree, remark:this.remark, roleName:this.roleName, roleId:this.roleId};
              this.http.postJson('/sys/role/update', req);
            } else {
              let req = {menuIdList:this.tree, remark:this.remark, roleName:this.roleName};
              this.http.postJson('/sys/role/save', req);
            }

            this.searchRole();
          },
          fetch() {
            if (this.breweries.length) return;

            return fetch('https://api.openbrewerydb.org/breweries')
              .then(res => res.json())
              .then(data => (this.breweries = data))
              .catch(err => console.log(err))
          },
          buildTree (arr) {
            let temp = {};
            let tree = {};
            // 数组转 键值对
            arr.forEach(item => {
              temp[item.menuId] = item
            });

            let tempKeys = Object.keys(temp)
            tempKeys.forEach(key => {
              // 获取当前项
              let item = temp[key]
              // 当前项 pId
              let _itemPId = item.parentId
              // 获取父级项
              let parentItemByPid = temp[_itemPId]
              if (parentItemByPid) {
                if (!parentItemByPid.children) {
                  parentItemByPid.children = []
                }
                parentItemByPid.children.push(item)
              } else {
                tree[item.menuId] = item
              }
            });
            // 对象转数组并返回
            return Object.keys(tree).map(key => tree[key])
          },
          buildMenuTree (array) {
            let arr = [];
            for (let i = 0; i < array.length; i++) {
              arr[i] = {};
              arr[i].id = array[i].menuId;
              arr[i].name = array[i].name;
              arr[i].parentId = array[i].parentId;
              arr[i].parentName = array[i].parentName;
              arr[i].url = array[i].url;
              arr[i].perms = array[i].perms;
            }

            let temp = {};
            let tree = {};
            // 数组转 键值对
            arr.forEach(item => {
              temp[item.id] = item
            });

            let tempKeys = Object.keys(temp)
            tempKeys.forEach(key => {
              // 获取当前项
              let item = temp[key]
              // 当前项 pId
              let _itemPId = item.parentId
              // 获取父级项
              let parentItemByPid = temp[_itemPId]
              if (parentItemByPid) {
                if (!parentItemByPid.children) {
                  parentItemByPid.children = []
                }
                parentItemByPid.children.push(item)
              } else {
                tree[item.id] = item
              }
            });
            // 对象转数组并返回
            return Object.keys(tree).map(key => tree[key])
          }
        },
        watch:{
          updateRoleId: {
            handler(){
              if (this.updateRoleId) {
                this.roleId = this.updateRoleId;
                this.roleName = this.updateRoleName;
                this.remark = this.updateRoleRemark;
                this.http.get('/sys/role/info/'+ this.roleId)
                  .then(res=>{
                    let menuIds = res.data.data.role.menuIdList
                    this.tree = menuIds;
                  });
              }else {
                this.roleId = null;
                this.roleName = '';
                this.remark = '';
              }

            }
          }
        },
        created() {
          this.http.get("/sys/menu/list")
            .then(res=>{
              this.items = this.buildMenuTree(res.data);
            });
        }

    }
</script>

<style scoped>
btn {text-align: right}
</style>
