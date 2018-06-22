<template>
  <div class="search">
    <h1>Search</h1>
    <router-link to="/">Go to Top</router-link>
    <br>
    <router-link to="/search">Go to Search</router-link>
    <br>
    <router-link to="/myfeeds">Go to MyFeeds</router-link>
    <h2>Search</h2>
    <div class="row">
      <div class="input-field col s4 offset-s4">
        <input v-model="word" v-on:keyup.enter="submit" placeholder="Input Search Words!!">
      </div>
    </div>
  </div>
</template>

<script>
import Words from '../store/index.js'

export default {
  name: 'Search',
  data () {
    return {
      word: ''
    }
  },
  methods: {
    submit: function () {
      Words.commit('addWord', this.word)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
