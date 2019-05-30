<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-app>
    <v-card>
      <v-container>
        <v-layout>
          <v-btn color="success" @click="addMenu">新增</v-btn>
        </v-layout>
      </v-container>
      <v-data-table
        :headers="headers"
        :loading="loading"
        :items="menus">

        <template slot="items" slot-scope="props">
          <tr>
            <td class="text-xs-center">{{ props.item.menuId }}</td>
            <td class="text-xs-center">{{ props.item.menuName }}</td>
            <td class="text-xs-center">{{ props.item.parentName }}</td>
            <td class="text-xs-center">{{ props.item.typeName }}</td>
            <td class="text-xs-center">{{ props.item.orderNum }}</td>
            <td class="text-xs-center">{{ props.item.url }}</td>
            <td class="text-xs-center">{{ props.item.perms }}</td>
            <td class="text-xs-center"><v-btn color="cyan" @click="">修改</v-btn><v-btn color="red" @click="">删除</v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-app>
</template>

<script>
    export default {
      name: "Menu",
      data: () => ({
        headers:[
          {
            text: 'ID',
            align: 'center',
            value: 'role_id',
            width:'10px'
          },
          { text: '名称', align: 'center', value: 'menu_name', width:'150px' },
          { text: '上级菜单', align: 'center', value: 'parent_name', width:'200px' },
          { text: '类型', align: 'center', value: 'type_name', width:'50px' },
          { text: '排序号', align: 'center', value: 'order_num', width:'50px' },
          { text: '菜单URL', align: 'center', value: 'url', width:'50px' },
          { text: '授权表示', align: 'center', value: 'perms', width:'50px' },
          { text: '操作', width:'10px',align: 'center' }
        ],
        loading: true, // 是否在加载中
        menus:[
          {
            menuId: '33',
            menuName: '系统管理',
            parentName:'',
            typeName: '目录',
            orderNum: 2,
            url: 'sys/user',
            perms: 'add:user'
          },
          {
            menuId: '66',
            menuName: '管理员列表',
            parentName:'系统管理',
            typeName:'菜单',
            orderNum: 2,
            url: 'sys/user',
            perms: 'add:user'
          }
        ]
      }),
      methods:{
          addMenu(){
            alert(1);
          }
      }
    }
</script>

<style scoped>

</style>
