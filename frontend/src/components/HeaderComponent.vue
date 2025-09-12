<template>
  <header class="header" :class="{ active: isHeaderActive }">
    <div class="container header-container">
      <RouterLink to="/" class="header-logo">John</RouterLink>

      <nav class="header-nav">
        <RouterLink to="/blog" class="header-link">Blog</RouterLink>
        <a
          class="header-link"
          href="#"
          id="login"
          @click.prevent="globalStore.isOpenModal = true"
          >Login</a
        >
        <button class="header-sheme">
          <svg class="header-sheme-icon">
            <use href="/src/assets/img/sprites.svg#setting"></use>
          </svg>
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useGlobalStore } from '../stores/global';

const globalStore = useGlobalStore();

const isHeaderActive = ref(false);

function handleScroll() {
  isHeaderActive.value = window.scrollY >= 40;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.header {
  padding: 43px 0;
  transition: 0.2s linear;
  position: sticky;
  top: 0;
  z-index: 20;
}

.header.active {
  backdrop-filter: blur(10px);
  box-shadow: 0 1px 5px 0 var(--main-color);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-logo {
  text-transform: capitalize;
  color: var(--text-color);
  text-decoration: none;
}

.header-nav {
  display: flex;
  gap: 40px;
  align-items: center;
}

.header-link {
  display: block;
  color: var(--text-color);
  text-transform: capitalize;
  text-decoration: none;
  transition: 0.2s linear;
}

.header-link:hover,
.header-sheme:hover {
  color: var(--brand-color);
}

.header-sheme {
  width: 40px;
  height: 40px;
  transition: 0.2s linear;
}

.header-sheme-icon {
  width: 40px;
  height: 40px;
}
</style>
