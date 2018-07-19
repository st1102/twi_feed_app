import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const Queries = {
  state: {
    queries: []
  },
  mutations: {
    addQuery (state, word) {
      state.queries.push(word)
    }
  },
  actions: {},
  getters: {
    getQueries (state) {
      return state.queries
    }
  }
}

const Words = {
  state: {
    words: []
  },
  mutations: {
    addWords (state, word) {
      state.words.push(word)
    }
  },
  actions: {},
  getters: {
    getWords (state) {
      return state.words
    }
  }
}

export default new Vuex.Store({
  modules: {
    Queries,
    Words
  }
})
