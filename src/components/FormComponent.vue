<template>
  <form @submit.prevent="handleSubmit">
    <div v-for="(field, index) in fields" :key="index">
      <label>{{ field.title }}</label>
      <div v-if="field.type === 'radio'">
        <div v-for="option in field.options" :key="option">
          <input
            type="radio"
            :name="field.field"
            :value="option"
            :required="field.required"
            :checked="getNestedValue(data, field.field) === option"
          />
          <label>{{ option }}</label>
        </div>
      </div>
      <div v-else-if="field.type === 'textarea'">
        <textarea
          :name="field.field"
          :placeholder="field.placeholder"
          :required="field.required"
          :pattern="field.validation"
          v-model="tempValues[field.field]"
        ></textarea>
      </div>
      <div v-else>
        <input
          :type="field.type"
          :name="field.field"
          :placeholder="field.placeholder"
          :required="field.required"
          :pattern="field.validation"
          :min="field.min"
          :max="field.max"
          v-model="tempValues[field.field]"
        />
      </div>
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
import { ref, watchEffect } from "vue";

export default {
  props: {
    fields: {
      type: Array,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const getNestedValue = (obj, path) => {
      return path.split(".").reduce((acc, part) => acc && acc[part], obj);
    };

    const setNestedValue = (obj, path, value) => {
      const keys = path.split(".");
      let current = obj;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
    };

    const tempValues = ref({});

    watchEffect(() => {
      props.fields.forEach((field) => {
        tempValues.value[field.field] =
          getNestedValue(props.data, field.field) || "";
      });
    });

    const handleSubmit = () => {
      const dataObj = {};
      for (const key in tempValues.value) {
        setNestedValue(dataObj, key, tempValues.value[key]);
      }
      emit("submit", dataObj);
    };

    return {
      tempValues,
      getNestedValue,
      setNestedValue,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
/* Your styles here */
</style>
