<template>
  <main>
    <section class="create-post">
      <div class="container">
        <h2 class="create-post-title">Create New Post</h2>

        <FormPost @save="save" />
      </div>
    </section>
  </main>
</template>

<script setup>
import FormPost from '@/components/FormPost.vue';
import { useGlobalStore } from '@/stores/global.js';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const globalStore = useGlobalStore();

const router = useRouter();

async function save(data) {
  console.log(data);
  const post = {
    ...data,
    user_id: globalStore.currentUserId,
  };

  const res = await globalStore.createNewPost(post);

  if (res) {
    router.push('/blog');
  }
}
</script>

<style scoped>
.create-post-title {
  font-size: 37px;
  text-transform: uppercase;
}
</style>
