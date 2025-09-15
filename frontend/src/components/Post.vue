<template>
  <article class="post">
    <h3 class="post-title">{{ post.title }}</h3>
    <div class="post-tags">
      <span v-for="(tag, index) in post.tags" :key="index" class="post-tag">{{
        tag
      }}</span>
    </div>
    <p class="post-desc">
      {{ post.body }}
    </p>

    <div class="post-bottom">
      <div class="post-bottom-actions">
        <button class="post-bottom-action">
          <svg>
            <use href="/src/assets/img/sprites.svg#like"></use>
          </svg>
          {{ post.reactions.likes }}
        </button>
        <button class="post-bottom-action">
          <svg>
            <use href="/src/assets/img/sprites.svg#dislike"></use>
          </svg>
          {{ post.reactions.dislikes }}
        </button>
      </div>
      <p class="post-bottom-view">Views: {{ post.views }}</p>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  post: Object,
});
</script>

<style scoped>
.post {
  background: var(--input-color);
  color: var(--text-color);
  border-radius: 16px;
  padding: 30px;
}
.post-title {
  font-size: 42px;
  margin-bottom: 15px;
}
.post-tags {
  margin-bottom: 30px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}
.post-tag {
  --text-color: #fff;
  color: var(--text-color);
  background: var(--brand-color);
  font-size: 14px;
  border-radius: 50px;
  padding: 8px 19px;
  text-transform: capitalize;
}
.post-desc {
  line-height: 1.3;
}
.post-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.post-bottom-actions {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-top: 30px;
}
.post-bottom-action {
  display: flex;
  align-items: center;
  gap: 10px;
}
.post-bottom-action svg {
  width: 32px;
  height: 30px;
}
.post-bottom-view {
}
</style>
