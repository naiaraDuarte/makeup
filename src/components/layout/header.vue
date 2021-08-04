<template>
  <div>
    <div class="row">
      <div class="col-12">
        <v-app-bar app color="primary" dark>
          <div class="d-flex align-center">
            <h2>Makeup</h2>
          </div>

          <v-spacer></v-spacer>

          <v-btn
            href="https://github.com/vuetifyjs/vuetify/releases/latest"
            target="_blank"
            text
          >
            <span class="mr-2">Latest Release</span>
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
        </v-app-bar>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="barraDourada">aaa</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.barraDourada {
  width: 100%;
  height: 3rem;
  background-image: linear-gradient(to left , #ab8632 ,#dba322, #b68e26);
}
</style>