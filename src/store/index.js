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
        carrinho: [],
        carrinhoCountId: 0,
        cartoes: [],
        produtos: []
    },
    mutations: {
        addUsuario(state, payload) {
            state.usuario.push(payload);
        },
        editarInformacoesCliente(state, payload){
            state.usuario[1] = payload;
            console.log("Deu certooooo", state.usuario[1])
        },
        editarEmailUsuario(state, payload){
            state.usuario[1].email = payload;
        },
        editarSenhaUsuario(state, payload){
            state.usuario[1].senha = payload;
        },
        addEnderecos(state, payload) {
            // payload.id = state.countId;
            console.log("Chegou aqui", payload)
            state.enderecos.push(payload);
            console.log("Chegou aqui", state.enderecos)
            // state.countId++;
        },
        addEnderecosDadosDoBanco(state, payload) {
            state.enderecos = [];
            state.enderecos.push(payload);
        },
        editarEnderecos(state, payload) {
            console.log("PAYLOAD", payload, state.enderecos)
            let index = state.enderecos.findIndex(endereco => endereco.id == payload.id);
            state.enderecos[index] = payload;
            console.log("INDEX", state.enderecos[index]);
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
            let index = state.cartoes.findIndex(cartao => cartao.id == payload.id);
            state.cartoes[index] = payload;
        },
        removeCartao(state, payload) {
            let index = state.cartoes.findIndex(cartao => cartao.id == payload);
            state.cartoes.splice(index, 1);
        },
        addProduto(state, payload) {
            payload.id = state.countId;
            state.produtos.push(payload);
            state.countId++;
            console.log("cadastrou produto");
        },
        editarProduto(state, payload) {
            let index = state.produto.findIndex(produto => produto.id == payload.id);
            state.produtos[index] = payload;
        },
        removeProduto(state, payload) {
            let index = state.addProduto.findIndex(produto => produto.id == payload);
            state.produtos.splice(index, 1);
        },
        addCarrinho(state, payload){
            payload.id = state.carrinhoCountId;
            state.carrinho.push(payload);
            state.carrinhoCountId++;
            console.log("Add no carrinho");
        }

    },
    getters: {},
    actions: {},
    modules: {},


})