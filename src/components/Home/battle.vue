<template>
<div class="battle_box">
    <div class="battle_head">
        <p>BATTLE  VALUE</p>
    </div>
    <div class="banner_box">
        <div class="left_box">
           <div v-for="res in ListLeft" :key="res.name">
                <div class="skill">{{res.name}}</div>
                <el-progress :percentage="res.progress" class="progress"></el-progress>
           </div>
        </div>
        <div class="bulb"> 
            <img src="../../assets/img/Home/deng.png" alt="">
        </div>
        <div class="right_box">
             <div v-for="item in ListRight" :key="item.name">
                <div class="skill">{{item.name}}</div>
                <el-progress :percentage="item.progress" class="progress"></el-progress>
           </div>
        </div>
    </div>
    <div class="bottom_box">
        <img src="../../assets/img/Home/bottom.jpg" alt="">
    </div>
</div>  
</template>

<script>
export default {
    data() {
        return {
            ListLeft:[],
            ListRight:[],
        }
    },
    created(){
        this.info();
    },
    methods: {
        info() {
            this.ListLeft = [
                {name:'JAVA', progress:80, color:'red'},
                {name:'C++', progress:30, color:'red'},
                {name:'Go', progress:50, color:'red'},
            ];
            this.ListRight = [
                {name:'Flutter', progress:40, color:'red'},
                {name:'Vue', progress:70, color:'red'},
                {name:'React', progress:20, color:'red'},
            ]
        }
    }
 }
</script>

<style scoped>
@import "../../assets/css/home/battle.css"
</style>