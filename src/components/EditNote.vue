<script setup>
import { useTodoStore } from "../stores/addNote";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from 'vue-router'

const todo_store = useTodoStore();
const route = useRoute()
const router = useRouter()

const note_item = ref("");
const note_content = ref("");
const new_item = ref("");
const currentNote = computed(() => todo_store.getNoteById(route.params.id));

function addTodo() {
  if (todo_store.addTodos(route.params.id, new_item.value)) {
    new_item.value = "";
  }
}

function saveNote() {
  const saved = todo_store.updateNote(
    route.params.id,
    note_item.value,
    note_content.value
  );

  if (saved) {
    router.push({ name: "home" });
  }
}

watch(
  currentNote,
  (note) => {
    new_item.value = "";

    if (!note) {
      router.replace({ name: "home" });
      return;
    }

    note_item.value = note.item;
    note_content.value = note.content;
  },
  { immediate: true }
);

</script>

<template>
  <form class="note-editor" @submit.prevent="saveNote">
    <div class="window-bar">編輯筆記<span class="window-lines" aria-hidden="true"></span></div>
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
          儲存修改
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
      v-for="todo in currentNote?.todos ?? []"
      :key="todo.id"
      class="d-flex align-items-center gap-3 mb-3"
    >
      <input
        type="checkbox"
        class="form-check-input m-0"
        :checked="todo.isFinished"
        @change="todo_store.toggleTodo(route.params.id, todo.id)"
      />
      <p class="mb-0" :class="{ 'note-line': todo.isFinished }">
        {{ todo.item }}
      </p>
      <i
        class="fa-solid fa-trash-can"
        @click="todo_store.deleteTodo(route.params.id, todo.id)"
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
