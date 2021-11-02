<template>
  <v-card
    class="carrinho text-center"
    :class="[$store.state.carrinho.length == 0 ? 'centraliza' : '']"
    height="500"
    width="300"
  >
    <p class="tituloModalCarrinho mt-2" v-if="$store.state.carrinho.length > 0">
      Produtos escolhidos
    </p>
    <v-divider
      class="px-10 mx-10 mt-1"
      v-if="$store.state.carrinho.length > 0"
    ></v-divider>
    <p class="tituloModalCarrinho corTitulo pl-3 mt-2" v-else>
      Você ainda não adicionou nenhum produto, mas assim que adicionar, ele
      aparecerá aqui, viu?
    </p>

    <v-row>
      <v-col lg="12" class="mt-3">
        <v-card elevation="0" class="px-2 prod">
          <v-row v-for="(item, i) in $store.state.carrinho" :key="i">
            <v-col>
              <p v-if="item.qtd != 0">{{ item.nome }}</p>
              <v-row v-if="item.qtd != 0" class="mt-1">
                <v-col lg="4">
                  <p>{{ $n(parseFloat(item.preco), "currency") }}</p>
                </v-col>
                <v-col lg="8">
                  <v-row>
                    <v-col col="1">
                      <v-btn
                        icon
                        small
                        elevation="1"
                        id="menos"
                        @click="atualizarCarrinho(item, 'sub')"
                      >
                        <v-icon> mdi-minus </v-icon>
                      </v-btn>
                    </v-col>
                    <v-col col="4">
                      <p>{{ item.qtd }}</p>
                    </v-col>
                    <v-col col="1">
                      <v-btn
                        icon
                        small
                        elevation="1"
                        id="mais"
                        @click="atualizarCarrinho(item, 'add')"
                      >
                        <v-icon> mdi-plus </v-icon>
                      </v-btn>
                    </v-col>
                    <v-col col="2">
                      <v-btn icon small elevation="0" @click="removeItem(item)">
                        <v-icon> mdi-close </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="px-2" v-if="$store.state.carrinho.length > 0">
      <v-col>
        <v-btn
          color="#b38b57"
          class="white--text btn-total"
          @click="redireciona"
        >
          Ver meu carrinho ({{ $n(parseFloat(total), "currency") }})
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: ["total"],
  data() {
    return {
      textField: "",
      show: true,
      fav: true,
      menu: false,
      message: false,
      hints: true,
    };
  },
  computed: {
    messages() {
      return this.$store.state.carrinho.length;
    },
  },
  watch: {
    textField(newVal) {
      this.$store.state.busca = newVal;
    },
  },
  methods: {
    redireciona() {
      this.$router.push(`/carrinho`);
    },
  },
};
</script>