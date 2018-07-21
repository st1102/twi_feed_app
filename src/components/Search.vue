<template>
  <div class="search">
    <div class="row search-row">
      <!-- search area -->
      <div class="col s4 search-col">
        <div class="row">
          <div class="input-field col s12">
            <input id="search-word" v-model="parameters.word" v-on:keyup.enter="submit" type="text" autocomplete="off">
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
          <div class="media-check-field col s12">
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
          <button class="btn waves-effect waves-light submit-btn right blue darken-1" v-on:click="submit">検索
            <i class="material-icons right">search</i>
          </button>
        </div>
      </div>
      <!-- result area -->
      <div class="col s8 result-col">
        <div class="result-feed">
          <div class="result-words z-depth-2">
            <span v-for="word in labelWords" v-if="word !== ''" v-bind:key="word" class="result-word card blue lighten-5">{{ word }}</span>
          </div>
          <a class="btn-floating btn-large waves-effect waves-light blue add-button" v-on:click="storeQueryWord"><i class="material-icons">playlist_add</i></a>
          <div v-if="tweets.length === 0" class="no-tweets-outer">
            <div class="no-tweets-inner">
              <span class="no-tweets-text blue-text valign-wrapper">no result<i class="material-icons no-tweets-icon medium blue-text">sentiment_neutral</i></span>
            </div>
          </div>
          <ul v-else class="collection tweet-list">
            <li v-for="tweet in tweets" v-bind:key="tweet.id" class="collection-item">
              <!-- リツイート -->
              <!-- <div v-if="tweet.retweeted_status" class="row tweet-content-row retweet">
                <div class="col s12 retweet-label">
                  <i class="material-icons left green-text fav-retweet-icons">repeat</i><span class="left retweet-username">{{tweet.user.name}} Retweeted</span>
                </div>
                <div class="col s2">
                  <img class="circle responsive-img profile-img" v-bind:src="tweet.retweeted_status.user.profile_image_url.replace('_normal.jpg', '_bigger.jpg')">
                </div>
                <div class="col s10 user-text">
                  <div class="section">
                    <span class="name-id">
                      <span class="user-name">{{ tweet.retweeted_status.user.name }}</span>
                      <span>@{{ tweet.retweeted_status.user.screen_name }}</span>
                    </span>
                    <span class="tweet-time right">{{ new Date(tweet.retweeted_status.created_at).getMonth() }}月{{ new Date(tweet.retweeted_status.created_at).getDate() }}日 {{ ('00' + new Date(tweet.retweeted_status.created_at).getHours()).slice(-2) }}:{{ ('00' + new Date(tweet.retweeted_status.created_at).getMinutes()).slice(-2) }}</span>
                  </div>
                  <div class="section">
                    <div class="tweet-text">
                      {{ tweet.retweeted_status.text }}
                    </div>
                    <div class="center tweet-media" v-if="tweet.extended_entities">
                      <div class="tweet-medium" v-if="tweet.extended_entities.media.length > 1" v-for="media in tweet.extended_entities.media" v-bind:key="media.id">
                        <img v-if="media.type === 'photo'" class="responsive-img tweet-picture" v-bind:src="media.media_url">
                      </div>
                      <div class="tweet-medium-one valign-wrapper" v-if="tweet.extended_entities.media.length === 1" v-for="media in tweet.extended_entities.media" v-bind:key="media.id">
                        <img v-if="media.type === 'photo'" class="responsive-img tweet-picture-one" v-bind:src="media.media_url">
                        <video v-if="media.type === 'video'" class="responsive-video tweet-video" width="430" height="240" controls>
                          <source v-bind:src="media.video_info.variants[0].url">
                        </video>
                      </div>
                    </div>
                    <div class="fav-retweet">
                      <div class="fav-retweet-div">
                        <i class="material-icons left black-text fav-retweet-icons">repeat</i>{{ tweet.retweeted_status.favorite_count }}
                      </div>
                      <div class="fav-retweet-div">
                        <i class="material-icons left black-text fav-retweet-icons">favorite_border</i>{{ tweet.retweeted_status.retweet_count }}
                      </div>
                    </div>
                  </div>
                </div>
              </div> -->
              <!-- リツイートでない -->
              <div class="row tweet-content-row">
                <div class="col s2">
                  <img class="circle responsive-img profile-img" v-bind:src="tweet.user.profile_image_url.replace('_normal.jpg', '_bigger.jpg')">
                </div>
                <div class="col s10 user-text">
                  <div class="section">
                    <span class="name-id">
                      <span class="user-name">{{ tweet.user.name }}</span>
                      <span>@{{ tweet.user.screen_name }}</span>
                    </span>
                    <span class="tweet-time right">{{ new Date(tweet.created_at).getMonth() }}月{{ new Date(tweet.created_at).getDate() }}日 {{ ('00' + new Date(tweet.created_at).getHours()).slice(-2) }}:{{ ('00' + new Date(tweet.created_at).getMinutes()).slice(-2) }}</span>
                  </div>
                  <div class="section">
                    <div class="tweet-text">
                      {{ tweet.text }}
                    </div>
                    <div class="center tweet-media" v-if="tweet.extended_entities">
                      <div class="tweet-medium" v-if="tweet.extended_entities.media.length > 1" v-for="media in tweet.extended_entities.media" v-bind:key="media.id">
                        <img v-if="media.type === 'photo'" class="responsive-img tweet-picture" v-bind:src="media.media_url">
                      </div>
                      <div class="tweet-medium-one valign-wrapper" v-if="tweet.extended_entities.media.length === 1" v-for="media in tweet.extended_entities.media" v-bind:key="media.id">
                        <img v-if="media.type === 'photo'" class="responsive-img tweet-picture-one" v-bind:src="media.media_url">
                        <video v-if="media.type === 'video'" class="responsive-video tweet-video" width="430" height="240" controls>
                          <source v-bind:src="media.video_info.variants[0].url">
                        </video>
                      </div>
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
      this.labelWords = this.wordLabel.split(',')
      this.query = q + ' exclude:retweets'

      axios.get('http://localhost:3030/twitter/search?q=' + this.query)
        .then((response) => {
          console.log(response)
          this.tweets = response.data.statuses
        })
        .catch((error) => {
          console.log(error)
        })
    },
    storeQueryWord: function () {
      if (this.query !== '') {
        this.$store.commit('addQuery', this.query)
      }
      if (this.labelWords.length !== 0) {
        this.$store.commit('addWords', this.labelWords)
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

.media-check-field {
  margin: 30px 0 0 0;
}

.posi-nega-field {
  margin: 35px 0 0 0;
}

.emotion-field {
  margin: 5px 0 5px 0;
}

.submit-btn {
  margin: 36px 0 0 0;
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

.no-tweets-outer {
  height: 100%;
  width: 100%;
}

.no-tweets-inner {
  /* TODO: もっと良い形に改善 */
  position: relative;
  top: 40%;
  left: 35%;
}

.no-tweets-text {
  font-size: 2.5em;
}

.no-tweets-icon {
  margin: 0 0 0 8px;
  font-size: 1em;
}

.retweet-label {
  margin: 0 0 8px 0;
}

.retweet-username {
  margin: 0 0 0 5px;
}

.result-feed {
  height: 100%;
  margin: 12px 0 0 0;
  padding: 0 5px 0 5px;
  border-right: solid 2px #00acc155;
  border-left: solid 2px #00acc155;
}

.result-words {
  vertical-align: middle;
  height: 54px;
}

.result-word {
  display: inline-block;
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

.profile-img {
  width: 50px;
}

.tweet-text {
  margin: 5px 0 10px 0;
}

.tweet-media {
  display: flex;
  height: 330px;
  margin: 15px 0 0 0;
  overflow-x: scroll;
}

.tweet-medium {
  flex-grow: 0;
  flex-shrink: 0;
}

.tweet-medium-one {
  width: 100%;
  height: 95%;
}

.tweet-picture {
  object-fit: contain;
  width: 350px;
  height: 95%;
  background-color: #000;
  border: solid 1px #fff;
  border-radius: 10px;

}

.tweet-picture-one {
  object-fit: contain;
  width: 100%;
  height: 100%;
  background-color: #000;
  border: solid 1px #fff;
  border-radius: 10px;
}

.tweet-video {
  display: inline-block;
  width: 100%;
  height: auto;
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
