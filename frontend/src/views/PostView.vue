<template>
  <div class="post-view">
    <article v-if="globalStore.post" class="post">
      <header class="post-header">
        <h1 class="post-title">{{ globalStore.post.title }}</h1>

        <div class="post-meta">
          <p class="post-author">
            <span>Author:</span> {{ globalStore.post.author_name }}
          </p>
          <p class="post-date">{{ formatDate(globalStore.post.updated_at) }}</p>
        </div>

        <div class="post-badges">
          <span v-for="tag in globalStore.post.tags" class="badge active">{{
            tag
          }}</span>
        </div>
      </header>

      <div class="post-content">
        <p>{{ globalStore.post.body }}</p>
      </div>

      <footer class="post-footer">
        <router-link to="/blog" class="btn btn-gray">Back</router-link>
        <router-link
          v-if="globalStore.isAuthenticated"
          :to="`/blog/${route.params.id}/edit-post`"
          class="btn"
          >Edit</router-link
        >
        <button
          v-if="globalStore.isAuthenticated"
          class="btn btn-error"
          @click="isModalShow = true"
        >
          Delete
        </button>
      </footer>
    </article>
  </div>

  <Modal
    v-if="isModalShow"
    title="Do you want delete post?"
    @close="isModalShow = false"
  >
    <template #body>
      <div class="modal-body">
        <button class="btn btn-error" @click="deletePost(globalStore.post.id)">
          Yes
        </button>
        <button class="btn btn-gray" @click="isModalShow = false">
          Cancel
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGlobalStore } from '@/stores/global';
import Modal from '@/components/Modal.vue';

const route = useRoute();
const router = useRouter();

const globalStore = useGlobalStore();

const isModalShow = ref<boolean>(false);

function formatDate(isoDateString) {
  const date = new Date(isoDateString);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

async function deletePost(id) {
  try {
    const res = await globalStore.deletePost(id);

    if (res.id) {
      router.push('/blog');
    }
  } catch (err) {
    console.log('deletePost err: ', err);
  } finally {
    isModalShow.value = false;
  }
}

onMounted(async () => {
  await globalStore.getSinglePost(route.params.id);
  await globalStore.incrementPostView(route.params.id);
});
</script>

<style scoped>
.post-view {
  max-width: 1000px;
  width: 100%;
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

.modal-body {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 40px;
}
.modal-body button {
  min-width: auto;
  padding-top: 15px;
  padding-bottom: 15px;
}
</style>
