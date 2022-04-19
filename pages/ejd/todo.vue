<template>
  <ul>
    <li
      v-for="(todo, index) in todos" :key="index"
    >
      <input :checked="todo.done" @change="toggle(todo)" type="checkbox">
      <span :class="{ done: todo.done }">{{ todo.text }} - {{ index }}</span>
    </li>
    <li>
      <input @keyup.enter="addTodo" placeholder="What needs to be done?">
    </li>
  </ul>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    todos () {
      return this.$store.state.todo.list
    }
  },
  methods: {
    ...mapMutations({
      toggle: 'todo/toggle'
    }),
    addTodo (e) {
      this.$store.commit('todo/add', e.target.value)
    }
  }
}
</script>

<style>
.done {
  text-decoration: line-through;
}
</style>
