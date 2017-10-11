
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
require('./jquery1.10.2.min');
require('./bootstrap');
require('./bootstrap.min');

window.Vue = require('vue');
// const Compress = require('compress.js');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example', require('./components/Example.vue'));

// const app = new Vue({
//     el: '#app'
// });
require('./swiper-3.4.2.jquery.min');
require('./swiper-3.4.2.min');
require('./clipboard.min');
require('./fontawesome');
require('./imgUpload');
require('./index');
