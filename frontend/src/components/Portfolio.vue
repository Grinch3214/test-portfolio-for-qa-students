<template>
  <section class="portfolio">
    <div class="container">
      <h2 class="portfolio-title">portfolio</h2>

      <div class="portfolio-cards">
        <article
          class="portfolio-card"
          v-for="item in portfolio"
          :key="item.key"
        >
          <img :src="item.url" alt="content img" width="380" height="226" />
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const portfolio = [
  {
    id: 1,
    url: '/src/assets/img/img_1.png',
  },
  {
    id: 2,
    url: '/src/assets/img/img_2.png',
  },
  {
    id: 3,
    url: '/src/assets/img/img_3.png',
  },
  {
    id: 4,
    url: '/src/assets/img/img_4.png',
  },
  {
    id: 5,
    url: '/src/assets/img/img_5.png',
  },
  {
    id: 6,
    url: '/src/assets/img/img_6.png',
  },
];
</script>

<style scoped>
.portfolio {
  padding: 50px 0 100px;
}

.portfolio-title {
  font-size: 37px;
  text-transform: uppercase;
  text-align: center;
}

.portfolio-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 40px;
}

.portfolio-card {
  height: 226px;
  overflow: hidden;
  border-radius: 15px;
}

.portfolio-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 1100px) {
  .portfolio-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 650px) {
  .portfolio-title {
    font-size: 26px;
  }
}

@media (max-width: 500px) {
  .portfolio-cards {
    grid-template-columns: 1fr;
  }
}
</style>
