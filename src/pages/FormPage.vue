<template>
  <div>
    <p v-if="loading">Loading...</p>
    <div v-else>
      <div v-for="form in forms" :key="form.id">
        <h1>{{ capitalize(form.id) }} Form</h1>
        <FormComponent
          :fields="form.data"
          :data="data[form.id]?.[0]"
          @submit="handleSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import FormComponent from "../components/FormComponent.vue";
import useDataStore from "../stores/dataStore";

export default {
  components: {
    FormComponent,
  },
  setup() {
    const { loading, data, forms, fetchData } = useDataStore();

    onMounted(async () => {
      await fetchData();
    });

    const handleSubmit = (formData) => {
      console.log("Submitted data:", formData);
    };

    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

    return {
      loading,
      data,
      forms,
      handleSubmit,
      capitalize,
    };
  },
};
</script>

<style scoped>
/* Your styles here */
</style>
