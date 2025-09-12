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
  />
</template>

<script setup>
import { watch } from 'vue';
import { RouterView } from 'vue-router';
import DialogModal from './components/DialogModal.vue';
import { useGlobalStore } from './stores/global';
import HeaderComponent from './components/HeaderComponent.vue';

const globalStore = useGlobalStore();
const body = document.querySelector('body');

watch(
  () => globalStore.isOpenModal,
  (isOpen) => {
    if (body) {
      body.classList.toggle('modal-open', isOpen);
    }
  }
);
</script>

<style scoped>
.footer {
  padding: 50px 0;
  text-align: center;
}

.footer-desc {
}
</style>
