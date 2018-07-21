<template>
  <div class="main">
    <div class="result-feeds">
      <div v-if="queries.length === 0" class="no-feed-div valign-wrapper">
        <span class="no-feed-text blue-text">
          Search words and Add your original feed !!
        </span>
      </div>
      <div v-else v-for="(query, index) in queries" v-bind:key="query" class="result-feed">
        <!-- <h5 class="result-word z-depth-2">{{ query }}</h5> -->
        <div class="result-words z-depth-2">
          <span v-for="word in labelWords[index]" v-if="word !== ''" v-bind:key="word" class="result-word blue lighten-5">{{ word }}</span>
        </div>
        <ul class="collection tweet-list">
          <li v-for="tweet in wordsAndTweets[query]" v-bind:key="tweet.id" class="collection-item one-tweet">
            <!-- リツイート -->
            <!-- <div v-if="tweet.retweeted_status" class="row tweet-content-row retweet">
              <div class="col s12 retweet-label">
                <i class="material-icons left green-text fav-retweet-icons">repeat</i><span class="left retweet-username">{{tweet.user.name}} Retweeted</span>
              </div>
              <div class="col s2 profile-img-col">
                <img class="circle profile-img" v-bind:src="tweet.retweeted_status.user.profile_image_url.replace('_normal.jpg', '_bigger.jpg')">
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
              <div class="col s2 profile-img-col">
                <img class="circle profile-img" v-bind:src="tweet.user.profile_image_url.replace('_normal.jpg', '_bigger.jpg')">
              </div>
              <div class="col s10 user-text">
                <div class="section">
                  <span class="name-id-icon">
                    <span class="user-name">{{ tweet.user.name }}</span>
                    <span>@{{ tweet.user.screen_name }}</span>
                  </span>
                  <span class="verified-icon-span" v-if="tweet.user.verified"><i class="verified-icon material-icons blue-text text-lighten-3">check_circle</i></span>
                  <span class="tweet-time right">{{ new Date(tweet.created_at).getMonth()+1 }}月{{ new Date(tweet.created_at).getDate() }}日 {{ ('00' + new Date(tweet.created_at).getHours()).slice(-2) }}:{{ ('00' + new Date(tweet.created_at).getMinutes()).slice(-2) }}</span>
                </div>
                <div class="section">
                  <div class="tweet-text">
                    {{ tweet.full_text }}
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
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

export default {
  name: 'MyFeeds',
  data () {
    return {
      queries: [],
      wordsAndTweets: {},
      labelWords: {}
    }
  },
  methods: {

  },
  created () {
    this.queries = this.$store.getters.getQueries
    this.labelWords = this.$store.getters.getWords
    for (let query of this.queries) {
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

.no-feed-div {
  height: 100%;
  width: 100%;
}

.no-feed-text {
  display: inline-block;
  width: 100%;
  font-size: 2.5em;
}

.retweet-label {
  margin: 0 0 8px 0;
}

.retweet-username {
  margin: 0 0 0 5px;
}

.result-feed {
  height: 100%;
  width: 400px;
  flex-grow: 0;
  flex-shrink: 0;
  margin: 12px 0 0 0;
  padding: 0 5px 0 5px;
  border-right: solid 2px #00acc155;
  border-left: solid 2px #00acc155;
}

.result-words {
  min-height: 54px;
  vertical-align: middle;
  overflow-x: scroll;
  white-space: nowrap;
}

.result-word {
  display: inline-block;
  font-size: 1.5em;
  margin: 5px;
  padding: 5px;
  white-space: nowrap;
  border-radius: 2px;
  box-shadow: 0px 1px 2px #00000055;
}

.tweet-list {
  height: calc(100% - (47px + 2px));
  overflow: scroll;
  margin: 0;
}

.one-tweet {
  border-bottom: solid 1px #eeeeee !important;
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

.name-id-icon {
  display: inline-block;
  width: 60%;
  /* height: 1.8em;
  line-height: 1.6; */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: middle;
}

.user-name {
  font-weight: bold;
}

.verified-icon-span{
  /* display: inline-block; */
}

.verified-icon {
  display: inline-block;
  /* padding: 0 0 5px 0; */
  font-size: 1.2em;
  vertical-align: middle;
}
.profile-img {
  width: 50px;
}

.profile-img-col {
  padding-left: 0;
}

.tweet-time {
  font-size: 0.8em;
}

.tweet-text {
  margin: 5px 0 10px 0;
}

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
  height: 100%;
  object-fit: contain;
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
