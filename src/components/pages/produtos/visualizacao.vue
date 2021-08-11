<template>
  <v-container fluid>
    <div class="mt-5 pt-5">
      <v-row>
        <v-col lg="2" class="px-2" v-for="(item, i) in 10" :key="i">
          <v-card elevation="0">
            <v-img v-if="i%2 == 0"
              src="../../../assets/images/baseRuby.jpeg"
              class="w-100"
              max-height="150"
              max-width="300"
            ></v-img>
            <v-img v-if="i%2 == 1"
              src="../../../assets/images/rimel.png"
              class="w-100"
              max-height="150"
              max-width="300"
            ></v-img>
            Dados da imagem
          </v-card>
          <!-- <v-expansion-panels elevation="0">
            <v-expansion-panel v-for="(item, i) in 5" :key="i">
              <v-expansion-panel-header> 
                <v-row>
                  <v-col>Infomação 1</v-col>  
                  <v-col>Infomação 2</v-col>  
                  <v-col>Infomação 3</v-col>  
                  <v-col>Infomação 4</v-col>  
                </v-row>  
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels> -->
        </v-col>
      </v-row>
    </div>
    <v-navigation-drawer
      v-model="drawer"
      flat prepend
       hide-overlay
      absolute
      temporary
      right
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title> <h4>Filtrar</h4> </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  name: "App",
  props: {
    drawer: Boolean,
  },
  components: {},
  data() {
    return {
    };
  },
};
</script>
