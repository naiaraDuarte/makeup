<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    area: Object,
    altera: Number,
  },
  data() {
    return {
      gradient: null,
      gradient2: null,
    };
  },
  mounted() {
    this.gerarGrafico();
    this.$emit("canva", this.$refs.canvas);
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
      this.renderChart(this.area, {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              gridLines: {
                lineWidth: 0,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                lineWidth: 0,
              },
            },
          ],
        },
      });
    },
  },
};
</script>
