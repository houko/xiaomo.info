<template>
  <div class="content_works">
    <div class="works_box">
      <p>WORKS</p>
      <div>
        <div class="ban_box" v-for="res in imgList" :key="res.name">
            <img :src="res.imgurl" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgList:[]
    };
  },
  created() {
      this.info();
  },
  methods: {
      info() {
          this.imgList = [
              {name:'Vue',imgurl:require('../../assets/img/Home/01.png'),imgLink:''},
              {name:'React',imgurl:require('../../assets/img/Home/02.png'),imgLink:''},
              {name:'Flutter',imgurl:require('../../assets/img/Home/03.png'),imgLink:''},
              {name:'java',imgurl:require('../../assets/img/Home/04.png'),imgLink:''},
              {name:'c++',imgurl:require('../../assets/img/Home/05.png'),imgLink:''},
              {name:'PHP',imgurl:require('../../assets/img/Home/06.png'),imgLink:''},
              {name:'Go',imgurl:require('../../assets/img/Home/07.png'),imgLink:''},
              {name:'c',imgurl:require('../../assets/img/Home/08.png'),imgLink:''},
          ]
      }
  }
};
</script>

<style scoped>
@import "../../assets/css/home/works.css"
</style>