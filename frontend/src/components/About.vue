<template>
  <section class="about">
    <div class="container">
      <h2 class="about-title">ABOUT ME</h2>
      <p class="about-desc">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quod
        nostrum repudiandae voluptatum facilis itaque odio sapiente impedit
        consequatur cumque, ipsa at tempore omnis ea animi non quibusdam
        doloremque corrupti sit. Deserunt dolores recusandae quam error! Vero
        maiores repudiandae delectus fugiat, eaque rem nihil pariatur temporibus
        mollitia incidunt? Culpa dignissimos error eum aspernatur nesciunt et
        temporibus voluptate animi natus qui!
      </p>
      <p class="about-desc">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quod
        nostrum repudiandae voluptatum facilis itaque odio sapiente impedit
        consequatur cumque, ipsa at tempore omnis ea animi non quibusdam
        doloremque corrupti sit. Deserunt dolores recusandae quam error! Vero
        maiores repudiandae delectus fugiat, eaque rem nihil pariatur temporibus
        mollitia incidunt? Culpa dignissimos error eum aspernatur nesciunt et
        temporibus voluptate animi natus qui!
      </p>
    </div>
  </section>
</template>

<style scoped>
.about {
  --main-color: #0c151d;
  color: var(--main-color);
  padding: 40px 0;
  background: var(--brand-color);
  line-height: 1.5;
  text-align: center;
}

.about-title {
  font-size: 37px;
  text-transform: uppercase;
  text-align: center;
}

.about-desc {
  margin-top: 30px;
}

.about-desc + .about-desc {
  margin-top: 10px;
}
</style>
