<template>
  <div class="desc">
    <h3><strong class="logo-text">TWITTEE</strong> とは？</h3>
    <p class="desc-p desc-p-top">好きなアイドルの情報を見逃したくない人、</p>
    <p class="desc-p">好きなラーメン屋の感想ツイートを頻繁に見ている人、</p>
    <p class="desc-p">自分の名前をエゴサしたいアイドル、</p>
    <p class="desc-p">などの皆さん、</p>
    <p class="desc-p">もう何度も検索を行う必要はありません！！</p>

    <p class="desc-p">TWITTEE は、自由な検索ワードからツイッターのタイムラインを作成することのできるサイトです！</p>
    <p class="desc-p">ツイッターアカウントも当サイトのアカウント登録も必要ありません！</p>
    <p class="desc-p">気になるワードを検索し、ボタン一つで、タイムラインが作成できます！</p>

    <img src="../assets/search_desc_image_1.png" class="responsive-img desc-image" alt="">
    <img src="../assets/feed_desc_image_1.png" class="responsive-img desc-image" alt="">
  </div>
</template>

<script>
export default {
  name: 'Desc',
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.desc {
  height: 100%;
  padding: 0 10% 0 10%;
  overflow-y: scroll;
}

.logo-text {
  font-family: impact;
  font-size: 1.3em;
}

.desc-p-top {
  margin: 5% 0 0 0;
}

.desc-p {
  font-size: 1.5em;
}

.desc-image {
  width: 90%;
  margin: 5% 0 0 0;
  border: 1px solid #90caf9;
}
</style>
