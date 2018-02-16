require('./bootstrap');
require('./dependencies/jquery.form');
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */


// require('./dependencies/jquery1.10.2.min');
require('./dependencies/swiper-3.4.2.jquery.min');
require('./dependencies/swiper-3.4.2.min');
// require('./dependencies/jqthumb');
// require('./dependencies/clipboard.min');
// require('./dependencies/fontawesome');
require('./dependencies/imgUpload');
// require('./dependencies/chat-vue');

// const Compress = require('compress.js');
window.PhotoSwipeUI_Default = require('photoswipe/dist/photoswipe-ui-default.js');
window.PhotoSwipe = require('photoswipe/dist/photoswipe.js');

window.Waypoints = require('waypoints/lib/jquery.waypoints.js');
// window.Infinite = require('waypoints/lib/shortcuts/infinite.js');
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
 window.Vue = require('vue');

 Vue.component('chat-log', require('./components/ChatLog.vue'));
 Vue.component('chat-message', require('./components/ChatMessage.vue'));
 Vue.component('chat-composer', require('./components/ChatComposer.vue'));


//获取浏览器页面可见高度和宽度
// var _PageHeight = document.documentElement.clientHeight,
// _PageWidth = document.documentElement.clientWidth;
