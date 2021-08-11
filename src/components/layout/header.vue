<template>
  <div>
    <v-app-bar app clipped-left dark height="auto" class="navbar" color="black">
      <v-row class="my-1">
        <v-col lg="2">
          <img
            class="ml-5 pl-5"
            :src="require('../../assets/images/logocortado.png')"
            height="43"
          />
        </v-col>
        <v-col lg="8">
          <v-row>
            <v-col lg="8"></v-col>
            <v-col lg="4">
              <v-text-field
                outlined
                dense
                label="O que você está procurando?"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col lg="2">
          <v-row class="w-100" style="max-width: 100%">
            <v-col lg="6" class="text-center">
              <p class="mb-0">Bem vindo :)</p>
              <v-btn
                class="white--text btnLink"
                @click="$router.push(`/usuario`)"
                target="_blank"
                text
              >
                <span>Entre ou cadastre-se</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-app-bar>
  </div>
</template>
<style scoped>
.barraDourada {
  width: 100%;
  height: 3rem;
  background-image: linear-gradient(to left, #ab8632, #dba322, #b68e26);
}
.btnLink {
  text-transform: initial;
  text-decoration: lightcoral !important;
  font-family: "PT Sans", sans-serif !important;
}

.v-btn:not(.v-btn--round).v-size--default{
  padding: 0;
}
.v-btn.v-size--default {
    font-size: 0.999rem;
}
@media (min-width: 1264px) {
  .col-lg-6 {
    flex: 0 0 50%;
    max-width: 100%;
  }
}
</style>