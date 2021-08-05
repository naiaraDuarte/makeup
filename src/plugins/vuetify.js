import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#000',
    success: '#3cd1c2',
    info: '#ffaa2c',
    error: '#f83e70'
  }
})



// Vue.use(Vuetify);

// export default new Vuetify({
//     theme: {
//         themes: {
//             light: {
//                 primary: colors.shades.black, // #E53935
//                 secondary: colors.red.lighten4, // #FFCDD2
//                 accent: colors.shades.white, // #3F51B5
//             },
//         },
//     },
// });