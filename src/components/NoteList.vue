<script setup>
import { useTodoStore } from "../stores/addNote";
import { ref } from "vue";
const todoStore = useTodoStore();

function confirmDelete() {
  if (!noteToDelete.value) return;
  todoStore.deleteNote(noteToDelete.value.id);
  noteToDelete.value = null;
}

const noteToDelete = ref(null);
</script>

<template lang="">
  <router-link to="/addNote" class="btn btn-dark mb-4">新增筆記</router-link>
  <div class="d-flex align-items-center gap-2">
    <i class="fa-solid fa-star"></i>
    <h4 class="text-start pt-2">重要</h4>
  </div>
  <ul class="list-group list-group-flush mb-4">
    <li
      v-for="note in todoStore.pinnedNotes"
      :key="note.id"
      class="list-group-item d-flex justify-content-between align-items-center"
    >
      <router-link
        :to="{ name: 'editNote', params: { id: note.id } }"
        class="note-link"
        >{{ note.item }}</router-link
      >
      <div class="btn-group gap-3">
        <i
          class="fa-solid fa-thumbtack pin-icon pin-icon--active"
          title="取消置頂"
          @click="todoStore.togglePin(note.id)"
        ></i>
        <button
          type="button"
          class="delete-icon"
          title="刪除"
          :aria-label="`刪除筆記：${note.item}`"
          data-bs-toggle="modal"
          data-bs-target="#deleteNoteModal"
          @click="noteToDelete = note"
        >
          <i class="fa-solid fa-trash-can" aria-hidden="true"></i>
        </button>
      </div>
    </li>
  </ul>
  <Teleport to="body">
    <div
      id="deleteNoteModal"
      class="modal"
      tabindex="-1"
      aria-labelledby="deleteNoteModalTitle"
      aria-describedby="deleteNoteModalDescription"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="deleteNoteModalTitle" class="modal-title">刪除筆記</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="關閉"
              @click="noteToDelete = null"
            ></button>
          </div>
          <div class="modal-body">
            <p id="deleteNoteModalDescription">
              確定要刪除「{{ noteToDelete?.item }}」這筆筆記？
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
              @click="noteToDelete = null"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              data-bs-dismiss="modal"
              :disabled="!noteToDelete"
              @click="confirmDelete"
            >
              確定刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
  <div class="d-flex align-items-center gap-2">
    <i class="fa-solid fa-folder"></i>
    <h4 class="text-start pt-2">一般</h4>
  </div>
  <ul class="list-group list-group-flush mb-4">
    <li
      v-for="note in todoStore.allNotes"
      :key="note.id"
      class="list-group-item d-flex justify-content-between align-items-center"
    >
      <router-link
        :to="{ name: 'editNote', params: { id: note.id } }"
        class="note-link"
        >{{ note.item }}</router-link
      >
      <div class="btn-group gap-3">
        <i
          class="fa-solid fa-thumbtack pin-icon"
          title="置頂"
          @click="todoStore.togglePin(note.id)"
        ></i>
        <button
          type="button"
          class="delete-icon"
          title="刪除"
          :aria-label="`刪除筆記：${note.item}`"
          data-bs-toggle="modal"
          data-bs-target="#deleteNoteModal"
          @click="noteToDelete = note"
        >
          <i class="fa-solid fa-trash-can" aria-hidden="true"></i>
        </button>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.pin-icon {
  color: var(--note-muted);
  cursor: pointer;
}

.pin-icon:hover {
  color: var(--note-accent);
}

.pin-icon--active {
  color: #747d25;
  background: #f0f3d7;
  border-radius: 6px;
  box-shadow: 0 0 0 5px #f0f3d7;
}

.delete-icon {
  cursor: pointer;
  border: 0;
  padding: 0;
  background: transparent;
  color: inherit;
  line-height: 1;
}

.delete-icon:focus-visible {
  outline: 2px solid var(--note-blue-dark);
  outline-offset: 4px;
}
.modal-content {
  border: 3px solid var(--note-border);
  border-radius: 12px;
  background: var(--note-paper);
  box-shadow: 8px 8px 0 var(--note-border);
  color: var(--note-text);
}
.modal-header,
.modal-footer {
  border-color: var(--note-border);
  border-width: 2px;
}
.modal-header { background: var(--note-blue); border-radius: 8px 8px 0 0; }
.modal-title { font-weight: 800; }
.modal-body { padding: 28px 24px; }
.modal-body {
  overflow-wrap: anywhere;
}
.modal .btn {
  border-radius: 6px;
  padding: 9px 18px;
  font-weight: 600;
}

.modal .btn-outline-secondary {
  --bs-btn-color: var(--note-blue-dark);
  --bs-btn-border-color: var(--note-border);
  --bs-btn-hover-color: var(--note-text);
  --bs-btn-hover-bg: var(--note-bg);
  --bs-btn-hover-border-color: var(--note-border);
  --bs-btn-active-color: var(--note-text);
  --bs-btn-active-bg: var(--note-bg);
  --bs-btn-active-border-color: var(--note-border);
  --bs-btn-focus-shadow-rgb: 87, 152, 215;
}

.modal .btn-outline-danger {
  --delete-label-color: #24150e;
  font-weight: 700;
  --bs-btn-color: var(--delete-label-color);
  --bs-btn-bg: var(--note-danger);
  --bs-btn-border-color: var(--note-border);
  --bs-btn-hover-color: var(--delete-label-color);
  --bs-btn-hover-bg: var(--note-danger-hover);
  --bs-btn-hover-border-color: var(--note-border);
  --bs-btn-active-color: var(--delete-label-color);
  --bs-btn-active-bg: var(--note-danger-hover);
  --bs-btn-active-border-color: var(--note-border);
  --bs-btn-disabled-color: var(--delete-label-color);
  --bs-btn-disabled-bg: var(--note-danger);
  --bs-btn-disabled-border-color: var(--note-danger);
  --bs-btn-focus-shadow-rgb: 252, 152, 106;
}

.delete-icon:hover {
  color: var(--note-danger);
}

.note-link {
  text-decoration: none;
  color: inherit;
}

.note-link:hover {
  color: var(--note-blue-dark);
}
</style>
