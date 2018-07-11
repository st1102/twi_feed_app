<template>
  <div class="search">
    <div class="row search-row">
      <!-- search area -->
      <div class="col s4 search-col">
        <div class="row">
          <div class="input-field col s12">
            <input id="search-word" v-model="word" v-on:keyup.enter="submit" type="text">
            <label for="search-word">Word</label>
          </div>
          <div class="input-field col s12">
            <input id="search-user" v-model="user" v-on:keyup.enter="submit" type="text" >
            <label for="search-user">User</label>
          </div>
          <div class="input-field col s12">
            <input id="search-area" v-model="area" v-on:keyup.enter="submit" type="text">
            <label for="search-area">Area</label>
          </div>
        </div>
      </div>
      <!-- result area -->
      <div class="col s8 result-col">
        <div class="result-feed">
          <h5 class="result-word z-depth-2">Result for "{{ wordLabel }}"</h5>
          <a class="btn-floating btn-large waves-effect waves-light red add-button" v-on:click="storeWord"><i class="material-icons">playlist_add</i></a>
          <ul class="collection tweet-list">
            <li v-for="tweet in tweets" v-bind:key="tweet.id" class="collection-item">
              <div class="row tweet-content-row">
                <div class="col s2">
                  <img class="circle responsive-img" v-bind:src="tweet.user.profile_image_url.replace('_normal.jpg', '_bigger.jpg')">
                </div>
                <div class="col s10 user-text">
                  <div class="section">
                    <span class="name-id">
                      <span class="user-name">{{ tweet.user.name }}</span>
                      <span>@{{ tweet.user.screen_name }}</span>
                    </span>
                    <span class="right">{{ new Date(tweet.created_at).getFullYear() }}年{{ new Date(tweet.created_at).getMonth() }}月{{ new Date(tweet.created_at).getDate() }}日 {{ ('00' + new Date(tweet.created_at).getHours()).slice(-2) }}:{{ ('00' + new Date(tweet.created_at).getMinutes()).slice(-2) }}:{{ ('00' + new Date(tweet.created_at).getSeconds()).slice(-2) }}</span>
                  </div>
                  <div class="section">
                    <div class="tweet-text">
                      {{ tweet.text }}
                    </div>
                    <div class="center tweet-pictures" v-if="tweet.extended_entities">
                      <img class="responsive-img tweet-picture" v-for="picture in tweet.extended_entities.media" v-bind:key="picture.id" v-bind:src="picture.media_url">
                    </div>
                    <div class="fav-retweet">
                      <div class="fav-retweet-div">
                        <i class="material-icons left black-text fav-retweet-icons">repeat</i>{{ tweet.favorite_count }}
                      </div>
                      <div class="fav-retweet-div">
                        <i class="material-icons left black-text fav-retweet-icons">favorite_border</i>{{ tweet.retweet_count }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Words from '../store/index.js'

export default {
  name: 'Search',
  data () {
    return {
      word: '',
      wordLabel: '',
      tweets: []
    }
  },
  methods: {
    submit: function () {
      axios.get('http://localhost:3030/twitter/search?q=' + this.word)
        .then((response) => {
          console.log(response)
          this.tweets = response.data.statuses
        })
        .catch((error) => {
          console.log(error)
        })
      this.wordLabel = this.word
    },
    storeWord: function () {
      if (this.word !== '') {
        Words.commit('addWord', this.word)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search {
  height: 100%;
}

.search-col {
  margin: 10px 0 0 0;
}

.search-row {
  height: 100%;
}

.result-col {
  height: 100%;
}

.add-button {
  position: absolute;
  /* ヘッダー+ラベル-ボタンの高さの半分 */
  top: calc((64px + 12px) + (47px + 2px) - 28px);
  right: 5%;
}

/* ここより下MyFeedsのフィード部分と共通 */
.result-feed {
  height: 100%;
  padding: 0 5px 0 5px;
  border-right: solid 2px #00acc155;
  border-left: solid 2px #00acc155;
}

.result-word {
  padding: 10px 0 10px 0;
  margin-bottom: 2px;
}

.tweet-list {
  height: calc(100% - (47px + 2px));
  overflow: scroll;
  margin: 0;
}

.tweet-content-row {
  margin-bottom: 0;
}

.user-text {
  text-align: left;
}

.section {
  padding: 0;
}

.user-name {
  font-weight: bold;
}

.name-id {
  display: inline-block;
  width: 60%;
  height: 1.8em;
  line-height: 1.6;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.responsive-img {
  width: 50px;
}

.tweet-text {
  margin: 5px 0 10px 0;
}

.tweet-pictures {
  margin: 10px 0 10px 0;
}

.tweet-picture {
  display: inline-block;
  width: 80%;
}

.fav-retweet {
  display: flex;
}

.fav-retweet-div {
  margin: 0 10px 0 10px;
}

.fav-retweet-icons {
  margin: 0;
}
</style>
