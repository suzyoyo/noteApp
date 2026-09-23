<script setup>
import { useTodoStore } from "../stores/addNote";

const todoStore = useTodoStore();
</script>

<template lang="">
  <router-link to="/addNote" class="btn btn-dark mb-4">create note</router-link>
  <div class="d-flex align-items-center gap-2">
    <i class="fa-solid fa-star"></i>
    <h4 class="text-start pt-2">Primary</h4>
  </div>
  <ul class="list-group list-group-flush mb-4">
    <li
      v-for="note in todoStore.pinnedNotes"
      :key="note.id"
      class="list-group-item d-flex justify-content-between align-items-center"
    >
      {{ note.item }}
      <div class="btn-group gap-3">
        <i
          class="fa-solid fa-thumbtack pin-icon pin-icon--active"
          title="取消置頂"
          @click="todoStore.togglePin(note.id)"
        ></i>
        <i
          class="fa-solid fa-trash-can delete-icon"
          title="刪除"
          @click="todoStore.deleteNote(note.id)"
        ></i>
      </div>
    </li>
  </ul>
  <div class="d-flex align-items-center gap-2">
    <i class="fa-solid fa-folder"></i>
    <h4 class="text-start pt-2">All</h4>
  </div>
  <ul class="list-group list-group-flush mb-4">
    <li
      v-for="note in todoStore.allNotes"
      :key="note.id"
      class="list-group-item d-flex justify-content-between align-items-center"
    >
      {{ note.item }}
      <div class="btn-group gap-3">
        <i
          class="fa-solid fa-thumbtack pin-icon"
          title="置頂"
          @click="todoStore.togglePin(note.id)"
        ></i>
        <i
          class="fa-solid fa-trash-can delete-icon"
          title="刪除"
          @click="todoStore.deleteNote(note.id)"
        ></i>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.pin-icon {
  color: gray;
  cursor: pointer;
}

.pin-icon--active {
  color: darkred;
}

.delete-icon {
  cursor: pointer;
}
</style>
