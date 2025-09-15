<template>
  <main>
    <section class="create-post">
      <div class="container">
        <h2 class="create-post-title">Create New Post</h2>

        <FormPost />
      </div>
    </section>
  </main>
</template>

<script setup>
import FormPost from '@/components/FormPost.vue';
import { useGlobalStore } from '@/stores/global.js';
import { onMounted } from 'vue';

const globalStore = useGlobalStore();
</script>

<style scoped>
.create-post-title {
  font-size: 37px;
  text-transform: uppercase;
}
</style>
