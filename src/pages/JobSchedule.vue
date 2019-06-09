<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-app>
    <v-select
      v-model="value"
      :items="items"
      label="Select Item"
      multiple
    >
      <template v-slot:selection="{ item, index }">
        <v-chip v-if="index === 0">
          <span>{{ item }}</span>
        </v-chip>
        <span
          v-if="index === 1"
          class="grey--text caption"
        >(+{{ value.length - 1 }} others)</span>
      </template>
    </v-select>

  </v-app>
</template>

<script>
  export default {
    name: "JobSchedule",
    data: () => ({
      items: ['foo', 'bar', 'fizz', 'buzz', 'fizzbuzz', 'foobar'],
      value: ['foo', 'bar', 'fizz']
    })
  }
</script>

<style scoped>

</style>
