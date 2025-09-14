<template>
  <article>
    <h3>ssss</h3>
    <div>
      <span>sss</span>
    </div>
    <p>
      {{ post }}
    </p>

    <div>
      <div>
        <button>
          <svg>
            <use href="/src/assets/img/sprites.svg#like"></use>
          </svg>
          300
        </button>
        <button>
          <svg>
            <use href="/src/assets/img/sprites.svg#dislike"></use>
          </svg>
          200
        </button>
      </div>
      <p>Views: 10</p>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  post: Object,
});
</script>

<style scoped></style>
