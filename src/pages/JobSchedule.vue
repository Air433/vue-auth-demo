<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-app>

    <v-btn color="success" @click="testCommon">测试全局方法</v-btn>

    <v-container fluid>
      <v-layout row wrap align-center>
        <v-flex xs12 sm6>
          <v-subheader v-text="'Multiple with persistent hint'"></v-subheader>
        </v-flex>
        <v-flex xs12 sm6>
          <v-select
            v-model="e6"
            :items="states"
            :menu-props="{ maxHeight: '400' }"
            label="Select"
            multiple
            hint="Pick your favorite states"
            persistent-hint
          ></v-select>
        </v-flex>

        <v-flex xs12 sm6>
          <v-subheader v-text="'Multiple (Chips) with persistent hint'"></v-subheader>
        </v-flex>

        <v-flex xs12 sm6>
          <v-select
            v-model="e7"
            :items="states"
            label="Select"
            multiple
            chips
            hint="What are the target regions"
            persistent-hint
          >
            <template v-slot:selection="{ item, index }">
              <v-chip>
                <span>{{ item }}-----</span>
              </v-chip>
            </template>

          </v-select>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-toolbar color="teal" dark>
              <v-toolbar-side-icon></v-toolbar-side-icon>

              <v-toolbar-title>Topics</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
            </v-toolbar>

            <v-list>
              <v-list-group
                v-for="item in tableList"
                :key="item.name"
                no-action
              >
                <template v-slot:activator>
                  <!--<v-list-tile>-->
                    <!--<v-list-tile-content>-->
                      <!--<v-list-tile-title>{{ item.title }}===</v-list-tile-title>-->
                    <!--</v-list-tile-content>-->
                  <!--</v-list-tile>-->

                  <v-data-table
                    :headers="headers"
                    :items="item.items"
                    hide-actions
                    hide-headers
                  >
                    <template v-slot:items="props">
                      <td>{{ props.item.name }}</td>
                      <td class="text-xs-right">{{ props.item.calories }}</td>
                      <td class="text-xs-right">{{ props.item.fat }}</td>
                      <td class="text-xs-right">{{ props.item.carbs }}</td>
                      <td class="text-xs-right">{{ props.item.protein }}</td>
                      <td class="text-xs-right">{{ props.item.iron }}</td>
                    </template>
                  </v-data-table>
                </template>


                <v-list-tile
                  v-for="subItem in item.items"
                  :key="subItem.name"
                  @click=""
                >
                  <!--<v-list-tile-content>-->
                    <!--<v-list-tile-title>{{ subItem.name }}[][][]]</v-list-tile-title>-->
                  <!--</v-list-tile-content>-->

                  <!--<v-list-tile-acteion>-->
                    <!--<v-icon>{{ subItem.action }}</v-icon>-->
                  <!--</v-list-tile-action>-->

                  <v-data-table
                    :headers="headers"
                    :items="subItem"
                    hide-actions
                    hide-headers
                  >
                    <template v-slot:items="props">
                      <td>{{ props.item.name }}</td>
                      <td class="text-xs-right">{{ props.item.calories }}</td>
                      <td class="text-xs-right">{{ props.item.fat }}</td>
                      <td class="text-xs-right">{{ props.item.carbs }}</td>
                      <td class="text-xs-right">{{ props.item.protein }}</td>
                      <td class="text-xs-right">{{ props.item.iron }}</td>
                    </template>
                  </v-data-table>
                </v-list-tile>


              </v-list-group>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>


    <v-data-table
      :headers="headers"
      :items="tableList"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.calories }}</td>
        <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.carbs }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td>
        <td class="text-xs-right">{{ props.item.iron }}</td>
      </template>
    </v-data-table>

  </v-app>
</template>

<script>
  export default {
    name: "JobSchedule",
    data: () => ({
      e6: [],
      e7: [],
      states: [
        'Alabama', 'Alaska', 'American Samoa', 'Arizona',
        'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'District of Columbia', 'Federated States of Micronesia',
        'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada',
        'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
        'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
        'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
      items: [
        {
          action: 'local_activity',
          title: 'Attractions',
          items: [
            {title: 'List Item'}
          ]
        },
        {
          action: 'restaurant',
          title: 'Dining',
          active: true,
          items: [
            {title: 'Breakfast & brunch'},
            {title: 'New American'},
            {title: 'Sushi'}
          ]
        },
        {
          action: 'school',
          title: 'Education',
          items: [
            {title: 'List Item'}
          ]
        },
        {
          action: 'directions_run',
          title: 'Family',
          items: [
            {title: 'List Item'}
          ]
        },
        {
          action: 'healing',
          title: 'Health',
          items: [
            {title: 'List Item'}
          ]
        },
        {
          action: 'content_cut',
          title: 'Office',
          items: [
            {title: 'List Item'}
          ]
        },
        {
          action: 'local_offer',
          title: 'Promotions',
          items: [
            {title: 'List Item'}
          ]
        }
      ],


      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {text: 'Calories', value: 'calories'},
        {text: 'Fat (g)', value: 'fat'},
        {text: 'Carbs (g)', value: 'carbs'},
        {text: 'Protein (g)', value: 'protein'},
        {text: 'Iron (%)', value: 'iron'}
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        }
      ],

      tableList: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
          items: [
            {
            name: '二人台',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%'
          },
            {
              name: '二人台---- ',
              calories: 159,
              fat: 6.0,
              carbs: 24,
              protein: 4.0,
              iron: '1%'
            }
          ]
        },
        {
          name: 'Frozen Yogurt222',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
          items: [
            {
              name: '二人台22',
              calories: 159,
              fat: 6.0,
              carbs: 24,
              protein: 4.0,
              iron: '1%'
            }
          ]
        },
        {
          name: 'Frozen Yogurt333',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
          items: [
            {
              name: '二人台333',
              calories: 159,
              fat: 6.0,
              carbs: 24,
              protein: 4.0,
              iron: '1%'
            }
          ]
        }
      ],


    }),
    methods: {
      testCommon(){
        // alert(123);
        this.$Util.alertMst('abc');
      }
    }
  }
</script>

<style scoped>

</style>
