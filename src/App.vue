<script setup>
import NoteList from "./components/NoteList.vue";
import { useTodoStore } from "./stores/addNote";
import { useRouter } from "vue-router";

const todoStore = useTodoStore();
const router = useRouter();

function searchNotes() {
  router.push({ name: "home" });
}
</script>

<template>
  <header>
    <nav class="navbar app-navbar">
      <div class="container">
        <router-link class="navbar-brand" to="/"
          ><img
            class="logo"
            src="./assets/sticky-note-retro.png"
            alt=""
          />noteApp</router-link
        >
        <form class="d-flex" role="search" @submit.prevent="searchNotes">
          <input
            v-model="todoStore.searchKeyword"
            class="form-control me-2"
            type="search"
            placeholder="搜尋標題或內容"
            aria-label="搜尋筆記"
          />
          <button
            class="btn btn-outline-dark text-nowrap flex-shrink-0"
            type="submit"
          >
            搜尋
          </button>
        </form>
      </div>
    </nav>
  </header>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4 col-lg-3 pt-5">
          <aside class="note-sidebar">
            <div class="window-bar">我的筆記<span class="window-lines" aria-hidden="true"></span></div>
            <NoteList />
          </aside>
        </div>
        <div class="col-12 col-md-8 col-lg-9">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </main>
  <footer>
    <p class="fs-6 p-5">All Rights Reserved. &copy; 2026 noteApp.com</p>
  </footer>
</template>

<style scoped>
.logo {
  width: 52px;
}
</style>
