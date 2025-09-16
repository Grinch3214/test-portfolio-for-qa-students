<template>
  <div class="post-view">
    <article v-if="post" class="post">
      <header class="post-header">
        <h1 class="post-title">{{ post.title }}</h1>

        <div class="post-meta">
          <p class="post-author"><span>Author:</span> {{ post.author_name }}</p>
          <p class="post-date">{{ formatDate(post.updated_at) }}</p>
        </div>

        <div class="post-badges">
          <span v-for="tag in post.tags" class="badge active">{{ tag }}</span>
        </div>
      </header>

      <div class="post-content">
        <p>{{ post.body }}</p>
      </div>

      <footer class="post-footer">
        <router-link to="/blog" class="btn btn-gray">Back</router-link>
        <button class="btn">Edit</button>
        <button class="btn btn-error">Delete</button>
      </footer>
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGlobalStore } from '@/stores/global';
import { Post } from '@/types/post';

const route = useRoute();
const globalStore = useGlobalStore();

const post = ref<Post | null>(null);

onMounted(async () => {
  const res = await globalStore.getSinglePost(route.params.id);

  post.value = res.data;
});

function formatDate(isoDateString) {
  const date = new Date(isoDateString);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}
</script>

<style scoped>
.post-view {
  max-width: 1000px;
  margin: 0 auto;
  flex: 1;
}
.post {
  padding: 40px 0;
}
.post-header {
  padding: 20px 0 50px;
}
.post-title {
  font-size: 42px;
  margin-bottom: 30px;
  line-height: 1.3;
}
.post-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 30px 0 0;
}
.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
}
.post-author {
}
.post-author span {
  color: var(--border-color);
}
.post-date {
  color: var(--border-color);
}
.post-content {
  text-align: justify;
  line-height: 1.5;
}
.post-footer {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-top: 40px;
  justify-content: flex-end;
}
.post-footer a,
.post-footer button {
  min-width: auto;
  padding-top: 15px;
  padding-bottom: 15px;
}
.back-link {
}
</style>
