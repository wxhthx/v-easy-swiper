<template lang="jade">
  div.swiper-show-container(:style="{ width: size.width + 'px', height: size.height + 'px'}"  v-on:click="increment")
    div.swiper-container(:style="{ width: container_width, transform: 'translate3d' + translate3d, transitionDuration: duration }" @transitionend="transitionend")
        div.image-container(v-for="(item, index) of compouted_images")
            img(:src="item.src" v-bind:style="{ width: size.width + 'px', height: size.height + 'px'}")
    div.carousel-control
        div.pre_and_next.iconfont
            li.pre-btn
                a(v-on:click.prevent="turnToPre")
            li.next-btn
                a(v-on:click.prevent="turnToNext")
        ul.pagination
            li.pagination-item(v-for="(pagItem, pagInex) of images" v-bind:class="{'selected': pagInex === cur_index}" @click="selectItem(pagInex)")
</template>
<script>
export default {
  props: ['images', 'size'],
  data () {
    return {
        cur_index: 0,
        axixX: 0,
        duration: '0.3s',
        interval: null,
        transitioning: false
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
        if (this.transitioning) {
            return
        }
        this.duration = '0.3s'
        this.transitioning = true
        if (this.cur_index === 0) {
            this.axixX += this.size.width
            this.cur_index = this.images.length - 1
        } else {
            this.axixX += this.size.width
            this.cur_index --
        }
    },
    /**
     * 手动向后滚动图片
     */
    turnToNext: function () {
        if (this.transitioning) {
            return
        }
        this.transitioning = true
        this.duration = '0.3s'
        if (this.cur_index === this.images.length - 1) {
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
    },
    transitionend: function () {
        if (this.cur_index === 0) {
            this.duration = 'inherit'
            this.axixX = -this.size.width
        } else if (this.cur_index === this.images.length - 1) {
            this.duration = 'inherit'
            this.axixX = -this.size.width * this.images.length
        }
        this.transitioning = false
    },
    /**
     * select pagination item
     **/
    selectItem: function (index) {
        console.log('selected' + index)
        if (this.transitioning) {
            return
        }
        this.transitioning = true
        this.duration = '0.3s'
        this.axixX = -this.size.width * (index + 1)
        this.cur_index = index
    }
  }
}
</script>
<style lang="scss">
    %_inherit_class {
        width: inherit;
        height: inherit;
    }
    @font-face {font-family: "iconfont";
        // src: url('./assets/iconfont/iconfont.eot?t=1495507826600'); /* IE9*/
        // src: url('./assets/iconfont/iconfont.eot?t=1495507826600#iefix') format('embedded-opentype'), /* IE6-IE8 */
        // url('./assets/iconfont/iconfont.woff?t=1495507826600') format('woff'), /* chrome, firefox */
        // url('./assets/iconfont/iconfont.ttf?t=1495507826600') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
        // url('./assets/iconfont/iconfont.svg?t=1495507826600#iconfont') format('svg'); /* iOS 4.1- */
        // @font-face {
        // font-family: 'iconfont';  /* project id 309039 */
        src: url('//at.alicdn.com/t/font_f67mfryclerk9.eot');
        src: url('//at.alicdn.com/t/font_f67mfryclerk9.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_f67mfryclerk9.woff') format('woff'),
        url('//at.alicdn.com/t/font_f67mfryclerk9.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_f67mfryclerk9.svg#iconfont') format('svg');
        }

        .iconfont {
        font-family:"iconfont" !important;
        font-size: 3em;
        font-style:normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
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
    .pagination {
        border-radius: 10px;
        position: absolute;
        bottom: 15px;
        height: 13px;
        text-align: center;
        font-size: 0;
        left: 50%;
        margin-left: -39px;
        background-color: rgba(255,255,255,.3);
        display: block;
        & > .pagination-item {
            list-style: none;
            display: inline-block;
            margin: 2px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgb(236, 236, 236);
            &.selected {
                background: rgb(211, 60, 62);
            }
        }
    }
</style>
