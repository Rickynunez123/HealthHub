<script setup>
import HeaderComponent from "./components/HeaderComponent.vue";
import { onMounted } from "vue";
import { useUserStore } from "./store/users";

const userStore = useUserStore();

onMounted(() => {
  userStore.getUser();
});
</script>

<template>
  <v-app>
    <v-main>
      <HeaderComponent />
      <router-view />
    </v-main>
  </v-app>
</template>
