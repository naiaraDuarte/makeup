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
        listaProdutos: [],
        carrinhoCountId: 0,
        cartoes: [],
        produtos: [],
        cupons: [],
        dadosEndereco: [],
        dadosCartao: [],
        busca: "",
        concluir: false,
        cartoesEscolhidos: [],
        valeTroca: [],
        enderecoDeEntrega: '',
        cupomUtilizado: {
            porcen: 0,
        },
        freteCalculado: '',
        pedidos: [],
        trocaDeComponentesAdm: 0,
    },
    mutations: {

        //Usuário
        addUsuario(state, payload) {
            state.usuario.push(payload);
        },
        editarInformacoesCliente(state, payload) {
            state.usuario[1] = payload;
        },
        editarEmailUsuario(state, payload) {
            state.usuario[1].email = payload;
        },
        editarSenhaUsuario(state, payload) {
            state.usuario[1].senha = payload;
        },
        addEnderecos(state, payload) {
            if (!localStorage.getItem("usuarioId")) {
                payload.id = state.countId;
                state.enderecos.push(payload);
                state.countId++;
            } else {
                state.enderecos.push(payload);
            }
        },

        //Endereco
        addEnderecosDadosDoBanco(state, payload) {
            state.enderecos = [];
            state.enderecos.push(payload);
        },
        editarEnderecos(state, payload) {
            let index = state.enderecos.findIndex(endereco => endereco.id == payload.id);
            Vue.set(state.enderecos, index, payload);
        },
        removeEnderecos(state, payload) {
            let index = state.enderecos.findIndex(endereco => endereco.id == payload);
            state.enderecos.splice(index, 1);
        },

        //Cartão
        addCartao(state, payload) {
            state.cartoes.push(payload);
        },
        editarCartao(state, payload) {
            let index = state.cartoes.findIndex(cartao => cartao.id == payload.id);
            Vue.set(state.cartoes, index, payload);
        },
        removeCartao(state, payload) {
            let index = state.cartoes.findIndex(cartao => cartao.id == payload);
            state.cartoes.splice(index, 1);
        },

        //Gestao de cupons
        addCupons(state, payload) {
            state.cupons.push(payload);
        },
        editarCupons(state, payload) {
            let index = state.cupons.findIndex(cupons => cupons.cod == payload.cod);
            Vue.set(state.cupons, index, payload);
        },
        removeCupons(state, payload) {
            let index = state.cupons.findIndex(cupons => cupons.cod == payload);
            state.cupons.splice(index, 1);
        },

        //Produto
        addProduto(state, payload) {
            payload.id = state.countId;
            state.produtos.push(payload);
            state.countId++;
        },
        editarProduto(state, payload) {
            let index = state.produto.findIndex(produto => produto.id == payload.id);
            state.produtos[index] = payload;
        },
        removeProduto(state, payload) {
            let index = state.addProduto.findIndex(produto => produto.id == payload);
            state.produtos.splice(index, 1);
        },

        //Carrinho
        addCarrinho(state, payload) {
            payload.id = state.carrinhoCountId;
            state.carrinho.push(payload);
            state.carrinhoCountId++;
        },
        editarCarrinho(state, payload) {
            let index = state.carrinho.findIndex(pdt => pdt.cod == payload.cod);
            state.carrinho[index] = payload;
        },
        removeItemCarrinho(state, payload) {
            let index = state.carrinho.findIndex(pdt => pdt.cod == payload.cod);
            state.produtos.splice(index, 1);
            console.log(state.produtos)
        },

        //Pedidos
        addPedido(state, payload) {
            payload.id = state.countId;
            state.pedidos.push(payload);
            state.countId++;
        },
        editaParaTroca(state, payload){
            let index = state.pedidos.findIndex(pdt => pdt.id == payload[0].id);
            let indexPedido = state.pedidos[index].carrinho.findIndex(item => item.id == payload[1]);
            console.log("IIIIIIIIIIIIIII", state.produtos)
            state.pedidos[index].carrinho.splice(indexPedido, 1);

        },
        editarPedido(state, payload) {
            let index = state.pedidos.findIndex(pdt => pdt.id == payload[0]);
            state.pedidos[index].status = payload[1];
            Vue.set(state.pedidos, index, state.pedidos[index]);
        },
        removeItemPedido(state, payload) {
            let index = state.pedidos.findIndex(prod => prod.id == payload.id);
            state.pedidos.splice(index, 1);
            console.log(state.pedidos)
        },

    },
    getters: {},
    actions: {},
    modules: {},


})