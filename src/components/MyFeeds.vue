<template>
  <div class="main">
    <h1>MyFeeds</h1>
    <router-link to="/">Go to Top</router-link>
    <br>
    <router-link to="/main">Go to Main</router-link>
    <br>
    <router-link to="/myfeeds">Go to MyFeeds</router-link>
    <!-- <h2>Search</h2> -->
    <!-- <input v-model="word" v-on:keyup.enter="submit" placeholder="Input Search Words!!"> -->
    <h2>List</h2>
    <p>Result</p>
    <ul>
      <!-- <li v-for="[word, tweets] in tweets" v-bind:key="word">
        {{ word }}
        <ul>
          <li v-for="tweet in tweets" v-bind:key="tweet.id">
            {{ tweet.user.name }}
            {{ tweet.text }}
          </li>
        </ul>
      </li> -->
      <!-- <li v-for="word in words">
        {{ word }}
        <ul>
          <li v-for="t in tweet" v-bind:key="t.id">
            {{ t.user.name }}
            {{ t.text }}
          </li>
        </ul>
      </li> -->
      <li v-for="(value, key) in this.tweets">
        {{ key }}
        <ul>
          <li v-for="t in value" v-bind:key="t.id">
            {{ t.user.name }}
            {{ t.text }}
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
      // tweets: [[new Map()]] // keyがワード, valueがツイートの配列のマップ
      tweets: {}
    }
  },
  methods: {
    // submit: function () {
    //   axios.get('http://localhost:3030/twitter/search?q=' + this.word)
    //     .then((response) => {
    //       console.log(response)
    //       this.tweets = response.data.statuses
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // }
  },
  created () {
    this.words = Words.getters.getWords
    for (let word of this.words) {
      axios.get('http://localhost:3030/twitter/search?q=' + word)
        .then((response) => {
          console.log(response)
          // this.tweets.set(word, response.data.statuses)
          // console.log(this.tweets)
          // this.words.push(word)
          // this.tweets.push(response.data.statuses)
          Vue.set(this.tweets, word, response.data.statuses)
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
