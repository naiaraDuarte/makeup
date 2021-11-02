<template>
  <v-container style="width: 1200px" fluid>
    <div id="dash">
      <v-row>
        <v-col lg="12" class="mt-5 ml-4">
          <p class="mb-3 tituloModalCarrinho">
            <v-icon class="pb-1" large>mdi-chevron-double-right</v-icon
            >Dashboard
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="6">
          <v-dialog ref="dialog" v-model="modal" persistent width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateRangeText"
                label="Selecione um periodo"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dates"
              range
              color="primary"
              locale="pt-br"
              :max="dataMax"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">
                Cancelar
              </v-btn>
              <v-btn text color="primary" @click="pesquisar()"> OK </v-btn>
            </v-date-picker>
          </v-dialog>
          model: {{ dates }}
        </v-col>
        <v-col lg="6">
          <v-radio-group v-model="opcao" row>
            <v-radio label="Produto" :value="0"></v-radio>
            <v-radio label="Categoria" :value="1"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="12">
          <AreaChart :area="area" :altera="altera" />
        </v-col>
        <!-- <v-col lg="12">
          <LineChart />
        </v-col> -->
        <!-- <v-col lg="6">
          <BarChart />
        </v-col>
        <v-col lg="6">
          <PieChart />
        </v-col> -->
      </v-row>
    </div>
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
// import PieChart from "../../ui/PieChart.vue";
import AreaChart from "../../ui/AreaChart.vue";
// import LineChart from "../../ui/LineChart.vue";
// import BarChart from "../../ui/BarChart.vue";

export default {
  components: {
    // PieChart,
    AreaChart,
    // LineChart,
    // BarChart,
  },
  data() {
    return {
      menu: false,
      modal: false,
      menu2: false,
      produtos: [],
      dates: [],
      mes: [],
      datasets: [],
      area: {},
      altera: 0,
      opcao: 0,
      snackbarColor: "",
      mensage: "",
      snackbar: false,
    };
  },
  mounted() {
    this.$http.get(`/grafico/`).then(async (res) => {
      await this.preencheData(res.data.dados);

      this.area = {
        labels: this.mes,
        datasets: this.datasets,
      };
      console.log("mounted", this.area);
      this.altera = parseInt(Math.random() * 255);
    });
  },
  computed: {
    dateRangeText() {
      this.organizaDatas();
      return this.dates.join(" ~ ");
    },
    dataMax() {
      return this.$moment().format("YYYY-MM-DD");
    },
  },
  watch: {
    opcao() {
      this.pesquisar();
    },
  },
  methods: {
    organizaDatas() {
      this.dates.sort();
    },
    pesquisar() {
      this.$refs.dialog.save(this.dates);
      let frm = {};
      if (this.dates.length == 0) {
        this.exibeSnack("red", "Login ou senha não conferem");
        return null;
      }
      if (this.dates.length == 1) {
        frm = {
          dataInicial: this.dates[0],
          dataFinal: this.dates[0],
          status: this.opcao,
        };
      } else {
        frm = {
          dataInicial: this.dates[0],
          dataFinal: this.dates[1],
          status: this.opcao,
        };
      }

      this.$http.post(`/grafico/`, frm).then(async (res) => {
        await this.preencheData(res.data.dados);

        this.area = {
          labels: this.mes,
          datasets: this.datasets,
        };
        console.log(this.area);
        this.altera = parseInt(Math.random() * 255);
      });
    },
    preencheData(data) {
      this.datasets = [];
      data.forEach((e) => {
        if (e.total != null) {
          let index = this.datasets.findIndex((d) => d.id == e.id);
          let cor = this.gerar_cor();
          if (index == -1) {
            this.datasets.push({
              id: e.id,
              label: e.nome,
              data: [parseInt(e.total)],
              backgroundColor: "transparent",
              borderColor: cor,
              pointBackgroundColor: cor,
            });
          } else {
            this.datasets[index].data.push(e.total);
          }
          if (this.mes.findIndex((m) => e.mes_completo == m) == -1) {
            this.mes.push(e.mes_completo);
          }
        }
      });
    },
    gerar_cor(opacidade = 1) {
      let r = parseInt(Math.random() * 255);

      let g = parseInt(Math.random() * 255);

      let b = parseInt(Math.random() * 255);

      return `rgba(${r}, ${g}, ${b}, ${opacidade})`;
    },
    exibeSnack(color, msg) {
      this.snackbarColor = color;
      this.mensagem = msg;
      this.snackbar = true;
    },
  },
};
</script>