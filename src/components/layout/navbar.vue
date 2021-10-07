<template>
  <div>
    <v-card color="grey lighten-4" flat tile>
      <!-- <v-toolbar dense app class="black white--text px-5">
        <v-app-bar-nav-icon class="white--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="titulo">Title</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon class="white--text">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon class="white--text" >
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </v-toolbar> -->

      <v-navigation-drawer
        app
        v-model="drawer"
        class="black"
        permanent
        flat
        prepend
        expand-on-hover
        clipped
        hide-overlay
        :style="{ top: $vuetify.application.top + 'px', zIndex: 6 }"
      >
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img
                src="https://randomuser.me/api/portraits/women/85.jpg"
              ></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Sandra Adams
              </v-list-item-title>
              <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list nav dense>
          <v-list-item link @click="troca(0)">
            <v-list-item-icon>
              <v-icon class="title">mdi-chart-bar</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">Dashboard</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="troca(1)">
            <v-list-item-icon>
              <v-icon class="title">mdi-account-group</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">Clientes</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="troca(2)">
            <v-list-item-icon>
              <v-icon class="title">mdi-package-variant-closed</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">Pedidos</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="troca(3)">
            <v-list-item-icon>
              <v-icon class="title">mdi-ticket-percent-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">Cupons</v-list-item-title>
          </v-list-item>
           <v-list-item link @click="troca(4)">
            <v-list-item-icon>
              <v-icon class="title">mdi-ticket-percent-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">Produtos</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="troca(5)">
            <v-list-item-icon>
              <v-icon class="title">mdi-exit-to-app</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">Sair</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar app clipped-left dark class="navbar" color="black">
        <img
          class="ml-5 pl-5"
          :src="require('../../assets/images/logocortado.png')"
          height="43"
        />
      </v-app-bar>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Photos", icon: "mdi-image" },
        { title: "About", icon: "mdi-help-box" },
      ],
      right: null,
    };
  },
  components: {},
  methods: {
    troca(val) {
      if (val == 5) {
        this.$store.state.perfil = "usuario";
        this.$store.state.trocaDeComponentesAdm = 0;
        this.$router.push(`/`);
      } else {
        this.$store.state.trocaDeComponentesAdm = val;
      }
    },
  },
};
</script>