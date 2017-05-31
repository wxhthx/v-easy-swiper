# v-easy-swiper

 swiper vue.js css3
---

## Intro
> v-easy-swiper is a vue plugin which based on vue.js and css3.It expressed a easier principle to compare with other similar plugins.Of course, it has a little disadvantages to wait you to discovry and update it with me.

## Live Demo
[Click me](https://wxhthx.github.io/v-easy-swiper/ "swiper") 

## Development Setup
``` bash
# install plugin
npm install 
# run example
npm run dev
```

## Usage
```bash
# NPM下载
npm install v-easy-swiper
```

```javascript
/**
* 全局引入
*/
import Vue from 'vue'
import EasySwiper from 'v-easy-swiper'
Vue.use(EasySwiper, {})
```

```JADE
// Alse you can choose origin html
<template lang="jade">
swiper(:images="swiperSrcs" v-bind:size="imgSize" v-on:clickimg="click_img")
</template>
```

```javascript
/**
* component config
*/
<script>
import a from 'images/1.jpg'
import b from 'images/2.jpg'
import c from 'images/3.jpg'
export default {
    data () {
        return {
        swiperSrcs: [
            {src: a},
            {src: b},
            {src: c}
        ],
        imgSize: {
            width: 520,
            height: 280
        }
        }
    },
    methods: {
        /**
        * current image click event
        */
        click_img: function (index) {
            console.log('current image index is:' + index)
        }
    }
}
<script>
```

## License
MIT

