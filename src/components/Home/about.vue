<template>
  <div class="about_box">
    <div class="about_content">
      <div class="about_title">
        <p>ABOUT ME</p>
      </div>
      <div>
        <div class="about_cart" v-for="res in List" :key="res.id">
          <img :src="res.imgurl" alt />
          <div>
            <h4>{{res.title}}</h4>
            <p>{{res.content}}</p>
            <span>{{res.time}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      List: [],
    };
  },
  created() {
    this.info();
  },
  methods: {
    info() {
      this.List = [
        {
          id: "1",
          imgurl: require("../../assets/img/Home/01.png"),
          title: "JAVA入门到放弃",
          content: "JAVA",
          time: "2020.02.22",
        },
        {
          id: "2",
          imgurl: require("../../assets/img/Home/02.png"),
          title: "Flutter入门到放弃",
          content: "flutter",
          time: "2020.03.22",
        },
        {
          id: "3",
          imgurl: require("../../assets/img/Home/03.png"),
          title: "React入门到放弃",
          content: "react",
          time: "2020.04.22",
        },
        {
          id: "4",
          imgurl: require("../../assets/img/Home/04.png"),
          title: "UE4入门到放弃",
          content: "ue4",
          time: "2020.06.22",
        },
      ];
    },
  },
};
</script>

<style scoped>
@import "../../assets/css/home/about.css"
</style>