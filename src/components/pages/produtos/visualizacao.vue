<template>
  <!-- <p>Dentro de Visualização</p> -->
  <v-container fluid>
    <div class="mt-5 pt-5">
      <v-row>
        <v-col lg="12" class="px-0">
          <v-expansion-panels elevation="0">
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
          </v-expansion-panels>
        </v-col>
      </v-row>
    </div>
  </v-container>
  <!-- <div class="frames-content">
    <v-container fluid>
      <v-row>
        <v-col lg="2" md="12" sm="12" cols="12">
            
        </v-col>
      </v-row>
    </v-container>
  </div> -->
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
};
</script>
