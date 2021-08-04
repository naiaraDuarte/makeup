<template>
  <v-app>
    <v-card color="grey lighten-4" flat tile>
      <v-toolbar dense app class="black white--text px-5">
        <v-app-bar-nav-icon class="white--text" @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title class="titulo">Title</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon class="white--text">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon class="white--text" >
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </v-toolbar>

      <v-navigation-drawer app v-model="drawer" class="black" temporary>
        <v-layout mt-4 column align-center>
          <v-flex>
            <v-avatar>
              <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
            </v-avatar>
          </v-flex>
          <v-flex>
            <p class="white--text mt-3 headline">Joana</p>
          </v-flex>
        </v-layout>
        <!-- <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6 white--text">
              Application
            </v-list-item-title>
            <v-list-item-subtitle class="white--text">
              subtext
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item> -->

        <v-divider></v-divider>

        <v-list dense nav>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon class="white--text">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="white--text">{{
                item.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </v-app>
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
};
</script>
<style>
.titulo {
  color: #fdb931;
}
</style>