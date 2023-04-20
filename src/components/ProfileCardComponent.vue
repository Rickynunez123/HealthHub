<script setup>
import {defineProps} from "vue";

// eslint-disable-next-line no-unused-vars
const props = defineProps(["post"]);
</script>

<template>
    <ACard hoverable style="width: 240px" class="card">
      <template #cover>
        <img alt="example" :src="post.url" />
      </template>
      <ACard-meta :title="post.username">
        <template #description>{{ post.caption }}</template>
      </ACard-meta>
    </ACard>
  </template>

  <style scoped>
    .card{
        margin: 1rem;
    }
</style>