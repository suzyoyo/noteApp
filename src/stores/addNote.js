import { defineStore } from "pinia";

export const useTodoStore = defineStore("todos", {
  state: () => ({
    searchKeyword: "",
    notes: [
      {
        id: 1,
        item: "買日用品",
        content: "乳液、防曬",
        isFinished: false,
        isPinned: true,
        todos: [],
      },
      {
        id: 2,
        item: "回覆專案信件",
        content: "確認設計稿修改範圍並回覆時程預估",
        isFinished: true,
        isPinned: false,
        todos: [],
      },
      {
        id: 3,
        item: "預約皮膚科",
        content: "週四下班後或週六早上時段",
        isFinished: false,
        isPinned: false,
        todos: [],
      },
      {
        id: 4,
        item: "備份工作檔案",
        content: "將本週設計稿歸檔並上傳至雲端",
        isFinished: true,
        isPinned: false,
        todos: [],
      },
    ],
  }),
  getters: {
    getNoteById: (state) => {
      return (id) => state.notes.find((note) => note.id === Number(id));
    },
    pinnedNotes() {
      return this.notes.filter((note) => note.isPinned);
    },
    allNotes() {
      return this.notes.filter((note) => !note.isPinned);
    },
    filteredNotes() {
      const keyword = this.searchKeyword.trim().toLowerCase();

      if (!keyword) {
        return this.notes;
      }

      return this.notes.filter((note) => {
        return (
          note.item.toLowerCase().includes(keyword) ||
          note.content.toLowerCase().includes(keyword)
        );
      });
    },
  },
  actions: {
    updateNote(id, item, content) {
      const note = this.getNoteById(id);
      if (!note || !item.trim()) return false;

      note.item = item.trim();
      note.content = content;
      return true;
    },
    toggleNote(i) {
      this.notes[i].isFinished = !this.notes[i].isFinished;
    },
    togglePin(id) {
      const note = this.notes.find((note) => note.id === id);
      if (!note) return;
      note.isPinned = !note.isPinned;
    },
    addNote(item, content, todos = []) {
      if (!item.trim()) return false;
      this.notes.push({
        id: Math.max(0, ...this.notes.map((note) => note.id)) + 1,
        item: item.trim(),
        content: content,
        isFinished: false,
        isPinned: false,
        todos: todos.map((todo) => ({ ...todo })),
      });
      return true;
    },
    deleteNote(id) {
      const index = this.notes.findIndex((note) => note.id === id);
      if (index === -1) return;

      this.notes.splice(index, 1);
    },
    addTodos(noteId, item) {
      const note = this.getNoteById(noteId);
      if (!note || !item.trim()) return false;
      note.todos.push({
        id: Math.max(0, ...note.todos.map((todo) => todo.id)) + 1,
        item: item.trim(),
        isFinished: false,
      });
      return true;
    },
    toggleTodo(noteId, id) {
      const note = this.getNoteById(noteId);
      if (!note) return;
      const todo = note.todos.find((todo) => todo.id === id);
      if (!todo) return;

      todo.isFinished = !todo.isFinished;
    },
    deleteTodo(noteId, id) {
      const note = this.getNoteById(noteId);
      if (!note) return;
      const index = note.todos.findIndex((todo) => todo.id === id);
      if (index === -1) return;

      note.todos.splice(index, 1);
    },
  },
});
