<script setup>
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "../store/users";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

let typewriterIndex = 0;
const isTyping = ref(true);
const isContentReady = ref(false);

// Passing username
const title = computed(() => {
  return "Welcome";
});


const titleTyped = ref("");

function typewriter() {
  if (typewriterIndex < title.value.length) {
    titleTyped.value += title.value.charAt(typewriterIndex);
    typewriterIndex += 1;
    setTimeout(typewriter, 60);
  }
  else {
    isTyping.value = false;
    isContentReady.value = true;
  }
}

onMounted(() => {
  typewriterIndex = 0;
  isTyping.value = true;
  typewriter();
  isContentReady.value = false;
});
</script>

<template>
  <div class="block">
    <h1 class="is-typing">
      <span v-if="!user">{{ titleTyped }}</span>
      <span v-else>{{ titleTyped }} {{ user.username + "!" }}</span>
    </h1>
  </div>
</template>

<style scoped>
.block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
h1 {
  font-size: 5rem;
}

.is-typing {
  color: white;
}
</style>
