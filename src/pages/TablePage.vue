<template>
  <div>
    <p v-if="loading">Loading...</p>
    <div v-else>
      <div v-for="table in columns" :key="table.id">
        <h1>{{ formatTableName(table.id) }}</h1>
        <TableComponent :data="data[table.id]" :columns="table.data" />
      </div>
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

    const formatTableName = (tableName) => {
      return (
        tableName.charAt(0).toUpperCase() +
        tableName
          .slice(1)
          .replace(/([A-Z])/g, " $1")
          .trim()
      );
    };

    return {
      data: computed(() => data.value),
      columns: computed(() => columns.value),
      loading: computed(() => loading.value),
      formatTableName,
    };
  },
};
</script>
