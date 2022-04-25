export const state = () => ({
  todos: [],
})

export const getters = {
  // todos(state) {
  //   return state.list
  // }
  getTodos: state => state.todos
}

export const mutations = {
  ADD_TODO(state, text) {
    state.todos.push({
      text,
      done: false,
    })
  },
  REMOVE_TODO(state, { todo }) {
    state.todos.splice(state.todos.indexOf(todo), 1)
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  SET_TODO(state, todo) {
    console.log('state : ', state)
    console.log('todo : ', todo.done)
    // todo.done = !todo.done
    todo.done = !todo.done
  },
}

export const actions = {
  setTodo({ commit }, todo) {
    commit('SET_TODO', todo)
  },
}
