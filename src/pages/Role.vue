<template>
  <v-app>
  <v-form v-model="valid">
    <v-container>
      <v-layout>
        <v-flex
          xs12
          md2
        >
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            label="角色名称搜索"
            required
          ></v-text-field>
        </v-flex>
        <v-btn color="primary">搜索</v-btn>
        <v-btn color="success">新增</v-btn>
        <v-btn color="error">批量删除</v-btn>
      </v-layout>
    </v-container>

  </v-form>
  </v-app>
</template>

<script>
    export default {
        name: "Role",
      data: () => ({
        valid: false,
        firstname: '',
        lastname: '',
        nameRules: [
          v => !!v || '角色名称是别填的'

        ]
      }),

      methods:{
         searchRole(){

         }
      }
    }
</script>

<style scoped>

</style>
