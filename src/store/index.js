import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cadastro: false,
        perfil: "usuario",
        nome: '',
        usuario: [{
            perfil: "adm",
            email: "adm@gmail.com",
            senha: "123456"
        }],
        enderecos: [],
        countId: 0,
        cartoes: []
    },
    mutations: {
        addUsuario(state, payload) {
            state.usuario.push(payload);
        },
        addEnderecos(state, payload) {
            payload.id = state.countId;
            state.enderecos.push(payload);
            state.countId++;
        },
        editarEnderecos(state, payload) {
            let index = state.enderecos.findIndex(endereco => endereco.id == payload.id);
            state.enderecos[index] = payload;
        },
        removeEnderecos(state, payload) {
            let index = state.enderecos.findIndex(endereco => endereco.id == payload);
            state.enderecos.splice(index, 1);
        },
        addCartao(state, payload) {
            payload.id = state.countId;
            state.cartoes.push(payload);
            state.countId++;
            console.log("salvou", state.cartoes)
        },
        editarCartao(state, payload) {
            let index = state.cartao.findIndex(cartao => cartao.id == payload.id);
            state.cartoes[index] = payload;
        },
        removeCartao(state, payload) {
            let index = state.cartoes.findIndex(cartao => cartao.id == payload);
            state.cartoes.splice(index, 1);
        },
    },
    getters: {},
    actions: {},
    modules: {},


})