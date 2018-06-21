<template>
  <div class="main">
    <h1>Main</h1>
    <router-link to="/">Go to Top</router-link>
    <br>
    <router-link to="/main">Go to Main</router-link>
    <br>
    <router-link to="/myfeeds">Go to MyFeeds</router-link>
    <h2>Search</h2>
    <input v-model="word" v-on:keyup.enter="submit" placeholder="Input Search Words!!">
    <h2>List</h2>
    <p>Result</p>
    <ul>
      <!-- <li v-for="tweet in tweets">
        {{ tweet.user.name }}
        {{ tweet.text }}
      </li> -->
    </ul>
  </div>
</template>

<script>
// import axios from 'axios'
// import Vue from 'vue'
import Words from '../store/index.js'

export default {
  name: 'Main',
  data () {
    return {
      word: ''
      // tweets: []
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
    submit: function () {
      Words.commit('addWord', this.word)
    }
  }
  // mounted () {
  //   axios.get('http://localhost:3030/twitter/search?q=' + this.word)
  //     .then((response) => {
  //       console.log(response)
  //       this.tweets = response.data.statuses
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }
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
