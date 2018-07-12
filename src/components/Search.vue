<template>
  <div class="search">
    <div class="row search-row">
      <!-- search area -->
      <div class="col s4 search-col">
        <div class="row">
          <div class="input-field col s12">
            <input id="search-word" v-model="parameters.word" v-on:keyup.enter="submit" type="text">
            <label for="search-word">キーワード</label>
          </div>
          <div class="input-field col s12">
            <input id="search-ex-word" v-model="parameters.exWord" v-on:keyup.enter="submit" type="text">
            <label for="search-ex-word">除外キーワード</label>
          </div>
          <div class="input-field col s12">
            <input id="search-user" v-model="parameters.user" v-on:keyup.enter="submit" type="text" >
            <label for="search-user">ユーザー</label>
          </div>
          <div class="input-field col s12">
            <input id="search-area" v-model="parameters.area" v-on:keyup.enter="submit" type="text">
            <label for="search-area">ツイート場所</label>
          </div>
          <div class="medias-check-field col s12">
            <div class="images-check-field col s6">
              <input id="search-images" v-model="parameters.images" type="checkbox">
              <label class="left" for="search-images">写真</label>
            </div>
            <div class="videos-check-field col s6">
              <input id="search-videos" v-model="parameters.videos" type="checkbox">
              <label class="left" for="search-videos">動画</label>
            </div>
          </div>
          <div class="posi-nega-field col s12">
            <div class="emotion-field both-field col s12">
              <input name="emotion" class="with-gap" id="search-both" v-model="parameters.both" type="radio">
              <label class="left" for="search-both">全て</label>
            </div>
            <div class="emotion-field posi-field col s12">
              <input name="emotion" class="with-gap" id="search-posi" v-model="parameters.positive" type="radio">
              <label class="left" for="search-posi"><i class="material-icons left yellow-text">mood</i>ポジティブなTweet</label>
            </div>
            <div class="emotion-field nega-field col s12">
              <input name="emotion" class="with-gap" id="search-nega" v-model="parameters.negative" type="radio">
              <label class="left" for="search-nega"><i class="material-icons left blue-text">mood_bad</i>ネガティブなTweet</label>
            </div>
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
      parameters: {
        word: '',
        exWord: '',
        user: '',
        area: '',
        images: '',
        videos: '',
        positive: '',
        negative: ''
      },
      query: '',
      wordLabel: '',
      tweets: []
    }
  },
  methods: {
    submit: function () {
      let q = ''
      for (let param in this.parameters) { // クエリに使うパラメータを組み立て
        q += this.parameters[param] + ','
        console.log(this.parameters[param])
      }
      console.log(q)
      // this.query = q
      // console.log(this.query)
      // console.log(this.word)
      // console.log(this.parameters.word)

      axios.get('http://localhost:3030/twitter/search?q=' + this.parameters.word)
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

.medias-check-field {
  margin: 30px 0 0 0;
}

.posi-nega-field {
  margin: 35px 0 0 0;
}

.emotion-field {
  margin: 5px 0 5px 0;
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
