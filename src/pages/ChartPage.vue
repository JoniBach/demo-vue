<template>
  <div>
    <button @click="fetchData">Fetch Data</button>
    <h1>Chart Page</h1>
    <p v-if="loading">Loading...</p>
    <ChartComponent
      v-else-if="data && charts"
      :data="data.reviews"
      :config="charts"
    />
    <p v-else>No data available</p>
  </div>
</template>

<script>
import { onMounted } from "vue";
import ChartComponent from "@/components/ChartComponent.vue";
import useDataStore from "../stores/dataStore";

export default {
  components: {
    ChartComponent,
  },
  setup() {
    const { loading, data, charts, fetchData } = useDataStore();

    onMounted(async () => {
      await fetchData();
    });

    return {
      loading,
      data,
      charts,
      fetchData,
    };
  },
};
</script>

<style scoped>
/* Your styles here */
</style>
