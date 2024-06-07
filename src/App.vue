<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <nav>
      <NavComponent />
    </nav>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import NavComponent from "@/components/NavComponent.vue";
export default {
  name: "App",
  components: {
    NavComponent,
  },
};
</script>
