<template>
  <v-container fluid>
    <PieChart></PieChart>
    <AreaChart></AreaChart>
  </v-container>
</template>

<script>
import PieChart from "../../ui/PieChart.vue";
import AreaChart from '../../ui/AreaChart.vue';
export default {
  components: {
    PieChart,
    AreaChart
  },
  data() {
    return {
      chartData: {
        Books: 24,
        Magazine: 30,
        Newspapers: 10,
      },
    };
  },
};
</script>