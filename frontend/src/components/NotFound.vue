<template>
  <div class="not-found">
    <h2>404</h2>
    <p>PAGE NOT FOUND</p>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  font-size: 60px;
  flex: 1;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

.not-found h2 {
  font-size: 80px;
}

@media (max-width: 650px) {
  .not-found {
    font-size: 26px;
  }
  .not-found h2 {
    font-size: 46px;
  }
}
</style>
