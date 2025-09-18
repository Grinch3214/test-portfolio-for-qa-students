<template>
  <main>
    <section class="edit-post">
      <div class="container">
        <h2 class="edit-post-title">Create New Post</h2>

        <FormPost :post="editPost" />
        {{ editPost }}
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import FormPost from '@/components/FormPost.vue';
import { useGlobalStore } from '@/stores/global.js';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Post } from '@/types/post';

const globalStore = useGlobalStore();

const route = useRoute();

const editPost = ref<Post | null>(null);

onMounted(async () => {
  if (!globalStore.post) {
    await globalStore.getSinglePost(Number(route.params.id));
  }
  editPost.value = globalStore.post;
});
</script>

<style scoped>
.edit-post-title {
  font-size: 37px;
  text-transform: uppercase;
}
</style>
