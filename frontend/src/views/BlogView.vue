<template>
  <main>
    <section class="posts">
      <div class="container">
        <h2 class="posts-title">Posts</h2>
        <div class="posts-cards">
          <Post v-for="post in globalStore.posts" :key="post.id" :post="post" />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useGlobalStore } from '@/stores/global.js';
import { onMounted } from 'vue';
import Post from '@/components/Post.vue';

const globalStore = useGlobalStore();

onMounted(async () => {
  await globalStore.getAllPosts();
});
</script>

<style setup>
.posts {
  padding: 50px 0;
}

.posts-title {
  font-size: 37px;
  text-transform: uppercase;
  margin-bottom: 30px;
}

.posts-cards {
  display: grid;
  gap: 30px;
}
</style>
