import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cadastro: false,
    nome: '',
    usuario: [],
    enderecos: [],
    countId: 0,
  },
  mutations: {
    addUsuario(state, payload) {
      state.usuario[payload[0]] = payload[1];
    },
    addEnderecos(state, payload) {
      payload.id = state.countId;
      state.enderecos.push(payload);
      state.countId++;
    },
    editarEnderecos(state, payload){
      let index = state.enderecos.findIndex(endereco => endereco.id == payload.id);
      state.enderecos[index] = payload;
    },
    removeEnderecos(state, payload){
      let index = state.enderecos.findIndex(endereco => endereco.id == payload);
      state.enderecos.splice(index, 1);
    },
  },
  getters: {},
  actions: {},
  modules: {}
})