import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from './lib/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.shades.corauxiliar, // #E53935
                secondary: colors.red.lighten4, // #FFCDD2
                accent: colors.shades.white, // #3F51B5
            },
        },
    },
});