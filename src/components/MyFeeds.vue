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
        <div class="result-feed-header z-depth-2">
          <div class="result-words">
            <span v-for="word in labelWords[index]" v-if="word !== ''" v-bind:key="word" class="result-word blue lighten-5">{{ word }}</span>
          </div>
          <a class="feed-delete-a " v-on:click="deleteFeed(index)" href="#"><i class="material-icons feed-delete-icon black-text waves-effect waves-blue">delete</i></a>
          <a class="feed-reload-a" v-on:click="reloadFeed(index)" href="#"><i class="material-icons feed-reload-icon black-text waves-effect waves-blue">refresh</i></a>
        </div>
        <ul class="collection tweet-list">
          <li v-for="tweet in wordsAndTweets[query]" v-bind:key="tweet.id" class="collection-item one-tweet">
            <div class="row tweet-content-row">
              <div class="col s2 profile-img-col">
                <img class="circle profile-img" v-bind:src="tweet.user.profile_image_url.replace('_normal.jpg', '_bigger.jpg')">
              </div>
              <div class="col s10 user-text">
                <div class="section">
                  <span class="name-id-icon">
                    <!-- ユーザプロフィールのトリガー -->
                    <a class="modal-trigger prof-modal-trigger black-text" href="#user-prof" v-on:click="getUserProf(tweet.user.screen_name, tweet.user.name)"><span class="user-name">{{ tweet.user.name }}</span></a>
                    <span class="verified-icon-span" v-if="tweet.user.verified"><i class="verified-icon material-icons blue-text text-lighten-3">check_circle</i></span>
                    <span>@{{ tweet.user.screen_name }}</span>
                  </span>
                  <span class="verified-icon-span" v-if="tweet.user.verified"><i class="verified-icon material-icons blue-text text-lighten-3">check_circle</i></span>
                  <span class="tweet-time right">{{ new Date(tweet.created_at).getMonth()+1 }}月{{ new Date(tweet.created_at).getDate() }}日 {{ ('00' + new Date(tweet.created_at).getHours()).slice(-2) }}:{{ ('00' + new Date(tweet.created_at).getMinutes()).slice(-2) }}</span>
                </div>
                <div class="section">
                  <div class="tweet-text">
                    <div v-if="tweet.entities.media" class="text-with-media">
                      <div class="text-with-entities" v-html="replaceEntities(deleteMediaUrls(tweet.full_text, tweet.entities.media), tweet.entities)">
                      <!-- <div class="text-with-entities" v-on:load="replaceEntities(deleteMediaUrls(tweet.full_text, tweet.entities.media), tweet.entities)"> -->
                        <!-- {{t}} -->
                      </div>
                    </div>
                    <div v-else>
                      <div class="text-with-entities" v-html="replaceEntities(tweet.full_text, tweet.entities)">
                      <!-- <div class="text-with-entities" v-on:load="replaceEntities(tweet.full_text, tweet.entities)">
                        {{t}} -->
                      </div>
                    </div>
                    <div v-if="tweet.quoted_status" class="quoted-tweet">
                      <div class="section">
                        <span class="name-id-icon">
                          <span class="user-name">{{ tweet.quoted_status.user.name }}</span>
                          <span class="verified-icon-span" v-if="tweet.quoted_status.user.verified"><i class="verified-icon material-icons blue-text text-lighten-3">check_circle</i></span>
                          <span>@{{ tweet.quoted_status.user.screen_name }}</span>
                        </span>
                      </div>
                      <div class="section">
                        <div class="tweet-text">
                          {{ tweet.quoted_status.full_text }}
                        </div>
                        <div class="center tweet-media" v-if="tweet.quoted_status.extended_entities">
                          <div class="tweet-medium" v-if="tweet.quoted_status.extended_entities.media.length > 1" v-for="media in tweet.quoted_status.extended_entities.media" v-bind:key="media.id">
                            <img v-if="media.type === 'photo'" class="responsive-img tweet-picture" v-bind:src="media.media_url">
                          </div>
                          <div class="tweet-medium-one valign-wrapper" v-if="tweet.quoted_status.extended_entities.media.length === 1" v-for="media in tweet.quoted_status.extended_entities.media" v-bind:key="media.id">
                            <img v-if="media.type === 'photo'" class="responsive-img tweet-picture-one" v-bind:src="media.media_url">
                            <video v-if="media.type === 'video'" class="responsive-video tweet-video" width="430" height="240" controls>
                              <source v-bind:src="media.video_info.variants[0].url">
                            </video>
                          </div>
                        </div>
                        <div class="fav-retweet">
                          <div class="fav-retweet-div">
                            <i class="material-icons left black-text fav-retweet-icons">repeat</i>{{ tweet.quoted_status.favorite_count }}
                          </div>
                          <div class="fav-retweet-div">
                            <i class="material-icons left black-text fav-retweet-icons">favorite_border</i>{{ tweet.quoted_status.retweet_count }}
                          </div>
                        </div>
                      </div>
                    </div>
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
    <!-- Modal Structure -->
    <div id="user-prof" class="modal user-prof-modal">
      <div class="">
        <span href="#!" class="modal-close waves-effect waves-blue btn-flat left"><i class="material-icons modal-close-icon">close</i></span>
      </div>
      <div class="modal-content">
        <div class="modal-content-row row">
          <div class="user-prof-info col s4">
            <div class="prof-info-row row">
              <div class="user-prof-img col s12">
                <img class="circle responsive-img modal-prof-img left" v-bind:src="profInfo.image.replace('_normal.jpg', '_bigger.jpg')">
              </div>
              <div class="prof-name-col col s12">
                <span class="left prof-name left-align">{{profInfo.name}}</span>
              </div>
              <div class="user-prof-id col s12">
                <span class="left prof-id left-align">＠{{profInfo.id}}</span>
              </div>
              <div class="user-prof-ff col s12">
                <div class="ff-row">
                  <div class="prof-follow-col col s6">
                    <div class="prof-follow-label">フォロー</div>
                    <div class="prof-follow">{{profInfo.follow}}</div>
                  </div>
                  <div class="prof-follower-col col s6">
                    <div class="prof-follower-label">フォロワー</div>
                    <div class="prof-follower">{{profInfo.follower}}</div>
                  </div>
                </div>
              </div>
              <div v-if="profInfo.location" class="prof-location-col col s12">
                <span class="left prof-location left-align valign-wrapper"><i class="material-icons left location-icon">location_on</i>{{profInfo.location}}</span>
              </div>
              <div class="user-prof-desc col s12">
                <span class="left prof-desc left-align">{{profInfo.desc}}</span>
              </div>
              <div class="user-prof-date col s12">
                <span class="left prof-date left-align valign-wrapper"><i class="material-icons left join-icon">perm_contact_calendar</i>{{ new Date(profInfo.date).getFullYear() }}年{{ new Date(profInfo.date).getMonth()+1 }}月{{ new Date(profInfo.date).getDate() }}日から</span>
              </div>
            </div>
          </div>
          <div class="user-tweets col s8">
            <div class="user-tweets-header z-depth-2 valign-wrapper">
              <span class="user-tweets-label">Tweets</span>
            </div>
            <a class="btn-floating btn-large waves-effect waves-light blue user-add-button" v-on:click="storeUser"><i class="material-icons">playlist_add</i></a>
            <ul class="collection user-tweet-list">
              <li v-for="tweet in profInfo.tweets" v-bind:key="tweet.id" class="collection-item user-tweet">
                <div class="row tweet-content-row">
                  <div class="col s2">
                    <img class="circle responsive-img profile-img" v-bind:src="tweet.user.profile_image_url.replace('_normal.jpg', '_bigger.jpg')">
                  </div>
                  <div class="col s10 user-text">
                    <div class="section">
                      <span class="name-id-icon">
                        <!-- ユーザプロフィールのトリガー -->
                        <a class="black-text"><span class="user-name">{{ tweet.user.name }}</span></a>
                        <span class="verified-icon-span" v-if="tweet.user.verified"><i class="verified-icon material-icons blue-text text-lighten-3">check_circle</i></span>
                        <span>@{{ tweet.user.screen_name }}</span>
                      </span>
                      <span class="tweet-time right">{{ new Date(tweet.created_at).getMonth()+1 }}月{{ new Date(tweet.created_at).getDate() }}日 {{ ('00' + new Date(tweet.created_at).getHours()).slice(-2) }}:{{ ('00' + new Date(tweet.created_at).getMinutes()).slice(-2) }}</span>
                    </div>
                    <div class="section">
                      <div class="tweet-text">
                        <div v-if="tweet.entities.media" class="text-with-media">
                          <div class="text-with-entities" v-html="replaceEntities(deleteMediaUrls(tweet.full_text, tweet.entities.media), tweet.entities)">
                          </div>
                        </div>
                        <div v-else>
                          <div class="text-with-entities" v-html="replaceEntities(tweet.full_text, tweet.entities)">
                          </div>
                        </div>
                        <div v-if="tweet.quoted_status" class="quoted-tweet">
                          <div class="section">
                            <span class="name-id-icon">
                              <span class="user-name">{{ tweet.quoted_status.user.name }}</span>
                              <span class="verified-icon-span" v-if="tweet.quoted_status.user.verified"><i class="verified-icon material-icons blue-text text-lighten-3">check_circle</i></span>
                              <span>@{{ tweet.quoted_status.user.screen_name }}</span>
                            </span>
                          </div>
                          <div class="section">
                            <div class="tweet-text">
                              {{ tweet.quoted_status.full_text }}
                            </div>
                            <div class="center tweet-media" v-if="tweet.quoted_status.extended_entities">
                              <div class="tweet-medium" v-if="tweet.quoted_status.extended_entities.media.length > 1" v-for="media in tweet.quoted_status.extended_entities.media" v-bind:key="media.id">
                                <img v-if="media.type === 'photo'" class="responsive-img tweet-picture" v-bind:src="media.media_url">
                              </div>
                              <div class="tweet-medium-one valign-wrapper" v-if="tweet.quoted_status.extended_entities.media.length === 1" v-for="media in tweet.quoted_status.extended_entities.media" v-bind:key="media.id">
                                <img v-if="media.type === 'photo'" class="responsive-img tweet-picture-one" v-bind:src="media.media_url">
                                <video v-if="media.type === 'video'" class="responsive-video tweet-video" width="430" height="240" controls>
                                  <source v-bind:src="media.video_info.variants[0].url">
                                </video>
                              </div>
                            </div>
                            <div class="fav-retweet">
                              <div class="fav-retweet-div">
                                <i class="material-icons left black-text fav-retweet-icons">repeat</i>{{ tweet.quoted_status.favorite_count }}
                              </div>
                              <div class="fav-retweet-div">
                                <i class="material-icons left black-text fav-retweet-icons">favorite_border</i>{{ tweet.quoted_status.retweet_count }}
                              </div>
                            </div>
                          </div>
                        </div>
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
      labelWords: {},
      query: '',
      profInfo: {
        image: '',
        name: '',
        id: '',
        follow: '',
        follower: '',
        location: '',
        desc: '',
        date: '',
        tweets: []
      },
      userQuery: '',
      userLabel: []
    }
  },
  methods: {
    deleteFeed: function (index) {
      console.log(index)
      this.$store.commit('deleteWords', index)
      this.$store.commit('deleteQuery', index)
    },
    storeUser: function () {
      if (this.userQuery !== '') {
        this.$store.commit('addQuery', this.userQuery)
      }
      if (this.userLabel.length !== 0) {
        this.$store.commit('addWords', this.userLabel)
        this.userLabel = []
      }
      this.queries = this.$store.getters.getQueries
      this.labelWords = this.$store.getters.getWords
      console.log(this.queries)
      // console.log(this.labelWords)
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
    },
    getUserProf: function (screenName, name) {
      console.log(screenName)
      axios.get('http://localhost:3030/twitter/user?screen_name=' + screenName)
        .then((response) => {
          console.log(response)
          this.profInfo.image = response.data.profile_image_url
          this.profInfo.name = response.data.name
          this.profInfo.id = response.data.screen_name
          this.profInfo.follow = response.data.friends_count
          this.profInfo.follower = response.data.followers_count
          this.profInfo.location = response.data.location
          this.profInfo.desc = response.data.description
          this.profInfo.date = response.data.created_at
          // this.profInfo.background = '#' + response.data.profile_background_color
        })
        .catch((error) => {
          console.log(error)
        })

      axios.get('http://localhost:3030/twitter/search?q=from:' + screenName)
        .then((response) => {
          console.log(response)
          this.profInfo.tweets = response.data.statuses
        })
        .catch((error) => {
          console.log(error)
        })

      this.userQuery = 'from:' + screenName
      this.userLabel[0] = name
    },
    deleteMediaUrls: function (text, mediaUrls) {
      if (mediaUrls.length === 0) {
        return text
      } else {
        text = text.replace(mediaUrls[0].url, '')
        return text
      }
    },
    replaceEntities: function (text, entities) {
      if (entities.urls.length !== 0) {
        for (let url of entities.urls) {
          text = text.replace(url.url, '<a href="' + url.url + '"' + 'target="_blank">' + url.url + '</a>')
        }
      }
      if (entities.user_mentions.length !== 0) {
        for (let mention of entities.user_mentions) {
          // text = text.replace('@' + mention.screen_name, '<a class="modal-trigger prof-link-trigger blue-text" href="#user-prof" v-on:click="getUserProf(mention.screen_name)">@' + mention.screen_name + '</a>')
          text = text.replace('@' + mention.screen_name, '<a class="prof-link-trigger blue-text" href="#user-prof">@' + mention.screen_name + '</a>')
          // text = text.replace('@' + mention.screen_name, '<user-link v-bind:linkScreenName="' + mention.screen_name + '"></user-link>')
        }
      }
      return text
      // this.t = text
    },
    reloadFeed: function (index) {
      axios.get('http://localhost:3030/twitter/search?q=' + this.queries[index])
        .then((response) => {
          console.log(response)
          Vue.set(this.wordsAndTweets, this.queries[index], response.data.statuses)
          console.log(this.wordsAndTweets)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  created () {
    // データ初期化
    // this.$store.commit('clearWords')
    // this.$store.commit('clearQuery')
    // console.log(this.$store.getters.getQueries)
    // console.log(this.$store.getters.getWords)
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
  },
  mounted () {
    $(document).ready(function () {
      $('.modal').modal()
    })
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

.result-feed-header {
  position: relative;
}

.result-words {
  min-height: 54px;
  /* width: calc(100% - 4px - 24px - 4px - 24px - 4px); */
  margin: 0 calc(4px + 24px + 4px + 24px + 4px) 0 calc(4px + 24px + 4px + 24px + 4px);
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

.feed-delete-a {
  display: inline-block;
  position: absolute;
  /* 縦中央寄せ */
  top: calc(54px/2 - 24px/2);
  right: 0;
  margin: 0 4px 0 4px;
}

.feed-delete-icon {
  border: 1px;
  border-radius: 50%;
}

.feed-reload-a {
  display: inline-block;
  position: absolute;
  /* 縦中央寄せ */
  top: calc(54px/2 - 24px/2);
  right: calc(24px + 4px);
  margin: 0 4px 0 4px;
}

.feed-reload-icon {
  border: 1px;
  border-radius: 50%;
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

.quoted-tweet {
  margin: 10px 0 10px 0;
  padding: 10px;
  border: solid 1px #00000033;
  border-radius: 5px;
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

/* モーダル */
.prof-modal-trigger {
  text-decoration: none;
}

.prof-modal-trigger:hover {
  text-decoration: underline;
}

.user-prof-modal {
  height: 100% !important;
}

.modal-content {
  height: 100%;
}

.modal-content-row {
  display: flex;
  height: 100%;
}

.modal-close {
  display: inline-block;
  padding: 0;
  margin: 0 5px 0 5px;
  font-size: 1em;
}

.modal-close-icon {
  font-size: 2rem;
}

.modal-prof-img {
  width: 80px;
  border: solid 2px #42a5f5;
}

.prof-name {
  margin: 10px 0 0 0;
  font-weight: bold;
}

.prof-id {
  font-weight: lighter;
}

.prof-ff {
  margin: 5px 0 0 0;
}

.prof-follow-col {
  padding: 0;
}

.prof-follower-col {
  padding: 0;
}

.prof-location-col {
  margin: 10px 0 0 0;
}

.location-icon {
  margin: 0;
}

.prof-desc {
  margin: 10px 0 0 0;
}

.prof-date {
  margin: 10px 0 0 0;
}

.join-icon {
  margin: 0;
}

.user-tweets {
  height: 100%;
  padding: 0 4px 0 4px;
  border-right: solid 2px #00acc155;
  border-left: solid 2px #00acc155;
}

.user-tweet-list {
  /* ヘッダー分 + α マイナス */
  height: calc(100% - 40px - 8px);
  overflow-y: scroll;
}

.user-tweets-header {
  height: 40px;
}

.user-tweets-label {
  width: 100%;
  font-size: 1.6em;
  font-weight: bold;
}

.user-add-button {
  position: absolute;
  top: 34px;
  right: 8%;
}
</style>
