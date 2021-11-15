<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  props: {
    troca: Object,
    altera: Number,
  },
  mounted() {
    this.gerarGrafico();
  },
  watch: {
    altera() {
      this.gerarGrafico();
    },
  },
  methods: {
    gerar_cor(opacidade = 1) {
      let r = parseInt(Math.random() * 255);

      let g = parseInt(Math.random() * 255);

      let b = parseInt(Math.random() * 255);

      return `rgba(${r}, ${g}, ${b}, ${opacidade})`;
    },
    gerarGrafico() {
      this.renderChart(
      this.troca,
      { responsive: true, maintainAspectRatio: false }
    );
    },
  },
};
</script>