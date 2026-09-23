<script setup>
import { useTodoStore } from "../stores/addNote";

const todoStore = useTodoStore();
</script>

<template>
  <div class="container pt-5">
    <div class="row">
      <div
        v-for="note in todoStore.notes"
        :key="note.id"
        class="col-4 mb-3"
      >
        <div class="card position-relative">
          <div class="card-body pt-4">
            <i v-if="note.isPinned" class="fa-solid fa-thumbtack pin-icon--active position-absolute top-0 start-0 m-3 "></i>
            <h5 class="card-title mb-3">{{ note.item }}</h5>
            <p class="card-text">
              {{ note.content }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.pin-icon--active {
  color: darkred;
  transform: rotate(30deg);
}
</style>
