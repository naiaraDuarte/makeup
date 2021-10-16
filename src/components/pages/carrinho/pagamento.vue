<template>
  <v-container fluid>
    <v-card class="px-3" elevation="0">
      <v-row>
        <v-col lg="6">
          <p class="mb-3 tituloModalCarrinho">
            <v-icon class="pb-1" large>mdi-chevron-double-right</v-icon
            >Pagamento
          </p>
          <v-divider class="mb-8"></v-divider>
          <v-card elevation="0" class="mt-3">
            <h4 class="alinhamentoTitulo">
              <p>
                <v-icon>mdi-credit-card-plus-outline</v-icon> Cartão de crédito
              </p>
              <v-btn
                elevation="0"
                text
                v-if="mostrarCartao == false"
                class="btnSubmit pb-3"
                @click="mostrarCartao = true"
                ><v-icon left> mdi-plus </v-icon> add cartão</v-btn
              >
            </h4>
            <p v-show="mostrarCartao == false">
              Selecione os cartões que deseja pagar
            </p>
            <v-row
              v-if="$store.state.cartoes.length > 0"
              v-show="mostrarCartao == false"
            >
              <v-col
                lg="6"
                class="pl-0"
                v-for="(item, i) in this.$store.state.cartoes"
                :key="i"
              >
                <v-card elevation="0">
                  <div @click="selecionaCartao(item.id)">
                    <cartao
                      :class="[
                        item.selecionado == true ? 'marcado' : 'desmarcado',
                      ]"
                      :nome="item.nome"
                      :numero="item.numero"
                      :data="item.data_validade"
                      :id="i"
                    ></cartao>
                  </div>
                  <div v-if="item.selecionado == true">
                    <v-text-field
                      v-if="verificaExistenciaCartao(item) == false"
                      @blur="salvaValor(item.id, $event.target.value)"
                      label="Valor a pagar neste cartão"
                      class="cupom-input"
                      v-mask="['R$#,##', 'R$##,##', 'R$###,##', 'R$####,##']"
                      id="cupom"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-if="verificaExistenciaCartao(item) == true"
                      :disabled="true"
                      v-model="restante"
                      label="Valor a pagar neste cartão"
                      class="cupom-input"
                      id="cupom"
                      required
                    ></v-text-field>
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col>
                <p>Você ainda não possui cartões cadastrados</p>
              </v-col>
            </v-row>
            <v-row v-if="mostrarCartao == true">
              <v-col lg="12" class="alinhamento">
                <v-btn
                  elevation="1"
                  icon
                  id="ir"
                  v-if="mostrarCartao == true"
                  @click="mostrarCartao = false"
                  ><v-icon>mdi-close</v-icon></v-btn
                ></v-col
              >
              <v-col lg="12">
                <addCartao :mostra="false"></addCartao>
              </v-col>
            </v-row>
            <v-row>
              <v-col lg="12">
                <h4><v-icon>mdi-ticket-percent-outline</v-icon> Cupom</h4>
                <p>Você tem um cupom? Desejo usá-lo agora</p>
                <v-row>
                  <v-col lg="10">
                    <v-text-field
                      v-model="cupom"
                      label="Cupom"
                      :disabled="cupomUtilizado == true"
                      class="cupom-input"
                      id="cupom"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col lg="2">
                    <v-btn
                      color="primary"
                      v-if="cupomUtilizado == false"
                      @click="usarCupom"
                      >Utilizar</v-btn
                    >
                    <v-btn
                      color="primary"
                      v-if="cupomUtilizado == true"
                      @click="removerCupom"
                      >Remover</v-btn
                    >
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col lg="12" class="alinhamento" v-show="mostrarEndereco">
                <v-btn
                  elevation="1"
                  icon
                  v-if="mostrarEndereco == true"
                  @click="mostrarEndereco = false"
                  ><v-icon>mdi-close</v-icon></v-btn
                >
              </v-col>
              <v-col lg="12" v-show="mostrarEndereco">
                <endereco :mostra="false"></endereco>
              </v-col>
              <v-col lg="12" v-show="mostrarEndereco == false">
                <h4 class="alinhamentoTitulo">
                  <p>
                    <v-icon>mdi-map-marker-radius-outline</v-icon> Endereço de
                    entrega
                  </p>
                  <v-btn
                    elevation="0"
                    text
                    v-if="mostrarEndereco == false"
                    class="btnSubmit pb-3"
                    @click="mostrarEndereco = true"
                    ><v-icon left> mdi-plus </v-icon> Add endereco</v-btn
                  >
                </h4>
                <p>Selecione o endereço de entrega do seus produtos</p>
                <v-row
                  class="mt-3"
                  v-for="(item, i) in $store.state.enderecos"
                  :key="i"
                >
                  <v-col
                    lg="6"
                    v-if="
                      item.tipo_endereco == 'Entrega' ||
                      item.tipo_endereco == 'Cobrança e Entrega'
                    "
                  >
                    <v-card
                      elevation="0"
                      class="card-endereco p-2"
                      :class="[
                        enderecoEntrega == item.id ? 'marcado' : 'desmarcado',
                      ]"
                      @click="enderecoEntrega = item.id"
                    >
                      <v-row>
                        <v-col lg="12" class="centraliza">
                          <h4>{{ item.nome }}</h4>
                        </v-col>
                        <v-col lg="6" class="p-0 centraliza">
                          <p>{{ item.cep }}</p>
                        </v-col>
                        <v-col lg="6" class="p-0 centraliza">
                          <p>N° {{ item.numero }}</p>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col lg="1"></v-col>
        <v-divider vertical></v-divider>
        <v-col lg="5" class="pl-5">
          <resumoPedido
            :frete="frete"
            :cashback="cashback.valor"
            :desconto="desconto"
            :tipoDesconto="$store.state.cupomUtilizado.tipo"
            :habilitaBotao="habilitaBotao"
            @total="totalProdutos = $event"
            pag="pagamento"
          ></resumoPedido>
        </v-col>
      </v-row>
    </v-card>
    <v-snackbar v-model="snackbar" :color="snackbarColor">
      <h4 style="font-weight: 100">{{ mensagem }}</h4>
      <template v-slot:action="{ attrs }">
        <v-btn text icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>
import addCartao from "../usuario/pagamento.vue";
import cartao from "../../ui/cartao.vue";
import resumoPedido from "../carrinho/resumoPedido.vue";
import endereco from "../usuario/endereco.vue";
import { mapMutations } from "vuex";

export default {
  components: { addCartao, cartao, resumoPedido, endereco },
  data() {
    return {
      cartoes: "",
      cupom: "",
      cupomUtilizado: false,
      enderecoEntrega: "",
      pagConfirmacao: false,
      mostrarCartao: false,
      mostrarEndereco: false,
      marcados: [],
      totalProdutos: 0,
      frete: "0",
      snackbarColor: "",
      mensagem: "",
      restante: 0,
      snackbar: false,
      cashback: {
        valor: 0,
      },
      itensDivisoes: [
        "Pagar com 1 cartão",
        "Pagar com 2 cartões",
        "Pagar com 3 cartões",
      ],
    };
  },
  activated() {},
  mounted() {
    if (this.$store.state.carrinho.length > 0) {
      this.restante = this.$n(this.totalProdutos, "currency");
    }
    this.$http
      .get(`/cashback/${localStorage.getItem("usuarioId")}`)
      .then((res) => {
        this.cashback = res.data.cashback[0];
      });
  },
  watch: {
    enderecoEntrega(newVal) {
      this.$store.state.enderecos.filter((endereco) => {
        if (newVal == endereco.id) {
          this.calculaFrete(endereco.cep);
        }
      });
      this.$store.state.enderecos.filter((endereco) => {
        if (endereco.id == newVal) {
          this.$store.state.enderecoDeEntrega = endereco;
        }
      });
    },
    totalProdutos() {
      this.restante = this.$n(this.totalProdutos, "currency");
    },
  },
  computed: {
    habilitaBotao() {
      if (this.frete != "0" && this.marcados.length > 0) {
        this.salvaValorRestante();
        return true;
      } else if (this.frete != "0" && this.totalProdutos == 0) {
        this.salvaValorRestante();
        return true;
      }
      return false;
    },
    desconto() {
      let frete = parseFloat(this.frete);
      let total = 0;
      let porcen = this.$store.state.cupomUtilizado.porcen;
      if (this.$store.state.carrinho.length > 0) {
        this.$store.state.carrinho.forEach((item) => {
          total += item.qtd * item.preco;
        });
      }
      if (this.$store.state.cupomUtilizado.tipo == "frete") {
        return frete * (porcen / 100);
      } else {
        return total * (porcen / 100);
      }
    },
  },
  methods: {
    ...mapMutations(["editarCupons"]),
    ...mapMutations(["removeCupons"]),
    ...mapMutations(["editarCartao"]),
    selecionaCartao(id) {
      this.$store.state.cartoesEscolhidos = [];
      let index = this.marcados.findIndex((item) => item.id == id);
      let ref = this.$store.state.cartoes.findIndex((item) => item.id == id);
      let restante = this.restante;
      restante = restante.replace("R$", "");
      restante = restante.replace(",", ".");
      if (index == -1) {
        this.$store.state.cartoes.filter((cartao) => {
          if (cartao.id == id) {
            cartao.selecionado = true;
            if (ref == this.$store.state.cartoes.length - 1) {
              cartao.valor = 0;
            } else {
              cartao.valor = parseFloat(restante);
            }
            this.marcados.push(cartao);
            this.editarCartao(cartao);
          }
        });
      } else {
        this.$store.state.cartoes.filter((cartao) => {
          if (cartao.id == id) {
            cartao.selecionado = false;
            cartao.valor = 0;
            this.editarCartao(cartao);
          }
        });
        this.marcados.splice(index, 1);
      }
      this.$store.state.cartoesEscolhidos = this.marcados;
      console.log(this.$store.state.cartoesEscolhidos, "|||||", this.marcados);
    },
    salvaValor(id, val) {
      console.log("OOOOOOOOOOOOOOOOOOOOOOOO");
      let index = this.marcados.findIndex((item) => item.id == id);
      this.marcados.filter((item) => {
        if (item.id == id) {
          item.valor = this.restante;
          this.marcados[index] = item;
          this.$store.state.cartoesEscolhidos = this.marcados;
        }
      });

      val = val.replace("R$", "");
      val = val.replace(",", ".");
      this.restante = this.$n(this.totalProdutos - parseFloat(val), "currency");
      console.log("AAAAAAAAAAAAAAa", this.$store.state.cartoesEscolhidos);
    },
    salvaValorRestante() {
      let id =
        this.$store.state.cartoes[this.$store.state.cartoes.length - 1].id;
      let index = this.$store.state.cartoesEscolhidos.findIndex(
        (item) => item.id == id
      );
      this.$store.state.cartoesEscolhidos.filter((item) => {
        if (item.id == id) {
          item.valor = this.restante;
          this.$store.state.cartoesEscolhidos[index] = item;
        }
      });
    },
    verificaExistenciaCartao(item){
      let teste = this.$store.state.cartoesEscolhidos.findIndex(val => item.id == val.id)
      if (teste == (this.$store.state.cartoesEscolhidos.length - 1)) return true;
      else return false;
    },
    usarCupom() {
      if (this.cupom == "" || this.cupom == null) {
        this.exibeSnackBar("#b38b57", "Não é possivel usar um cupom vazio");
        return false;
      }
      this.cupom = this.cupom.toUpperCase();
      // if (this.$store.state.cupons.length == 0) {
      //   this.exibeSnackBar("red", "Nenhum cupom cadastrado");
      //   return false;
      // }
      this.$http.get(`/cupom/${this.cupom}`).then((res) => {
        let frm = {
          id: res.data.cupom[0].id,
          cod: res.data.cupom[0].cod,
          porcen: res.data.cupom[0].porcen,
          tipo: res.data.cupom[0].tipo,
        };
        this.$store.state.cupomUtilizado = frm;
        let qtd = res.data.cupom[0].quant - 1;
        this.$http
          .patch(`/cupom/${res.data.cupom[0].id}`, { quant: qtd })
          .then(() => {
            this.cupomUtilizado = true;
            this.exibeSnackBar("green", "Cupom utilizado");
          })
          .catch((e) => {
            this.exibeSnackBar("red", "Cupom inexistente ou esgotado", e);
            return false;
          });

        return true;
      });
      // this.$store.state.cupons.filter((cupom) => {
      //   if (cupom.cod == this.cupom && cupom.quant > 0) {
      //     let frm = {
      //       cod: this.cupom,
      //       porcen: cupom.porcen,
      //       tipo: cupom.tipo,
      //     };
      //     this.$store.state.cupomUtilizado = frm;
      //     cupom.quant -= 1;
      //     this.editarCupons(cupom);
      //     this.cupomUtilizado = true;
      //     this.exibeSnackBar("green", "Cupom utilizado");
      //     return true;
      //   } else {
      //     this.exibeSnackBar("red", "Cupom inexistente ou esgotado");
      //     return false;
      //   }
      // });
      this.cupom = "";
    },
    removerCupom() {
      let cupomUsado = this.$store.state.cupomUtilizado;
      this.$store.state.cupons.filter((cupom) => {
        if (cupom.cod == cupomUsado.cod) {
          cupom.quant += 1;
          this.editarCupons(cupom);
          console.log("Valor abatido", this.$store.state.cupons);
          this.cupomUtilizado = false;
          (this.$store.state.cupomUtilizado = {
            porcen: 0,
          }),
            this.exibeSnackBar("#b38b57", "Cupom removido");
          return true;
        } else {
          this.exibeSnackBar("red", "falha ao remover cupom");
          return false;
        }
      });
    },
    calculaFrete(cep) {
      let frm = {
        cep: cep.replace("-", ""),
        peso: 1,
        comprimento: 50,
        altura: 8,
        largura: 10,
        diametro: 8,
      };
      this.$http.post(`/frete/`, frm).then((res) => {
        this.frete = res.data.valor[0].Valor;
        this.$store.state.freteCalculado = this.frete;
        console.log("valor", res);
      });

      this.frete = "22.00";
      this.$store.state.freteCalculado = this.frete;
    },
    exibeSnackBar(cor, msg) {
      this.snackbarColor = cor;
      this.mensagem = msg;
      this.snackbar = true;
    },
  },
};
</script>
<style>
.card-endereco {
  border: 2px solid #bbb !important;
}
.marcado {
  border: 2px solid #b38b57 !important;
}
.desmarcado {
  border: 2px solid #bbb !important;
}
.cupom-input input {
  text-transform: uppercase;
}
.alinhamento {
  display: flex;
  justify-content: end;
}
.alinhamentoTitulo {
  display: flex;
  justify-content: space-between;
}
</style>