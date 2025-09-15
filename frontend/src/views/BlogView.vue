<template>
  <main>
    <section class="posts">
      <div class="container">
        <div class="posts-inner">
          <h2 class="posts-title">Posts</h2>
          <button
            v-if="globalStore.isAuthenticated"
            class="posts-action btn"
            @click="createNewPost"
          >
            Create Post
          </button>
        </div>

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
import { useRouter } from 'vue-router';

const router = useRouter();

const globalStore = useGlobalStore();

function createNewPost() {
  router.push('/blog/new-post');
}

onMounted(async () => {
  await globalStore.getAllPosts();
});
</script>

<style setup>
.posts {
  padding: 50px 0;
}

.posts-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.posts-title {
  font-size: 37px;
  text-transform: uppercase;
}

.posts-cards {
  display: grid;
  gap: 30px;
}
</style>
