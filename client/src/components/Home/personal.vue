<template>
  <div class="head">
    <div class="content_box">
      <img src="https://image.xiaomo.info/logo/avatar.png" alt />
      <div class="introduce">生命不息奋斗不止（开发工程师--小莫）</div>
      <div class="content_img_box">
        <div class="img_box" v-for="res in imgList" :key="res.name">
            <img @click="link(res.link)" class="img_icon" :src="res.icon" alt  :title="res.name"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgList: [],
    };
  },
  created() {
      this.info()
  },
  methods: {
      info() {
          this.imgList = [
              {name:'博客',icon:'https://image.xiaomo.info/logo/avatar.png',link:'https://blog.xiaomo.info/'},
              {name:'GitHub',icon:require('../../assets/img/Home/github.png'),link:'https://github.com/houko'},
              {name:'bilibili',icon:require('../../assets/img/Home/bilibili.png'),link:'https://space.bilibili.com/6721344/#!/'},
              {name:'twitter',icon:require('../../assets/img/Home/twitter.png'),link:'https://twitter.com/xiaomoinfo'},
              {name:'关于小莫',icon:'https://image.xiaomo.info/xiaomo//logo.png',link:'https://blog.xiaomo.info/about.html#/welcome'},
              {name:'oracle认证',icon:'https://image.xiaomo.info/xiaomo//japan_ocp_silver.png',link:'https://www.youracclaim.com/users/xiaomoinfo/badges'},
              {name:'unity文档',icon:'https://image.xiaomo.info/xiaomo//unity.jpg',link:'https://unity.xiaomo.info/Manual/'},
              {name:'miku工具集',icon:'https://raw.githubusercontent.com/Ice-Hazymoon/MikuTools/master/static/icon.png',link:'https://miku.tools/'},

          ]
      },
      link(href) {
          window.location.href = href;
      }
  },
};
</script>

<style scoped>
@import "../../assets/css/home/personal.css";
</style>

