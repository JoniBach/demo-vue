import { reactive, toRefs } from 'vue';

// Define the reactive state
const state = reactive({
  data: {
    users: [],
    brands: [],
    products: [],
    reviews: [],
  },
  columns: {},
  forms: {},
  charts: {},
  loading: true,
});

// Function to fetch JSON data from a given URL
const fetchJsonData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}: ${response.statusText}`);
  }
  return await response.json();
};

// Function to fetch all component data based on the configuration
const fetchComponentData = async (components, baseUrl) => {
  const componentPromises = components.map(async (component) => {
    const data = await fetchJsonData(baseUrl + component.data);
    return { id: component.id, data };
  });

  const componentsData = await Promise.all(componentPromises);

  return componentsData.reduce((acc, component) => {
    acc[component.id] = component.data;
    return acc;
  }, {});
};

// Function to fetch additional data (columns and forms)
const fetchAdditionalData = async () => {
  const [columns, forms, charts] = await Promise.all([
    fetchJsonData("/data/columns.json"),
    fetchJsonData("/data/forms.json"),
    fetchJsonData("/data/charts.json"),
  ]);

  return { columns, forms, charts };
};

// Main function to load all data and update the state
const fetchData = async () => {
  try {
    // Fetch the configuration file
    const config = await fetchJsonData("/data/config.json");
    const baseUrl = '/data/';

    // Fetch component data and additional data concurrently
    const [componentData, additionalData] = await Promise.all([
      fetchComponentData(config.components, baseUrl),
      fetchAdditionalData(),
    ]);

    // Update the state with the fetched data
    state.data = componentData;
    state.columns = additionalData.columns;
    state.forms = additionalData.forms;
    state.charts = additionalData.charts;
    state.loading = false;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    state.loading = false;
  }
};

// Fetch the data when the module is loaded
fetchData();

export default function useDataStore() {
  return {
    ...toRefs(state),
  };
}
