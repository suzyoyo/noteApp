import { defineStore } from "pinia";

export const useTodoStore = defineStore("todos", {
  state: () => ({
    notes: [
      {
        id: 1,
        item: "買日用品",
        content: "乳液、防曬",
        isFinished: false,
        isPinned: true,
      },
      {
        id: 2,
        item: "回覆專案信件",
        content: "確認設計稿修改範圍並回覆時程預估",
        isFinished: true,
        isPinned: false,
      },
      {
        id: 3,
        item: "預約皮膚科",
        content: "週四下班後或週六早上時段",
        isFinished: false,
        isPinned: false,
      },
      {
        id: 4,
        item: "備份工作檔案",
        content: "將本週設計稿歸檔並上傳至雲端",
        isFinished: true,
        isPinned: false,
      },
    ],
    todos: [
      {
        id: 1,
        item: "整理房間",
        isFinished: false,
      },

      {
        id: 2,
        item: "讀書",
        isFinished: false,
      },
      {
        id: 3,
        item: "運動",
        isFinished: false,
      }]
  }),
  getters: {
    pinnedNotes() {
      return this.notes.filter((note) => note.isPinned);
    },
    allNotes() {
      return this.notes.filter((note) => !note.isPinned);
    },
  },
  actions: {
    toggleNote(i) {
      this.notes[i].isFinished = !this.notes[i].isFinished;
    },
    togglePin(id) {
      const note = this.notes.find((note) => note.id === id);
      if (!note) return;
      note.isPinned = !note.isPinned;
    },
    addNote(item, content) {
      if (!item) return;
      this.notes.push({
        id: this.notes[this.notes.length - 1].id + 1,
        item: item,
        content: content,
        isFinished: false,
        isPinned: false,
      });
    },
    deleteNote(id) {
      const index = this.notes.findIndex((note) => note.id === id);
      if (index === -1) return;

      this.notes.splice(index, 1);
    },
    addTodos(item) {
      if (!item) return;
      this.todos.push({
        id: Date.now(),
        item: item,
        isFinished: false,
      });
    },
    toggleTodo(id) {
      const todo = this.todos.find((todo) => todo.id === id);
      if (!todo) return;

      todo.isFinished = !todo.isFinished;
    },
    deleteTodo(id) {
      const index = this.todos.findIndex((todo) => todo.id === id);
      if (index === -1) return;

      this.todos.splice(index, 1);
    },
  },
});
