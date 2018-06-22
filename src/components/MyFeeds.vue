<template>
  <div class="main">
    <h1>MyFeeds</h1>
    <router-link to="/">Go to Top</router-link>
    <br>
    <router-link to="/search">Go to Search</router-link>
    <br>
    <router-link to="/myfeeds">Go to MyFeeds</router-link>
    <h2>List</h2>
    <p>Result</p>
    <ul>
      <li v-for="(tweets, word) in this.wordsAndTweets" v-bind:key="word">
        {{ word }}
        <ul>
          <li v-for="tweet in tweets" v-bind:key="tweet.id">
            {{ tweet.user.name }}
            {{ tweet.text }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import Words from '../store/index.js'

export default {
  name: 'MyFeeds',
  data () {
    return {
      words: [],
      wordsAndTweets: {}
    }
  },
  methods: {

  },
  created () {
    this.words = Words.getters.getWords
    for (let word of this.words) {
      axios.get('http://localhost:3030/twitter/search?q=' + word)
        .then((response) => {
          console.log(response)
          Vue.set(this.wordsAndTweets, word, response.data.statuses)
        })
        .catch((error) => {
          console.log(error)
        })
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
