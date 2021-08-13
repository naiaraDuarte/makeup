import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      cadastro: false,
      nome: '',
      usuario: [],
    },
    mutations: {
      addOptionNewspaper(state, payload) {
        if(payload.length == 2 && typeof payload[1] != 'undefined'){
          
          state.beforeValue = payload[1];
          
          payload[0] == "newspaper" ? state.newspaper = payload[1].id : state.newspaper;
          state.checkValue = payload[0];
  
          
          state.newspaperFormatte[payload[0]] = payload[1];
        }
      },
      addFormatsObject(state, payload) {
        state.beforeValueFormatsObject = payload;
        state.formatsObject = payload;
      },
      updateVariationsFormatsObject(state, payload) {
        state.variationsFormats = payload;
        state.formatsObject.variations = payload;
      },
      addLocalStorage(state, payload){
        localStorage.setItem(payload[0], payload[1]);
      }
    },
    getters: {},
    actions: {},
    modules: {}
  })
  