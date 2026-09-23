import { createRouter, createWebHashHistory } from "vue-router";
import NoteGrid from "../components/NoteGrid.vue";
import AddNote from "../components/AddNote.vue";
import EditNote from "../components/EditNote.vue";

const routes = [
  { path: "/", name: "home", component: NoteGrid },
  { path: "/addNote", name: "addNote", component: AddNote },
  { path: "/editNote/:id", name: "editNote", component: EditNote },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
