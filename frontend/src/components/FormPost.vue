<template>
  <div class="form">
    <label class="form-label">
      <p class="form-title">Title</p>
      <input
        v-model="formData.title"
        type="text"
        name="title"
        class="form-input"
        placeholder="Post title"
      />
    </label>

    <label class="form-label">
      <p class="form-title">Description</p>
      <textarea
        v-model="formData.body"
        name="description"
        class="form-input"
        placeholder="Post description"
      />
    </label>

    <p class="form-title">Selected tags for post</p>
    <div class="form-tags">
      <button
        class="form-tag"
        v-for="tag in tags"
        :value="tag.value"
        :class="{ active: tag.active }"
        @click="toggleTag(tag)"
      >
        {{ tag.name }}
      </button>
    </div>

    <div class="form-actions">
      <button class="form-action btn" @click="save">Save</button>
      <button class="form-cancel btn" @click="">Cancel</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Post, Tags, PostForm } from '@/types/post';
import { ref } from 'vue';

const props = defineProps<{
  post?: Post;
}>();

const emit = defineEmits(['save']);

const tags = ref([
  { name: 'History', value: Tags.HISTORY, active: false },
  { name: 'American', value: Tags.AMERICAN, active: false },
  { name: 'Crime', value: Tags.CRIME, active: false },
  { name: 'French', value: Tags.FRENCH, active: false },
  { name: 'English', value: Tags.ENGLISH, active: false },
  { name: 'Magical', value: Tags.MAGICAL, active: false },
  { name: 'Memory', value: Tags.MEMORY, active: false },
  { name: 'Classic', value: Tags.CLASSIC, active: false },
  { name: 'Books', value: Tags.BOOKS, active: false },
  { name: 'Life', value: Tags.LIFE, active: false },
  { name: 'City', value: Tags.CITY, active: false },
  { name: 'Music', value: Tags.MUSIC, active: false },
  { name: 'Games', value: Tags.GAMES, active: false },
]);

const oldValues = ref<PostForm | null>(null);

const formData = ref<PostForm>({
  title: '',
  body: '',
  tags: [],
});

function toggleTag(tag) {
  tag.active = !tag.active;
  formData.value.tags = tags.value.filter((t) => t.active).map((t) => t.value);
}

function save() {
  emit('save', formData.value);
}
</script>

<style scoped>
.form {
  margin: 50px 0 0;
}
.form-label {
  margin-bottom: 30px;
  display: block;
}
.form-title {
  margin-bottom: 10px;
}
.form-input {
  width: 100%;
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

.form-input::placeholder {
  font-family: 'Poppins';
}

textarea.form-input {
  height: 200px;
  resize: none;
}

.form-tags {
  display: flex;
  flex-flow: wrap;
  gap: 10px;
}
.form-tag {
  color: var(--text-color);
  background: var(--input-color);
  font-size: 14px;
  border-radius: 50px;
  padding: 8px 19px;
  text-transform: capitalize;
  cursor: pointer;
}

.form-tag:hover {
  opacity: 0.9;
}

.form-tag.active {
  --text-color: #fff;
  background: var(--brand-color);
}

.form-actions {
  margin-top: 30px;
  display: flex;
  gap: 30px;
}

.form-action {
}

.form-cancel {
  background: var(--input-color);
}
.form-cancel:hover {
  background: var(--hover-input-color);
}
</style>
