<template>
  <div class="main">
    <!-- <ul>
      <li v-for="(tweets, word) in this.wordsAndTweets" v-bind:key="word">
        {{ word }}
        <ul>
          <li v-for="tweet in tweets" v-bind:key="tweet.id">
            {{ tweet.user.name }}
            {{ tweet.text }}
          </li>
        </ul>
      </li>
    </ul> -->
    <div class="result-feeds">
      <div v-for="query in words" v-bind:key="query" class="result-feed">
        <h5 class="result-word z-depth-2">{{ query }}</h5>
        <ul class="collection tweet-list">
          <li v-for="tweet in wordsAndTweets[query]" v-bind:key="tweet.id" class="collection-item">
            <!-- リツイート -->
            <div v-if="tweet.retweeted_status" class="row tweet-content-row retweet">
              <div class="col s12 retweet-label">
                <i class="material-icons left green-text fav-retweet-icons">repeat</i><span class="left retweet-username">{{tweet.user.name}} Retweeted</span>
              </div>
              <div class="col s2">
                <img class="circle responsive-img" v-bind:src="tweet.retweeted_status.user.profile_image_url.replace('_normal.jpg', '_bigger.jpg')">
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
                  <!-- <div class="center tweet-pictures" v-if="tweet.retweeted_status.extended_entities">
                    <img class="responsive-img tweet-picture" v-for="picture in tweet.retweeted_status.extended_entities.media" v-bind:key="picture.id" v-bind:src="picture.media_url">
                  </div> -->
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
            </div>
            <!-- リツイートでない -->
            <div v-else class="row tweet-content-row">
              <div class="col s2">
                <img class="circle responsive-img" v-bind:src="tweet.user.profile_image_url.replace('_normal.jpg', '_bigger.jpg')">
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
                  <!-- <div class="center tweet-pictures" v-if="tweet.extended_entities">
                    <img class="responsive-img tweet-picture" v-for="picture in tweet.extended_entities.media" v-bind:key="picture.id" v-bind:src="picture.media_url">
                  </div> -->
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
    for (let query of this.words) {
      axios.get('http://localhost:3030/twitter/search?q=' + query)
        .then((response) => {
          console.log(response)
          Vue.set(this.wordsAndTweets, query, response.data.statuses)
          console.log(this.wordsAndTweets)
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
.main {
  height: 100%;
}

.result-feeds {
  display: flex;
  height: 100%;
  overflow-x: scroll;
}

.retweet-label {
  margin: 0 0 8px 0;
}

.retweet-username {
  margin: 0 0 0 5px;
}

/* ここより下 MyFeedsのフィード部分と共通 */
.result-feed {
  height: 100%;
  width: 400px;
  padding: 0 5px 0 5px;
  border-right: solid 2px #00acc155;
  border-left: solid 2px #00acc155;
}

/* .result-word {
  padding: 10px 0 10px 0;
  margin-bottom: 2px;
} */
.result-word {
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

.tweet-time {
  font-size: 0.8em;
}

/* .responsive-img {
  width: 50px;
} */

.tweet-text {
  margin: 5px 0 10px 0;
}

/* .tweet-pictures {
  margin: 10px 0 10px 0;
}

.tweet-picture {
  display: inline-block;
  width: 80%;
} */

.tweet-media {
  display: flex;
  height: 200px;
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
}

.tweet-picture-one {
  object-fit: contain;
  width: 100%;
  height: 100%;
  background-color: #000;
  border: solid 1px #fff;
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
