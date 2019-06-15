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
        updateRoleRemark: String,
        show: Boolean
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
              this.http.put('/sys/role/update', req)
                .then(res=>{
                  if (res.data.status == 200){
                    this.searchRole();
                  }
                });
            } else {
              let req = {menuIdList:this.tree, remark:this.remark, roleName:this.roleName};
              this.http.postJson('/sys/role/save', req)
                .then(res=>{
                  if (res.data.status == 200){
                    this.searchRole();
                  }
                });
            }


          },
          fetch() {
            if (this.breweries.length) return;

            return fetch('https://api.openbrewerydb.org/breweries')
              .then(res => res.json())
              .then(data => (this.breweries = data))
              .catch(err => console.log(err))
          }

        },
        watch:{
          show: {
            handler(){
              if (this.updateRoleId) {
                this.roleId = this.updateRoleId;
                this.roleName = this.updateRoleName;
                this.remark = this.updateRoleRemark;
                this.http.get("/sys/menu/list")
                  .then(res=>{
                    this.items = this.$Util.buildMenuTree(res.data);
                  });
                this.http.get('/sys/role/info/'+ this.roleId)
                  .then(res=>{
                    let menuIds = res.data.data.menuIdList;
                    this.tree = menuIds;
                  });
              }else {
                this.roleId = null;
                this.roleName = '';

                this.remark = '';
                this.tree = []
                this.http.get("/sys/menu/list")
                  .then(res=>{
                    this.items = this.$Util.buildMenuTree(res.data);
                  });
              }

            }
          }
        }

    }
</script>

<style scoped>
btn {text-align: right}
</style>
