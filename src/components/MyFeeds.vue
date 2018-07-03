<template>
  <div class="main">
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
import Vue from 'vue'
import axios from 'axios'
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
