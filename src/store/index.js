import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cadastro: false,
    nome: '',
    usuario: [],
    enderecos: [],
  },
  mutations: {
    addUsuario(state, payload) {
      state.usuario[payload[0]] = payload[1];
    },
    addEnderecos(state, payload) {
      state.enderecos.push(payload);
      console.log(state.enderecos)
    },
    addFormatsObject(state, payload) {
      state.beforeValueFormatsObject = payload;
      state.formatsObject = payload;
    },
    updateVariationsFormatsObject(state, payload) {
      state.variationsFormats = payload;
      state.formatsObject.variations = payload;
    },
    addLocalStorage(state, payload) {
      localStorage.setItem(payload[0], payload[1]);
    }
  },
  getters: {},
  actions: {},
  modules: {}
})