<script setup>
import { useTodoStore } from "../stores/addNote";
import { ref } from "vue";

const todo_store = useTodoStore();

const note_item = ref("");
const note_content = ref("");
const new_item = ref("");
const todos = ref([]);

function addTodo() {
  const item = new_item.value.trim();
  if (!item) return;
  todos.value.push({
    id: Math.max(0, ...todos.value.map((todo) => todo.id)) + 1,
    item,
    isFinished: false,
  });
  new_item.value = "";
}

function deleteTodo(id) {
  todos.value = todos.value.filter((todo) => todo.id !== id);
}

function saveNote() {
  if (todo_store.addNote(note_item.value, note_content.value, todos.value)) {
    note_item.value = "";
    note_content.value = "";
    new_item.value = "";
    todos.value = [];
  }
}
</script>

<template>
  <form class="note-editor" @submit.prevent="saveNote">
    <div class="window-bar">新增筆記<span class="window-lines" aria-hidden="true"></span></div>
    <div class="mb-3">
      <input
        v-model="note_item"
        type="text"
        class="form-control"
        id="exampleInputTitle"
        aria-describedby="TitleHelp"
        placeholder="輸入標題..."
      />
    </div>
    <div class="mb-3">
      <textarea
        v-model="note_content"
        class="form-control"
        name=""
        id=""
        rows="5"
        placeholder="輸入內容..."
      ></textarea>
      <div class="d-flex justify-content-end mt-3">
        <button
          type="submit"
          class="btn btn-dark"
          :disabled="!note_item.trim()"
        >
          新增筆記
        </button>
      </div>
    </div>
    <div class="mb-3">
      <hr class="mb-3" />
      <h5 class="mb-3 text-start fw-bolder"><i class="fa-solid fa-list-check"></i> 待辦項目</h5>
      <div class="d-flex gap-2 mb-4">
        <input
          type="text"
          class="form-control"
          placeholder="輸入待辦事項..."
          v-model="new_item"
          @keydown.enter.prevent="addTodo"
        />
        <button
          class="btn btn-outline-secondary text-nowrap"
          type="button"
          @click="addTodo"
        >
          新增
        </button>
      </div>
    </div>
    <div
      v-for="todo in todos"
      :key="todo.id"
      class="d-flex align-items-center gap-3 mb-3"
    >
      <input
        type="checkbox"
        class="form-check-input m-0"
        v-model="todo.isFinished"
      />
      <p class="mb-0" :class="{ 'note-line': todo.isFinished }">
        {{ todo.item }}
      </p>
      <i
        class="fa-solid fa-trash-can"
        @click="deleteTodo(todo.id)"
      ></i>
    </div>
  </form>
</template>

<style scoped>

.note-line{
  text-decoration: line-through;
}

.fa-trash-can {
  cursor: pointer;
}

</style>
