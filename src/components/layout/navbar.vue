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

    
      <v-navigation-drawer app v-model="drawer" class="black"
        permanent flat prepend
        expand-on-hover clipped hide-overlay :style="{ top: $vuetify.application.top + 'px', zIndex: 6 }"
      >
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
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

        <v-list
          nav
          dense
        >
          <v-list-item link>
            <v-list-item-icon>
              <v-icon class="title">mdi-folder</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">My Files</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon class="title">mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">Shared with me</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon class="title">mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">Starred</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    <v-app-bar app clipped-left dark class="navbar" color="black"> <img
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
  components: {
  }
};
</script>