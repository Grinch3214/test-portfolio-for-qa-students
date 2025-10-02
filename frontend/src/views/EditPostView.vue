<template>
  <main>
    <section class="edit-post">
      <div class="container">
        <div class="edit-post-head">
          <h2 class="edit-post-title">Edit Post</h2>
          <button class="edit-post-icon" @click="router.go(-1)">
            <svg>
              <use href="/src/assets/img/sprites.svg#close"></use>
            </svg>
          </button>
        </div>

        <FormPost
          ref="formPostRef"
          :post="globalStore.post"
          @save="save"
          @cancel="cancel"
        />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import FormPost from '@/components/FormPost.vue';
import { useGlobalStore } from '@/stores/global.js';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const globalStore = useGlobalStore();

const route = useRoute();
const router = useRouter();

const formPostRef = ref<typeof FormPost | null>(null);

async function save(data) {
  const { title, tags, body } = globalStore.post;

  if (
    title === data.title &&
    tags.length === data.tags.length &&
    tags.every((tag, index) => tag === data.tags[index]) &&
    body === data.body
  ) {
    return;
  }

  console.log(data);
}

function cancel() {
  if (formPostRef.value) {
    formPostRef.value.reset();
  }
}
onMounted(async () => {
  if (!globalStore.post) {
    await globalStore.getSinglePost(Number(route.params.id));
  }
});
</script>

<style scoped>
.edit-post-title {
  font-size: 37px;
  text-transform: uppercase;
}

.edit-post-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.edit-post-icon {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  border: 2px solid var(--text-color);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s linear;
}
.edit-post-icon svg {
  width: 20px;
  height: 20px;
}

.edit-post-icon:hover {
  opacity: 0.85;
}
</style>
