<script setup>
import NoteList from "./components/NoteList.vue"
</script>

<template>
  <header>
    <nav class="navbar bg-body-tertiary">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/"><img class="logo" src="./assets/note_logo.png" alt="">noteApp</router-link>
        <form class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder=""
            aria-label="Search"
          />
          <button class="btn btn-outline-dark" type="submit">Search</button>
        </form>
      </div>
    </nav>
  </header>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-3 pt-5">
          <NoteList/>
        </div>
        <div class="col-9">
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
.logo{
  width: 80px;
}
</style>
