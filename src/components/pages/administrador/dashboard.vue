<template>
  <v-container style="width: 1200px" fluid>
    <div id="dash">
      <v-row>
        <v-col lg="12" class="mt-5 ml-4">
          <p class="mb-3 tituloModalCarrinho">
            <v-icon class="pb-1" large>mdi-chevron-double-right</v-icon>Dashboard
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="6">
          <AreaChart />
        </v-col>
        <v-col lg="6">
          <LineChart />
        </v-col>
        <v-col lg="6">
          <BarChart />
        </v-col>
        <v-col lg="6">
          <PieChart />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import PieChart from "../../ui/PieChart.vue";
import AreaChart from "../../ui/AreaChart.vue";
import LineChart from "../../ui/LineChart.vue";
import BarChart from "../../ui/BarChart.vue";

export default {
  components: {
    PieChart,
    AreaChart,
    LineChart,
    BarChart,
  },
  data() {
    return {
      chartData: {
        Books: 24,
        Magazine: 30,
        Newspapers: 10,
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Chart.js Line Chart",
          },
        },
      },
    };
  },
};
</script>