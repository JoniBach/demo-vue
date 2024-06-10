<template>
  <div>
    <p v-if="loading">Loading...</p>
    <div v-else>
      <h1>Users Form</h1>
      <FormComponent
        :fields="forms.users"
        :data="data.users[0]"
        @submit="handleSubmit"
      />

      <h1>Brands Form</h1>
      <FormComponent
        :fields="forms.brands"
        :data="data.brands[0]"
        @submit="handleSubmit"
      />

      <h1>Products Form</h1>
      <FormComponent
        :fields="forms.products"
        :data="data.products[0]"
        @submit="handleSubmit"
      />

      <h1>Reviews Form</h1>
      <FormComponent
        :fields="forms.reviews"
        :data="data.reviews[0]"
        @submit="handleSubmit"
      />
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

    return {
      loading,
      data,
      forms,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
/* Your styles here */
</style>
