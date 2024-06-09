<template>
  <div ref="table"></div>
</template>

<script>
import { TabulatorFull as Tabulator } from "tabulator-tables"; //import Tabulator library
import "tabulator-tables/dist/css/tabulator.min.css"; // Import the stylesheet

export default {
  name: "TableComponent",
  props: {
    data: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      tabulator: null, //variable to hold your table
    };
  },
  watch: {
    data: {
      handler(newData) {
        if (this.tabulator) {
          this.tabulator.replaceData(newData);
        }
      },
      deep: true,
    },
    columns: {
      handler(newColumns) {
        if (this.tabulator) {
          this.tabulator.setColumns(newColumns);
        }
      },
      deep: true,
    },
  },
  mounted() {
    //instantiate Tabulator when element is mounted
    this.tabulator = new Tabulator(this.$refs.table, {
      data: this.data, //link data to table
      reactiveData: true, //enable data reactivity
      columns: this.columns, //define table columns
    });
  },
  beforeUnmount() {
    if (this.tabulator) {
      this.tabulator.destroy();
    }
  },
};
</script>

<style>
/* Add any additional styles if necessary */
</style>
