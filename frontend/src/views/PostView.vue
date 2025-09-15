<template>
  <div class="post-view">
    <article v-if="post" class="post">
      <header class="post-header">
        <h1 class="post-title">{{ post.title }}</h1>
        <div class="post-meta">
          <span class="post-date">{{ formatDate(post.created_at) }}</span>
        </div>
      </header>

      <div class="post-content">
        <p>{{ post.body }}</p>
      </div>

      <footer class="post-footer">
        <router-link to="/blog" class="back-link"
          >← Вернуться к блогу</router-link
        >
      </footer>
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGlobalStore } from '@/stores/global';

const route = useRoute();
const globalStore = useGlobalStore();

const post = ref(null);

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
