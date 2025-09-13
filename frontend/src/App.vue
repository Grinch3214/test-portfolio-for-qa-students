<template>
  <HeaderComponent />

  <RouterView />

  <footer class="footer">
    <div class="container">
      <p class="footer-desc">© John Doe. 2025 All rigths reserved</p>
    </div>
  </footer>
  <DialogModal
    :is-open="globalStore.isOpenModal"
    @update:is-open="(val) => (globalStore.isOpenModal = val)"
    @submit="formData"
  />
</template>

<script setup>
import { watch, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import DialogModal from './components/DialogModal.vue';
import { useGlobalStore } from './stores/global';
import HeaderComponent from './components/HeaderComponent.vue';

const globalStore = useGlobalStore();
const body = document.querySelector('body');

function formData(data) {
  console.log(data);
  globalStore.signIn(data);
}

watch(
  () => globalStore.isOpenModal,
  (isOpen) => {
    if (body) {
      body.classList.toggle('modal-open', isOpen);
    }
  }
);

onMounted(async () => {
  await globalStore.checkAuth();
});
</script>

<style scoped>
.footer {
  padding: 50px 0;
  text-align: center;
}

.footer-desc {
}
</style>
