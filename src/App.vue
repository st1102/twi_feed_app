<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue lighten-2">
        <router-link to="/" class="brand-logo center">Logo</router-link>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a href="">What's this site ?</a></li>
        </ul>
      </div>
    </nav>

    <div class="row main-area">
      <div class="col s2 blue lighten-1 side-bar">
        <ul class="sidenav">
          <li><router-link to="/search" class="black-text"><i class="material-icons left black-text">search</i>Search</router-link></li>
          <br />
          <li><router-link to="/myfeeds" class="black-text"><i class="material-icons left black-text">format_align_left</i>MyFeeds</router-link></li>
        </ul>
      </div>
      <div class="col s10 router-area">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
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

.main-area {
  /* ヘッダー分マイナス */
  height: calc(100% - (64px + 12px));
}

.side-bar {
  height: 100%;
  margin-top: 12px;
}

.router-area {
  height: 100%;
}
</style>
