<template>
  <div v-if="chartData.length" ref="chartContainer"></div>
  <p v-else>Loading...</p>
</template>

<script>
import * as d3 from "d3";
import { initializeChart } from "./chart"; // Assuming initializeChart is exported from chart.js

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    config: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chartData: [],
    };
  },
  watch: {
    data: {
      immediate: true,
      handler(newData) {
        if (newData.length) {
          this.chartData = newData;
          this.renderChart();
        }
      },
    },
  },
  methods: {
    renderChart() {
      const container = this.$refs.chartContainer;
      if (container) {
        d3.select(container).selectAll("*").remove();
        initializeChart(container, this.chartData, this.config);
      }
    },
  },
  mounted() {
    if (this.data.length) {
      this.chartData = this.data;
      this.renderChart();
    }
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
