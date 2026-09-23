<script setup>
import { useTodoStore } from "../stores/addNote";
import { ref } from "vue";

const todo_store = useTodoStore();
console.log(todo_store.notes);

const note_item = ref("");
const note_content = ref("");
const new_item = ref("");

function addTodo() {
  todo_store.addTodos(new_item.value.trim());
  new_item.value = "";
}
</script>

<template>
  <form>
    <div class="mb-3 pt-5">
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
          type="button"
          class="btn btn-dark"
          @click="todo_store.addNote(note_item, note_content)"
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
      v-for="todo in todo_store.todos"
      :key="todo.id"
      class="d-flex align-items-center gap-3 mb-3"
    >
      <input
        type="checkbox"
        class="form-check-input m-0"
        :checked="todo.isFinished"
        @change="todo_store.toggleTodo(todo.id)"
      />
      <p class="mb-0" :class="{ 'note-line': todo.isFinished }">
        {{ todo.item }}
      </p>
      <i
        class="fa-solid fa-trash-can"
        @click="todo_store.deleteTodo(todo.id)"
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
