<template>
  <div>
    <p v-if="loading">Loading...</p>
    <div v-else>
      <h1>Users Table</h1>
      <TableComponent :data="data.users" :columns="columns.users" />

      <h1>Brands Table</h1>
      <TableComponent :data="data.brands" :columns="columns.brands" />

      <h1>Products Table</h1>
      <TableComponent :data="data.products" :columns="columns.products" />

      <h1>Reviews Table</h1>
      <TableComponent :data="data.reviews" :columns="columns.reviews" />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import useDataStore from "../stores/dataStore";
import TableComponent from "../components/TableComponent.vue";

export default {
  name: "TablePage",
  components: {
    TableComponent,
  },
  setup() {
    const { data, columns, loading } = useDataStore();
    console.log(data);
    return {
      data: computed(() => data.value),
      columns: computed(() => columns.value),
      loading: computed(() => loading.value),
    };
  },
};
</script>
