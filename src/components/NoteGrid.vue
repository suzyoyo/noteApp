<script setup>
import { useTodoStore } from "../stores/addNote";

const todoStore = useTodoStore();
</script>

<template>
  <div class="container pt-5">
    <div class="row">
      <div v-for="note in todoStore.filteredNotes" :key="note.id" class="col-12 col-lg-6 col-xl-4 mb-4">
        <router-link
          :to="{ name: 'editNote', params: { id: note.id } }"
          class="card-note"
        >
          <div class="card position-relative">
            <div class="window-bar"><span>NOTE / {{ String(note.id).padStart(2, '0') }}</span><i v-if="note.isPinned" class="fa-solid fa-thumbtack ms-auto" aria-label="已置頂"></i><span v-else class="window-lines" aria-hidden="true"></span></div>
            <div class="card-body pt-4">
              <h5 class="card-title mb-3">{{ note.item }}</h5>
              <p class="card-text">
                {{ note.content }}
              </p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pin-icon--active {
  color: var(--note-accent);
  transform: rotate(30deg);
}

.card-note {
  display: block;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease;
  height: 100%;
}

.card {
  height: 100%;
  min-height: 180px;
  border: 3px solid var(--note-border);
  border-radius: 12px;
  box-shadow: var(--note-shadow);
  background: var(--note-paper);
  color: var(--note-text);
}

.card-body { padding: 32px 22px 24px; }
.card-title { margin-top: 0; font-weight: 800; overflow-wrap: anywhere; }
.card-text { color: var(--note-muted); overflow-wrap: anywhere; white-space: pre-wrap; }
.card-note:hover .card { box-shadow: 7px 9px 0 var(--note-border); }

.card-note:hover{
transform: translateY(-6px);
cursor: pointer;
}

</style>
