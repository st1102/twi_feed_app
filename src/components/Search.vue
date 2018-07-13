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
          <div class="col s12">
            <h5 class="at-mark col s1">＠</h5>
            <div class="input-field col s11">
              <input id="search-user" v-model="parameters.user" v-on:keyup.enter="submit" type="text" >
              <label for="search-user">ツイートユーザーID</label>
            </div>
          </div>
          <!-- <div class="input-field col s12">
            <input id="search-area" v-model="parameters.area" v-on:keyup.enter="submit" type="text">
            <label for="search-area">ツイート場所</label>
          </div> -->
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
            <div class="emotion-field posi-field col s12">
              <input name="emotion" class="with-gap" id="search-posi" value="posi" v-model="parameters.emotion" type="radio">
              <label class="left" for="search-posi"><i class="material-icons left yellow-text">mood</i>ポジティブなツイート</label>
            </div>
            <div class="emotion-field nega-field col s12">
              <input name="emotion" class="with-gap" id="search-nega" value="nega" v-model="parameters.emotion" type="radio">
              <label class="left" for="search-nega"><i class="material-icons left blue-text">mood_bad</i>ネガティブなツイート</label>
            </div>
            <div class="emotion-field both-field col s12">
              <input name="emotion" class="with-gap" id="search-both" value="all" v-model="parameters.emotion" type="radio">
              <label class="left" for="search-both">全て</label>
            </div>
          </div>
        </div>
      </div>
      <!-- result area -->
      <div class="col s8 result-col">
        <div class="result-feed">
          <div class="result-words z-depth-2">
            <span v-for="word in labelWords" v-if="word !== ''" v-bind:key="word" class="result-word card blue lighten-5">{{ word }}</span>
          </div>
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
                    <span class="right">{{ new Date(tweet.created_at).getMonth() }}月{{ new Date(tweet.created_at).getDate() }}日 {{ ('00' + new Date(tweet.created_at).getHours()).slice(-2) }}:{{ ('00' + new Date(tweet.created_at).getMinutes()).slice(-2) }}</span>
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
        emotion: '',
        user: '',
        // area: '',
        images: '',
        videos: ''
      },
      query: '',
      wordLabel: '',
      labelWords: [],
      tweets: []
    }
  },
  methods: {
    submit: function () {
      let wL = ''
      let q = ''
      for (let param in this.parameters) { // クエリに使うパラメータを組み立て
        console.log(this.parameters[param])
        if (this.parameters[param] !== '' && this.parameters[param] !== null && this.parameters[param] !== undefined && this.parameters[param] !== false) {
          if (param === 'word') {
            q += this.parameters[param] + ' '
            wL += this.parameters[param] + ','
          } else if (param === 'exWord') {
            q += '-' + this.parameters[param] + ' '
            wL += '除外：' + this.parameters[param] + ','
          } else if (param === 'emotion') {
            if (this.parameters[param] === 'posi') {
              q += ':)' + ' '
              wL += ':)' + ','
            } else if (this.parameters[param] === 'nega') {
              q += ':(' + ' '
              wL += ':(' + ','
            }
          } else if (param === 'user') {
            q += 'from:' + this.parameters[param] + ' '
            wL += this.parameters[param] + ','
          } else if (param === 'images') {
            q += 'filter:' + param + ' '
            wL += '画像あり' + ','
          } else if (param === 'videos') {
            q += 'filter:' + param + ' '
            wL += '動画あり' + ','
          // } else if (param === 'area') {
          //   q += 'near:' + this.parameters[param] + ' '
          }
        }
      }
      this.wordLabel = wL
      console.log(this.wordLabel)
      this.labelWords = this.wordLabel.split(',')
      this.query = q
      console.log(this.query)

      axios.get('http://localhost:3030/twitter/search?q=' + this.query)
        .then((response) => {
          console.log(response)
          this.tweets = response.data.statuses
        })
        .catch((error) => {
          console.log(error)
        })
    },
    storeWord: function () {
      if (this.word !== '') {
        Words.commit('addWord', this.query)
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

.at-mark {
  margin: 28px 0 0 0;
  padding: 0 5px 0 0;
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
  margin: 10px 0 0 0;
  padding: 0 5px 0 5px;
  border-right: solid 2px #00acc155;
  border-left: solid 2px #00acc155;
}

/* 共通でない */
.result-words {
  padding: 10px 0 10px 0;
  margin-bottom: 2px;
}

/* 共通でない */
.result-word {
  /* padding: 10px 0 10px 0;
  margin-bottom: 2px; */
  font-size: 1.5em;
  margin: 5px;
  padding: 5px;
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
