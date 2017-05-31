<template lang="jade">
    div.mySwiper
      swiper(v-bind:images="swiperSrcs" v-bind:size="imgSize" v-on:clickimg="click_img")
</template>
<script>
import a from '../assets/images/111.jpg'
import b from '../assets/images/222.jpg'
import c from '../assets/images/333.jpg'
export default {
  name: 'app',
  data () {
      return {
        imgSize: {
          width: 520,
          height: 280
        },
        swiperSrcs: [
            {src: a},
            {src: b},
            {src: c}
        ]
      }
  },
  methods: {
    click_img: function (index) {
      console.log(index)
    }
  }
}
</script>
<style lang="scss" scoped>
  .mySwiper {
    margin: 0 auto;
  }
</style>
