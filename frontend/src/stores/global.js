import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', () => {
  const isOpenModal = ref(false);

  return { isOpenModal };
});
