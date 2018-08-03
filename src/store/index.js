import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const Queries = {
  state: {
    queries: []
  },
  mutations: {
    addQuery (state, word) {
      state.queries.push(word)
    },
    deleteQuery (state, index) {
      state.queries.splice(index, 1)
    },
    clearQuery (state) {
      state.queries = []
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
    },
    deleteWords (state, index) {
      state.words.splice(index, 1)
    },
    clearWords (state) {
      state.words = []
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
  },
  plugins: [createPersistedState()]
})
