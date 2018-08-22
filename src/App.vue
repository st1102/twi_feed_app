<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue lighten-2">
        <ul class="nav-icons left hide-on-large-only">
          <li class="nav-icon"><a href="#" data-activates="nav-mobile" class="sidenav-trigger sidenav-collapse nav-icon-a"><i class="material-icons white-text tiny">menu</i></a></li>
          <li class="nav-icon"><a href="#" data-activates="search-mobile" class="sidenav-trigger search-collapse nav-icon-a"><router-link to="/search" class="black-text search-link"><i class="material-icons white-text tiny">search</i></router-link></a></li>
        </ul>
        <router-link to="" class="brand-logo center"><strong class="logo-text">TWITTEE</strong></router-link>
        <ul class="right hide-on-med-and-down">
          <li><router-link to="/desc" class="white-text">TWITTEE とは？</router-link></li>
        </ul>
      </div>
    </nav>

    <div class="main-area">
      <div id="nav-mobile" class="blue lighten-1 sidenav fixed side-bar">
        <ul>
          <li><router-link to="/search" class="black-text"><i class="material-icons left black-text">search</i>検索</router-link></li>
          <br />
          <li><router-link to="/myfeeds" class="black-text"><i class="material-icons left black-text">format_align_left</i>マイフィード</router-link></li>
          <br />
          <li><router-link to="/trends" class="black-text"><i class="material-icons left black-text">trending_up</i>トレンド</router-link></li>
        </ul>
      </div>
      <div class="router-area">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    $(document).ready(function () {
      $('.sidenav-collapse').sideNav({
        closeOnClick: true
      })
      $('.search-collapse').sideNav({
        closeOnClick: true
      })
    })
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  height: 100%;
}

#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.logo-text {
  font-family: impact;
  font-size: 1.3em;
}

.main-area {
  /* ヘッダー分マイナス */
  height: calc(100% - (64px + 12px));
}

.side-bar {
  position: fixed;
  height: 100%;
  width: 240px;
  margin-top: 12px;
  padding-left: 10px;
  z-index: 1000;
}

.router-area {
  height: 100%;
  padding-left: 240px;
}

@media only screen and (max-width : 992px) {
  #app {
    font-size: 0.8em;
  }

  .logo-text {
    font-size: 1.05em;
  }

  .nav-icon-a {
    padding: 0 5px 0 5px;
  }

  .search-link {
    padding: 0;
  }

  .search-link:hover {
    background: #00000000 !important;
  }

  .side-bar {
    position: fixed;
    height: 100%;
    width: 160px;
    margin-top: 12px;
    z-index: 1000;
  }

  .router-area {
    padding-left: 0px;
  }
}
</style>
