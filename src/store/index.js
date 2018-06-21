import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const Words = {
  state: {
    words: []
  },
  mutations: {
    addWord (state, word) {
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
    Words
  }
})
