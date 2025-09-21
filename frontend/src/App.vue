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
    :clear-fields="clearFields"
    @update:is-open="(val) => (globalStore.isOpenModal = val)"
    @submit="formData"
  />
</template>

<script setup>
import { watch, ref, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import DialogModal from './components/DialogModal.vue';
import { useGlobalStore } from './stores/global';
import HeaderComponent from './components/HeaderComponent.vue';

const globalStore = useGlobalStore();
const body = document.querySelector('body');

const clearFields = ref(false);

async function formData(data) {
  // TODO: need to create sonner
  clearFields.value = false;
  const res = await globalStore.signIn(data);

  if (res) {
    clearFields.value = true;
  }
}

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
</style>
