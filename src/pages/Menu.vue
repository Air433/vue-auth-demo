<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-app>
    <v-layout row wrap>
    <v-flex xs6>
      <v-card  color="success">
        <v-card-text class="px-0">6</v-card-text>
      </v-card>
    </v-flex>
      <v-flex xs6>
        <v-card  color="success">
          <v-card-text class="px-0">6</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
    export default {
      name: "Menu",
      data: () => ({

      })
    }
</script>

<style scoped>

</style>
