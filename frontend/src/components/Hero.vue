<template>
  <section class="hero">
    <div class="container">
      <div class="hero-box">
        <div class="hero-photo">
          <img
            src="@/assets/img/image_1.png"
            alt="John Doe"
            width="205"
            height="205"
          />
        </div>

        <div class="hero-inner">
          <h1 class="hero-title">John Doe</h1>
          <p class="hero-desc">Frontend Developer</p>

          <ul class="hero-list">
            <li class="hero-item" v-for="social in list" :key="list.id">
              <a class="hero-link" href="#">
                <svg>
                  <use :href="social.url"></use>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <ul class="hero-exp">
        <li class="hero-exp-item" v-for="item in experience" :key="item.id">
          <p>{{ item.title }}</p>
          <p>{{ item.desc }}</p>
        </li>
      </ul>

      <div class="hero-buttons">
        <button class="hero-buttons-btn">Download CV</button>
        <a class="hero-buttons-btn" href="#">Contact Me</a>
      </div>
    </div>
  </section>
</template>

<script setup>
const experience = [
  {
    id: 1,
    title: '7',
    desc: 'Years of work experience',
  },
  {
    id: 2,
    title: '50+',
    desc: 'Completed projects',
  },
  {
    id: 3,
    title: '20+',
    desc: 'Satisfied customers',
  },
];

const list = [
  {
    id: 1,
    href: '#',
    url: '/src/assets/img/sprites.svg#github',
  },
  {
    id: 2,
    href: '#',
    url: '/src/assets/img/sprites.svg#twitter',
  },
  {
    id: 3,
    href: '#',
    url: '/src/assets/img/sprites.svg#linkedin',
  },
  {
    id: 4,
    href: '#',
    url: '/src/assets/img/sprites.svg#youtube',
  },
];
</script>

<style scoped>
.hero {
  padding: 50px 0;
}

.hero-box {
  display: flex;
  gap: 45px;
  align-items: center;
  justify-content: center;
}

.hero-photo {
  width: 215px;
  height: 215px;
  border-radius: 50%;
  border: 6px solid var(--brand-color);
  overflow: hidden;
}

.hero-photo:hover img {
  transform: scale(1.1);
}

.hero-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.2s linear;
}

.hero-inner {
}

.hero-title {
  font-size: 46px;
}

.hero-desc {
  margin-top: 10px;
}

.hero-list {
  margin-top: 12px;
  display: flex;
  gap: 26px;
  align-items: center;
}

.hero-item {
}

.hero-item:nth-child(3) .hero-link {
  cursor: default;
}

.hero-link {
  width: 36px;
  height: 36px;
  color: var(--text-color);
  display: block;
  transition: 0.2s linear;
}

.hero-link:hover {
  color: var(--brand-color);
}

.hero-link svg {
  width: 36px;
  height: 36px;
}

.hero-exp {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 90px;
  margin-top: 70px;
}

.hero-exp-item {
  flex: 0 0 150px;
  text-align: center;
  font-size: 24px;
  line-height: 1.3;
}

.hero-exp-item p + p {
  font-size: 22px;
  margin-top: 5px;
}

.hero-buttons {
  margin-top: 60px;
  display: flex;
  justify-content: center;
  gap: 40px;
}

.hero-buttons-btn {
  min-width: 290px;
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
  padding: 29px;
  background: var(--brand-color);
  color: var(--main-color);
  cursor: pointer;
  transition: 0.2s linear;
}

.hero-buttons-btn:last-child {
  --main-color: #0c151d;
}

.hero-buttons-btn:hover {
  background: #63bce9;
}
</style>
