<template>
  <Transition name="modal-animation" appear>
    <div class="modal" @click="$emit('close')">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <span class="modal-title"> {{ title }} </span>
          <span class="modal-close" @click="$emit('close')"></span>
        </div>

        <div class="modal-body">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['close']);

onMounted(() => {
  document.body.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
      emit('close');
    }
  });

  document.body.classList.add('modal-open');
});

onUnmounted(() => {
  document.body.classList.remove('modal-open');
});
</script>

<style>
.modal-animation-enter-active,
.modal-animation-leave-active {
  opacity: 0;
}
.modal-animation-enter-active .modal__content,
.modal-animation-leave-active .modal__content {
  transform: scale(0.5);
}
</style>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  transition: opacity 0.2s ease;
  z-index: 998;
  background-color: var(--overlay-color);
}

.modal-content {
  position: relative;
  max-width: 600px;
  padding: 30px;
  background-color: var(--main-color);
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;
  border-radius: 8px;
  z-index: 999;
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-self: center;
  justify-content: space-between;
  padding-bottom: 20px;
}

.modal-header span {
  font-size: 24px;
}

.modal-title {
  font-weight: 600;
}

.modal-close {
  cursor: pointer;
  position: relative;
  width: 20px;
  height: 20px;
}

.modal-close::before,
.modal-close::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  background: var(--text-color);
  height: 2px;
  transform: rotate(45deg);
}

.modal-close::after {
  transform: rotate(-45deg);
}

.modal-body {
  text-align: center;
}

@media screen and (min-width: 900px) {
  .modal-content {
    min-width: 500px;
  }
}
</style>
