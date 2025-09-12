<template>
  <dialog class="dialog" ref="dialogRef" @keydown.esc="closeDialog">
    <button class="dialog-close" @click="closeDialog"></button>
    <h2 class="dialog-title">Login</h2>

    <form class="dialog-form" action="#" method="POST">
      <label>
        <p>Email</p>
        <input type="text" name="email" />
      </label>

      <label>
        <p>Password</p>
        <input type="text" name="password" required />
      </label>

      <button class="dialog-form-login">LOGIN</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  isOpen?: boolean;
  title?: string;
}

interface FormData {
  email: string;
  password: string;
}

const props = defineProps<Props>();

const emit = defineEmits(['update:isOpen', 'submit']);

const dialogRef = ref<HTMLDialogElement | null>(null);
const formData = ref<FormData>({ email: '', password: '' });

function closeDialog() {
  emit('update:isOpen', false);
  dialogRef.value.close();
}

// const handleSubmit = () => {
//   emit('submit', { ...formData.value });
//   closeDialog();
// };

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal && dialogRef.value) {
      dialogRef.value.showModal();
    } else if (dialogRef.value) {
      dialogRef.value.close();
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.dialog {
  max-width: 474px;
  width: 100%;
  background: var(--main-color);
  color: var(--text-color);
  border: 0;
  border-radius: 15px;
  box-shadow: 0 0 10px 0 var(--overlay-color);
  padding: 50px 27px;
}

.dialog::backdrop {
  background: var(--overlay-color);
}

.dialog-close {
  width: 22px;
  height: 22px;
  position: absolute;
  top: 30px;
  right: 27px;
  cursor: pointer;
}

.dialog-close::before,
.dialog-close::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--text-color);
  transform: rotate(45deg) translate(7px, 7px);
}

.dialog-close::after {
  transform: rotate(-45deg) translate(-7px, 7px);
}

.dialog-title {
  font-size: 46px;
  line-height: 1.5;
  margin-bottom: 30px;
  text-align: center;
}

.dialog-form {
  display: flex;
  flex-flow: column;
  gap: 30px;
}

.dialog-form label {
  display: flex;
  flex-flow: column;
  gap: 5px;
}

.dialog-form input {
  height: 52px;
  padding: 15px;
  border: 0;
  outline: none;
  box-shadow: 0 0 0 1px var(--border-color);
  font-size: 22px;
  background: var(--input-color);
  color: var(--text-color);
  border-radius: 10px;
}

.dialog-form p {
  font-size: 18px;
}

.dialog-form-login {
  padding: 15px;
  background: var(--brand-color);
  border-radius: 10px;
  color: var(--main-color);
  cursor: pointer;
  transition: 0.2s linear;
}

.dialog-form-login:hover {
  background: #63bce9;
}
</style>
