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
            <span v-for="word in labelWords" v-if="word !== ''" v-bind:key="word" class="result-word blue lighten-5">{{ word }}</span>
          </div>
          <a class="btn-floating btn-large waves-effect waves-light blue add-button" v-on:click="storeQueryWord"><i class="material-icons">playlist_add</i></a>
          <div v-if="tweets.length === 0" class="no-tweets-outer">
            <div class="no-tweets-inner">
              <span class="no-tweets-text blue-text valign-wrapper">no result<i class="material-icons no-tweets-icon medium blue-text">sentiment_neutral</i></span>
            </div>
          </div>
          <ul v-else class="collection tweet-list">
            <li v-for="tweet in tweets" v-bind:key="tweet.id" class="collection-item one-tweet">
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
                    <span class="name-id-icon">
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
                    <span class="name-id-icon">
                      <!-- ユーザプロフィールのトリガー -->
                      <a class="modal-trigger prof-modal-trigger black-text" href="#user-prof" v-on:click="getUserProf(tweet.user.screen_name, tweet.user.name)"><span class="user-name">{{ tweet.user.name }}</span></a>
                      <span class="verified-icon-span" v-if="tweet.user.verified"><i class="verified-icon material-icons blue-text text-lighten-3">check_circle</i></span>
                      <span>@{{ tweet.user.screen_name }}</span>
                    </span>
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
    </div>
    <!-- Modal Structure -->
    <div id="user-prof" class="modal user-prof-modal">
      <div class="">
        <span href="#!" class="modal-close waves-effect waves-green btn-flat left"><i class="material-icons modal-close-icon">close</i></span>
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
// import Vue from 'vue'
import axios from 'axios'

// Vue.component('user-link', {
//   props: ['linkScreenName'],
//   template: '<a class="modal-trigger prof-modal-trigger blue-text" href="#user-prof" v-on:click="getUserProf(linkScreenName)">@{{ linkScreenName }}</a>',
//   methods: {
//   }
// })

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
      tweets: [],
      // url: '',
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
        // background: ''
      },
      userQuery: '',
      userLabel: []
    }
  },
  methods: {
    submit: function () {
      let wL = ''
      let q = ''
      let hasImages = false
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
            hasImages = true
          } else if (param === 'videos') {
            if (hasImages) {
              q = q.replace('filter:images', 'filter:media')
              wL += '動画あり' + ','
            } else {
              q += 'filter:' + param + ' '
              wL += '動画あり' + ','
            }
          // } else if (param === 'area') {
          //   q += 'near:' + this.parameters[param] + ' '
          }
        }
      }
      this.wordLabel = wL
      this.labelWords = this.wordLabel.split(',')
      this.query = q + ' exclude:retweets'
      console.log(this.query)
      // let count = 0
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
        // TODO: 重複しているものは格納しないようにする
        this.$store.commit('addQuery', this.query)
      }
      if (this.labelWords.length !== 0) {
        this.$store.commit('addWords', this.labelWords)
      }
    },
    storeUser: function () {
      if (this.userQuery !== '') {
        this.$store.commit('addQuery', this.userQuery)
      }
      if (this.userLabel.length !== 0) {
        this.$store.commit('addWords', this.userLabel)
        this.userLabel = []
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
.search {
  height: 100%;
  overflow-x: hidden;
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

/* .retweet-label {
  margin: 0 0 8px 0;
}

.retweet-username {
  margin: 0 0 0 5px;
} */

.result-feed {
  height: 100%;
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
  overflow-y: scroll;
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
  display: inline-block;
}

.verified-icon {
  display: inline-block;
  padding: 0 0 5px 0;
  font-size: 1.2em;
  vertical-align: middle;
}

.profile-img {
  width: 60px;
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
