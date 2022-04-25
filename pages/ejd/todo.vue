<template>
  <div>
    <ul>
      <li v-for="(todo, index) in getTodos" :key="`key-${index}`">
        <input :checked="todo.done" type="checkbox" @change="toggle(todo)" >
        <span :class="{ done: todo.done }">{{ todo.text }} - {{ todo.done }}</span>
      </li>
    </ul>
    <p>
      <input placeholder="What needs to be done?" @keyup.enter="addTodo" />
    </p>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ToDo',
  // data() {
  //   return {
  //     todos: [],
  //   }
  // },
  computed: {
    ...mapGetters('todo', ['getTodos']),
    // todos() {
    //   console.log('todos : ', this.$store.state.todo.todos)
    //   return this.$store.state.todo.todos
    // },
  },
  methods: {
    ...mapMutations({
      // toggle: 'todo/toggle',
      toggle: 'todo/SET_TODO',
    }),
    addTodo(e) {
      console.log('addTodo : ', e.target.value)
      // this.$store.commit('todo/add', e.target.value)
      this.$store.commit('todo/ADD_TODO', e.target.value)
    },
  },
}
</script>

<style>
.done {
  text-decoration: line-through;
}
</style>
