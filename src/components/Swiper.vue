<template lang="jade">
  div.swiper-show-container(:style="{ width: size.width + 'px', height: size.height + 'px'}"  v-on:click="increment")
    div.swiper-container(:style="{ width: container_width, transform: 'translate3d' + translate3d, transitionDuration: duration }")
        div.image-container(v-for="(item, index) of compouted_images")
            img(:src="item.src" v-bind:style="{ width: size.width + 'px', height: size.height + 'px'}")
    div.carousel-control
        div.pre_and_next.iconfont
            li.pre-btn
                a(v-on:click.prevent="turnToPre")
            li.next-btn
                a(v-on:click.prevent="turnToNext")
</template>
<script>
export default {
  props: ['images', 'size'],
  data () {
    return {
        cur_index: 0,
        axixX: 0,
        duration: '0.3s',
        interval: null
    }
  },
  computed: {
    container_width: function () {
        return this.size.width * this.compouted_images.length + 'px'
    },
    translate3d: function () {
        return '(' + this.axixX + 'px, 0, 0)'
    },
    /**
     * 图片数据进行加工，栈顶栈底分别插入一组数据
     * 类似 3，1，2，3，1
     */
    compouted_images: function () {
        let newImages = Object.assign([], this.images)
        // 首尾分别添加对应元素
        newImages.splice(0, 0, this.images[this.images.length - 1])
        newImages.push(this.images[0])
        return newImages
    }
  },
  created: function () {
    this.axixX = -this.size.width
    // 自动播放图片
    this.interval = setInterval(this.turnToNext, 3000)
  },
  methods: {
    /**
     * 手动向前滚动图片 
     */
    turnToPre: function () {
        if (this.cur_index === this.images.length - 1) {
            this.axixX = -(this.size.width) * this.images.length
            this.duration = 'inherit'
            setTimeout(this.timeout_for_left, 0)
        } else if (this.cur_index === 0) {
            this.axixX += this.size.width
            this.cur_index = this.images.length - 1
        } else {
            this.axixX += this.size.width
            this.cur_index --
        }
    },
    timeout_for_left: function (direc) {
        this.duration = '0.3s'
        this.axixX += this.size.width
        this.cur_index --
    },
    timeout_for_right: function () {
        this.duration = '0.3s'
        this.axixX = -this.size.width * 2
        this.cur_index ++
    },
    /**
     * 手动向后滚动图片
     */
    turnToNext: function () {
        if (this.cur_index === 0) {
            this.duration = 'inherit'
            this.axixX = -this.size.width
            // 处理过渡效果，视觉上看上去一个方向滚动
            setTimeout(this.timeout_for_right, 0)
        } else if (this.cur_index === this.images.length - 1) {
            this.axixX -= this.size.width
            this.cur_index = 0
        } else {
            this.axixX -= this.size.width
            this.cur_index ++
        }
    },
    increment: function () {
        // 父组件触发该事件
        this.$emit('clickimg', this.cur_index)
    }
  }
}
</script>
<style lang="scss">
    %_inherit_class {
        width: inherit;
        height: inherit;
    }
    .swiper-show-container {
        position: relative;
        overflow: hidden;
        cursor: pointer;
        &:hover .pre_and_next,  &:focus .pre_and_next{
            transition-duration: 2s;
            display: block;
        }
    }
    .swiper-container {
        position: absolute;
        transition-duration: 0.3s;
        backface-visibility:hidden;
        & > .image-container {
            float: left;
        }
    }
    .carousel-control {
        position: absolute;
        @extend %_inherit_class;
        & > .pre_and_next {
            position: absolute;
            top: 50%;
            @extend %_inherit_class;
            display: none;
        }
        .pre-btn, .next-btn {
            display: inline-block;
            position: absolute;
            & > a {
                width: 48px;
                height: 42px;
                display: block;
                background: transparent;
            }
        }
        .pre-btn {
            left: 0;
            & > a:before {
                content: '\e77a';
            }
        }
        .next-btn {
            right: 0;
            & > a:before {
                content: '\e776';
            }
        }
    }
</style>
