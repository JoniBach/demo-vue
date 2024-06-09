import { reactive, toRefs } from 'vue';

const state = reactive({
  data: {
    users: [],
    brands: [],
    products: [],
    reviews: [],
  },
  columns: {
    users: [],
    brands: [],
    products: [],
    reviews: [],
  },
  loading: true,
});

const fetchData = async () => {
  try {
    const usersRes = await fetch("/data/users.json");
    const brandsRes = await fetch("/data/brands.json");
    const productsRes = await fetch("/data/products.json");
    const reviewsRes = await fetch("/data/reviews.json");
    const columnsRes = await fetch("/data/columns.json");

    if (
      !usersRes.ok ||
      !brandsRes.ok ||
      !productsRes.ok ||
      !reviewsRes.ok ||
      !columnsRes.ok
    ) {
      throw new Error("Failed to fetch data");
    }

    const users = await usersRes.json();
    const brands = await brandsRes.json();
    const products = await productsRes.json();
    const reviews = await reviewsRes.json();
    const columnsData = await columnsRes.json();

    state.data.users = users;
    state.data.brands = brands;
    state.data.products = products;
    state.data.reviews = reviews;
    state.columns = columnsData;
    state.loading = false;
  } catch (error) {
    console.error("Error fetching data:", error);
    state.loading = false;
  }
};

fetchData();

export default function useDataStore() {
  return {
    ...toRefs(state),
  };
}
