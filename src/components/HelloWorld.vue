<template>
  <div class="hello">

    <v-navigation-drawer
      :dark="dark"
      persistent
      :mini-variant="miniVariant"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="../assets/shan.png">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>苏杉杉</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider/>
      <!-- 左侧菜单 -->
      <v-list class="pt-0" dense>
        <v-list-group
          v-model="item.url"
          v-for="item in items"
          :key="item.name"
          :prepend-icon="'../assets/icons/icon-'+item.icon+'.svg'"
          no-action
        >
          <!--一级菜单 -->
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <!-- 二级菜单 -->
          <v-list-tile v-for="subItem in item.list" :key="subItem.name" :to="'/'+subItem.url">
            <!--{{'../assets/icons/icon-'+ subItem.icon +'.svg'}}-->
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.name }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <!--<v-icon>{{'../assets/icons/icon-'+ subItem.icon +'.svg'}}</v-icon>-->
              <v-icon>{{icon}}</v-icon>

            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <!-- 顶部工具条 -->
    <v-toolbar
      app
      dark
      :color="dark ? 'secondary' : 'primary'"
    >
      <!-- 隐藏左侧菜单的按钮-->
      <v-toolbar-side-icon @click.stop="drawer = !drawer"/>
      <!-- 收起左侧菜单的按钮-->
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"/>
      </v-btn>
      <!-- 切换黑暗主题 -->
      <v-flex xs1>
        <v-switch
          :label="dark ? '暗黑' : '明亮'"
          v-model="dark"
          color="dark"
          hide-details
        />
      </v-flex>
      <!-- 顶部导航标题 -->
      <v-flex xs3></v-flex>
      <v-toolbar-title v-text="title"/>
      <v-spacer/>

      <!-- 调色板 -->
      <v-btn icon @click.stop="dark = !dark">
        <v-icon>invert_colors</v-icon>
      </v-btn>
      <!-- 顶部导航用户菜单 -->
      <v-btn icon @click.stop="dark = !dark">
        <v-icon>account_box</v-icon>
      </v-btn>
    </v-toolbar>

    <!--中间内容主体-->
    <v-content>
      <v-breadcrumbs>
        <v-icon slot="divider">chevron_right</v-icon>
        <!--<v-breadcrumbs-item>{{item1}}</v-breadcrumbs-item>-->
        <!--<v-breadcrumbs-item>{{item2}}</v-breadcrumbs-item>-->
      </v-breadcrumbs>
      <div>

        <!--定义一个路由锚点，Layout的子组件内容将在这里展示-->
        <router-view/>
      </div>
    </v-content>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      icon: "../assets/icons/icon-role.svg",
      msg: 'Welcome to Your Vue.js App',
      dark: false,// 是否暗黑主题
      drawer: true,// 左侧导航是否隐藏
      miniVariant: false,// 左侧导航是否收起
      title: '后台管理',// 顶部导航条名称,
      items: [

      ],
      menus: [
        {
          action: "home",
          title: "首页",
          path:"/index",
          items: [{ title: "统计", path: "/dashboard" }]
        },
        {
          action: "apps",
          title: "商品管理",
          path:"/item",
          items: [
            { title: "分类管理", path: "/category" },
            { title: "品牌管理", path: "/brand" },
            { title: "商品列表", path: "/list" },
            { title: "规格参数", path: "/specification" }
          ]
        },
        {
          action: "people",
          title: "会员管理",
          path:"/user",
          items: [
            { title: "会员统计", path: "/statistics" },
            { title: "会员管理", path: "/list" }
          ]
        },
        {
          action: "attach_money",
          title: "销售管理",
          path:"/trade",
          items: [
            { title: "交易统计", path: "/statistics" },
            { title: "订单管理", path: "/order" },
            { title: "物流管理", path: "/logistics" },
            { title: "促销管理", path: "/promotion" }
          ]
        },
        {
          action: "settings",
          title: "权限管理",
          path:"/authority",
          items: [
            { title: "权限管理", path: "/list" },
            { title: "角色管理", path: "/role" },
            { title: "人员管理", path: "/member" }
          ]
        }
      ]
    }
  }
  ,created(){
    this.http.get("/sys/menu/nav")
      .then(res=>{
        this.items = res.data.data.menuList;
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
