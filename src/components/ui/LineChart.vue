<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(1200, 0, 0, 0);

    this.gradient.addColorStop(0, this.gerar_cor());
    this.gradient.addColorStop(0.3, this.gerar_cor());
    this.gradient.addColorStop(0.5, this.gerar_cor());
    this.gradient.addColorStop(0.7, this.gerar_cor());
    this.gradient.addColorStop(1, this.gerar_cor());

    this.renderChart(
      {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            data: [],
            backgroundColor: "transparent",
            borderColor: this.gradient,
            pointBackgroundColor: this.gerar_cor(),
          },
        ],
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "My Data",
        },
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
      }
    );
  },
  methods: {
    gerar_cor(opacidade = 1) {
      let r = parseInt(Math.random() * 255);

      let g = parseInt(Math.random() * 255);

      let b = parseInt(Math.random() * 255);

      return `rgba(${r}, ${g}, ${b}, ${opacidade})`;
    },
  },
};
</script>