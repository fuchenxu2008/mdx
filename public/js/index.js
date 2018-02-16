/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 67);
/******/ })
/************************************************************************/
/******/ ({

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(68);


/***/ }),

/***/ 68:
/***/ (function(module, exports) {

$(document).ready(function () {
    var event = new Event('newPost');
    document.dispatchEvent(event);
});

// Swiper Banner
var swiper = new Swiper('.swiper-container', {
    loop: true,
    // 如果需要分页器
    pagination: '.swiper-pagination',
    paginationClickable: true,
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: 4500,
    autoplayDisableOnInteraction: false
});

// Animated Posts
document.addEventListener('newPost', function () {
    $posts = $('#recent').find('.post');
    console.log($posts);
    $.each($posts, function (index, value) {
        $(value).waypoint(function (direction) {
            if (direction == 'down') {
                $(value).addClass('animated slideInUp');
                console.log(value);
                setTimeout(function () {
                    $(value).removeClass('animated slideInUp');
                }, 1000);
            }
        }, { offset: '100%' });

        $(value).waypoint(function (direction) {
            if (direction == 'up') {
                $(value).addClass('animated slideInDown');
                console.log(value);
                setTimeout(function () {
                    $(value).removeClass('animated slideInDown');
                }, 1000);
            }
        }, { offset: function offset() {
                return -this.element.clientHeight;
            } });
    });
});

// Add Posts
$postModal = $('#create_post_modal');
$('#plus_icon').click(function () {
    $postModal.modal('toggle');
});
$('#new_post_form').submit(function (e) {
    e.preventDefault();
    $postModal.removeClass('animated slideInUp');
    $postModal.addClass('animated zoomOutRight');
    $('#plus_icon').attr("disabled", 'disabled');
    $('#new_post_form').ajaxSubmit({
        success: function success(data) {
            console.log(data);
            var newPost = '\n            <div class="post container animated slideInLeft">\n                <!-- User -->\n                <div class="post_user">\n                    <img src="/storage/avatar_images/' + data['user_avatar'] + '" alt="logo"> ' + data['user_name'] + '\n                </div>\n                <div class="post_content">\n                    <!-- Post Text -->\n                    <p class="post_text" onclick="window.location.href=\'/posts/' + data['post_id'] + '\'">' + data['title'] + '</p>';
            //  Post Img
            if (data['images'].length > 0) {
                newPost += '<div class="container row post-gallery" style="padding-right:30px;"  itemscope itemtype="mdx.kyrie.top">';
                $.each(JSON.parse(data['images']), function (index, img) {
                    newPost += '<figure class=\'img-wrap col-xs-4\'>\n                                    <div class="img-container">\n                                        <a href="/storage/posts_images/' + img + '" itemprop="contentUrl" data-size="' + img.split('.')[0].split('_')[2] + '" data-index="' + index + '">\n                                            <img src="/storage/posts_images/thumb_' + img + '" itemprop="thumbnail" alt="post_img">\n                                        </a>\n                                    </div>\n                                </figure>';
                });
                newPost += '</div>';
            }
            newPost += '</div>\n                <div class="post_btn row">\n                    <div class="col-xs-3 text-left"><p>view: </p></div>\n                    <div class="col-xs-9 text-right">\n                        <button class="like_btn" name="like" value="' + data['post_id'] + '">\n                            <i class="iconfont icon-like"></i>\n                            <text id="likes_count_' + data['post_id'] + '">0</text>\n                        </button>\n                        <button class="comment_btn" name="comment" value="' + data['post_id'] + '">\n                            <i class="iconfont icon-comment"></i>\n                            <text>0</text>\n                        </button>\n                    </div>\n                </div>\n            </div>';
            $(newPost).insertBefore($('.post')[0]);
            var event = new Event('newPost');
            $($('.post')[0]).removeClass('slideInUp');
            document.dispatchEvent(event);
            $('#plus_icon').prop("disabled", false);
            $('#new_post_form').trigger('reset');
            console.log('Success: ', data);
        },
        error: function error(data) {
            console.log('Error: ', data);
        }
    });
    setTimeout(function () {
        $postModal.modal('hide').removeClass('animated zoomOutRight');
        $postModal.addClass('animated slideInUp');
    }, 1000);
});

// Like Button Ajax
$('.like_btn').click(function () {
    id = $(this).val();
    $.get('/posts/' + id + '/like', function (data) {
        console.log('#likes_count_' + id);
        $('#likes_count_' + id).html(data.likes);
    }, 'json');
});
// Comment Button Ajax
$('.comment_btn').click(function () {});

document.addEventListener('newPost', function () {
    $('.post-gallery').each(function () {
        var $gallery = $(this);
        console.log('Gallery: ', $gallery);
        var getItems = function getItems() {
            var items = [];
            $gallery.find('a').each(function () {
                var $href = $(this).attr('href'),
                    $size = $(this).data('size').split('x'),
                    $width = $size[0],
                    $height = $size[1];

                var item = {
                    src: $href,
                    w: $width,
                    h: $height
                };
                items.push(item);
            });
            return items;
        };
        var items = getItems();
        console.log(items);

        var $photoBox = $('.pswp')[0];
        $gallery.on('click', 'figure', function (e) {
            e.preventDefault();
            var $index = $(this).index();
            var options = {
                index: $index,
                bgOpacity: 0.7,
                showHideOpacity: true
                // Initialize PhotoSwipe
            };var lightBox = new PhotoSwipe($photoBox, PhotoSwipeUI_Default, items, options);
            lightBox.init();
        });
    });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTExNjEzMGNiYzRkMjFkMDI5MWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9pbmRleC5qcyJdLCJuYW1lcyI6WyIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsImV2ZW50IiwiRXZlbnQiLCJkaXNwYXRjaEV2ZW50Iiwic3dpcGVyIiwiU3dpcGVyIiwibG9vcCIsInBhZ2luYXRpb24iLCJwYWdpbmF0aW9uQ2xpY2thYmxlIiwic3BhY2VCZXR3ZWVuIiwiY2VudGVyZWRTbGlkZXMiLCJhdXRvcGxheSIsImF1dG9wbGF5RGlzYWJsZU9uSW50ZXJhY3Rpb24iLCJhZGRFdmVudExpc3RlbmVyIiwiJHBvc3RzIiwiZmluZCIsImNvbnNvbGUiLCJsb2ciLCJlYWNoIiwiaW5kZXgiLCJ2YWx1ZSIsIndheXBvaW50IiwiZGlyZWN0aW9uIiwiYWRkQ2xhc3MiLCJzZXRUaW1lb3V0IiwicmVtb3ZlQ2xhc3MiLCJvZmZzZXQiLCJlbGVtZW50IiwiY2xpZW50SGVpZ2h0IiwiJHBvc3RNb2RhbCIsImNsaWNrIiwibW9kYWwiLCJzdWJtaXQiLCJlIiwicHJldmVudERlZmF1bHQiLCJhdHRyIiwiYWpheFN1Ym1pdCIsInN1Y2Nlc3MiLCJkYXRhIiwibmV3UG9zdCIsImxlbmd0aCIsIkpTT04iLCJwYXJzZSIsImltZyIsInNwbGl0IiwiaW5zZXJ0QmVmb3JlIiwicHJvcCIsInRyaWdnZXIiLCJlcnJvciIsImlkIiwidmFsIiwiZ2V0IiwiaHRtbCIsImxpa2VzIiwiJGdhbGxlcnkiLCJnZXRJdGVtcyIsIml0ZW1zIiwiJGhyZWYiLCIkc2l6ZSIsIiR3aWR0aCIsIiRoZWlnaHQiLCJpdGVtIiwic3JjIiwidyIsImgiLCJwdXNoIiwiJHBob3RvQm94Iiwib24iLCIkaW5kZXgiLCJvcHRpb25zIiwiYmdPcGFjaXR5Iiwic2hvd0hpZGVPcGFjaXR5IiwibGlnaHRCb3giLCJQaG90b1N3aXBlIiwiUGhvdG9Td2lwZVVJ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ZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDY3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxMTE2MTMwY2JjNGQyMWQwMjkxZSIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnbmV3UG9zdCcpO1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xufSlcblxuLy8gU3dpcGVyIEJhbm5lclxudmFyIHN3aXBlciA9IG5ldyBTd2lwZXIoJy5zd2lwZXItY29udGFpbmVyJyx7XG4gICAgbG9vcDogdHJ1ZSxcbiAgICAvLyDlpoLmnpzpnIDopoHliIbpobXlmahcbiAgICBwYWdpbmF0aW9uOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcbiAgICBwYWdpbmF0aW9uQ2xpY2thYmxlOiB0cnVlLFxuICAgIHNwYWNlQmV0d2VlbjogMzAsXG4gICAgY2VudGVyZWRTbGlkZXM6IHRydWUsXG4gICAgYXV0b3BsYXk6IDQ1MDAsXG4gICAgYXV0b3BsYXlEaXNhYmxlT25JbnRlcmFjdGlvbjogZmFsc2Vcbn0pO1xuXG4vLyBBbmltYXRlZCBQb3N0c1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbmV3UG9zdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAkcG9zdHMgPSAkKCcjcmVjZW50JykuZmluZCgnLnBvc3QnKVxuICAgIGNvbnNvbGUubG9nKCRwb3N0cyk7XG4gICAgJC5lYWNoKCRwb3N0cywgZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XG4gICAgICAgICQodmFsdWUpLndheXBvaW50KGZ1bmN0aW9uKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PSAnZG93bicpIHtcbiAgICAgICAgICAgICAgICAkKHZhbHVlKS5hZGRDbGFzcygnYW5pbWF0ZWQgc2xpZGVJblVwJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codmFsdWUpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICQodmFsdWUpLnJlbW92ZUNsYXNzKCdhbmltYXRlZCBzbGlkZUluVXAnKTtcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgeyBvZmZzZXQ6ICcxMDAlJyB9KTtcblxuICAgICAgICAkKHZhbHVlKS53YXlwb2ludChmdW5jdGlvbihkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT0gJ3VwJykge1xuICAgICAgICAgICAgICAgICQodmFsdWUpLmFkZENsYXNzKCdhbmltYXRlZCBzbGlkZUluRG93bicpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAkKHZhbHVlKS5yZW1vdmVDbGFzcygnYW5pbWF0ZWQgc2xpZGVJbkRvd24nKTtcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgeyBvZmZzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAtdGhpcy5lbGVtZW50LmNsaWVudEhlaWdodFxuICAgICAgICB9IH0pO1xuICAgIH0pO1xufSlcblxuLy8gQWRkIFBvc3RzXG4kcG9zdE1vZGFsID0gJCgnI2NyZWF0ZV9wb3N0X21vZGFsJylcbiQoJyNwbHVzX2ljb24nKS5jbGljayhcbiAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgJHBvc3RNb2RhbC5tb2RhbCgndG9nZ2xlJylcbiAgICB9XG4pXG4kKCcjbmV3X3Bvc3RfZm9ybScpLnN1Ym1pdChmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICRwb3N0TW9kYWwucmVtb3ZlQ2xhc3MoJ2FuaW1hdGVkIHNsaWRlSW5VcCcpO1xuICAgICRwb3N0TW9kYWwuYWRkQ2xhc3MoJ2FuaW1hdGVkIHpvb21PdXRSaWdodCcpO1xuICAgICQoJyNwbHVzX2ljb24nKS5hdHRyKFwiZGlzYWJsZWRcIiwgJ2Rpc2FibGVkJyk7XG4gICAgJCgnI25ld19wb3N0X2Zvcm0nKS5hamF4U3VibWl0KHtcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICB2YXIgbmV3UG9zdCA9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwb3N0IGNvbnRhaW5lciBhbmltYXRlZCBzbGlkZUluTGVmdFwiPlxuICAgICAgICAgICAgICAgIDwhLS0gVXNlciAtLT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9zdF91c2VyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL3N0b3JhZ2UvYXZhdGFyX2ltYWdlcy9gK2RhdGFbJ3VzZXJfYXZhdGFyJ10rYFwiIGFsdD1cImxvZ29cIj4gYCtkYXRhWyd1c2VyX25hbWUnXStgXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBvc3RfY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8IS0tIFBvc3QgVGV4dCAtLT5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwb3N0X3RleHRcIiBvbmNsaWNrPVwid2luZG93LmxvY2F0aW9uLmhyZWY9Jy9wb3N0cy9gK2RhdGFbJ3Bvc3RfaWQnXStgJ1wiPmArZGF0YVsndGl0bGUnXStgPC9wPmBcbiAgICAgICAgICAgIC8vICBQb3N0IEltZ1xuICAgICAgICAgICAgaWYgKGRhdGFbJ2ltYWdlcyddLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBuZXdQb3N0ICs9IGA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIHJvdyBwb3N0LWdhbGxlcnlcIiBzdHlsZT1cInBhZGRpbmctcmlnaHQ6MzBweDtcIiAgaXRlbXNjb3BlIGl0ZW10eXBlPVwibWR4Lmt5cmllLnRvcFwiPmBcbiAgICAgICAgICAgICAgICAkLmVhY2goSlNPTi5wYXJzZShkYXRhWydpbWFnZXMnXSksIGZ1bmN0aW9uKGluZGV4LCBpbWcpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3UG9zdCArPSBgPGZpZ3VyZSBjbGFzcz0naW1nLXdyYXAgY29sLXhzLTQnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImltZy1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiL3N0b3JhZ2UvcG9zdHNfaW1hZ2VzL2AraW1nK2BcIiBpdGVtcHJvcD1cImNvbnRlbnRVcmxcIiBkYXRhLXNpemU9XCJgKyhpbWcuc3BsaXQoJy4nKVswXSkuc3BsaXQoJ18nKVsyXStgXCIgZGF0YS1pbmRleD1cImAraW5kZXgrYFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9zdG9yYWdlL3Bvc3RzX2ltYWdlcy90aHVtYl9gK2ltZytgXCIgaXRlbXByb3A9XCJ0aHVtYm5haWxcIiBhbHQ9XCJwb3N0X2ltZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2ZpZ3VyZT5gXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBuZXdQb3N0ICs9IGA8L2Rpdj5gXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdQb3N0ICs9IGA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9zdF9idG4gcm93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMyB0ZXh0LWxlZnRcIj48cD52aWV3OiA8L3A+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtOSB0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwibGlrZV9idG5cIiBuYW1lPVwibGlrZVwiIHZhbHVlPVwiYCtkYXRhWydwb3N0X2lkJ10rYFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiaWNvbmZvbnQgaWNvbi1saWtlXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0IGlkPVwibGlrZXNfY291bnRfYCtkYXRhWydwb3N0X2lkJ10rYFwiPjA8L3RleHQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJjb21tZW50X2J0blwiIG5hbWU9XCJjb21tZW50XCIgdmFsdWU9XCJgK2RhdGFbJ3Bvc3RfaWQnXStgXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJpY29uZm9udCBpY29uLWNvbW1lbnRcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRleHQ+MDwvdGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PmBcbiAgICAgICAgICAgICQobmV3UG9zdCkuaW5zZXJ0QmVmb3JlKCQoJy5wb3N0JylbMF0pO1xuICAgICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCduZXdQb3N0Jyk7XG4gICAgICAgICAgICAkKCQoJy5wb3N0JylbMF0pLnJlbW92ZUNsYXNzKCdzbGlkZUluVXAnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgJCgnI3BsdXNfaWNvbicpLnByb3AoXCJkaXNhYmxlZFwiLCBmYWxzZSk7XG4gICAgICAgICAgICAkKCcjbmV3X3Bvc3RfZm9ybScpLnRyaWdnZXIoJ3Jlc2V0Jyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU3VjY2VzczogJywgZGF0YSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3I6ICcsIGRhdGEpO1xuICAgICAgICB9XG4gICAgfSlcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAkcG9zdE1vZGFsLm1vZGFsKCdoaWRlJykucmVtb3ZlQ2xhc3MoJ2FuaW1hdGVkIHpvb21PdXRSaWdodCcpXG4gICAgICAgICRwb3N0TW9kYWwuYWRkQ2xhc3MoJ2FuaW1hdGVkIHNsaWRlSW5VcCcpO1xuICAgIH0sMTAwMClcblxufSlcblxuLy8gTGlrZSBCdXR0b24gQWpheFxuJCgnLmxpa2VfYnRuJykuY2xpY2soXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZCA9ICQodGhpcykudmFsKClcbiAgICAgICAgJC5nZXQoJy9wb3N0cy8nKyBpZCArJy9saWtlJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcjbGlrZXNfY291bnRfJyArIGlkKTtcbiAgICAgICAgICAgICQoJyNsaWtlc19jb3VudF8nICsgaWQpLmh0bWwoZGF0YS5saWtlcylcbiAgICAgICAgfSwgJ2pzb24nKTtcbiAgICB9XG4pXG4vLyBDb21tZW50IEJ1dHRvbiBBamF4XG4kKCcuY29tbWVudF9idG4nKS5jbGljayhcbiAgICBmdW5jdGlvbiAoKSB7XG5cbiAgICB9XG4pXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ25ld1Bvc3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgJCgnLnBvc3QtZ2FsbGVyeScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkZ2FsbGVyeSA9ICQodGhpcyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdHYWxsZXJ5OiAnLCAkZ2FsbGVyeSk7XG4gICAgICAgIHZhciBnZXRJdGVtcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGl0ZW1zID0gW11cbiAgICAgICAgICAgICRnYWxsZXJ5LmZpbmQoJ2EnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciAkaHJlZiA9ICQodGhpcykuYXR0cignaHJlZicpLFxuICAgICAgICAgICAgICAgICRzaXplID0gJCh0aGlzKS5kYXRhKCdzaXplJykuc3BsaXQoJ3gnKSxcbiAgICAgICAgICAgICAgICAkd2lkdGggPSAkc2l6ZVswXSxcbiAgICAgICAgICAgICAgICAkaGVpZ2h0ID0gJHNpemVbMV07XG5cbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgc3JjOiAkaHJlZixcbiAgICAgICAgICAgICAgICAgICAgdyAgOiAkd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIGggIDogJGhlaWdodFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKGl0ZW0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBpdGVtcztcbiAgICAgICAgfVxuICAgICAgICB2YXIgaXRlbXMgPSBnZXRJdGVtcygpO1xuICAgICAgICBjb25zb2xlLmxvZyhpdGVtcyk7XG5cbiAgICAgICAgdmFyICRwaG90b0JveCA9ICQoJy5wc3dwJylbMF07XG4gICAgICAgICRnYWxsZXJ5Lm9uKCdjbGljaycsICdmaWd1cmUnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgJGluZGV4ID0gJCh0aGlzKS5pbmRleCgpO1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgaW5kZXg6ICRpbmRleCxcbiAgICAgICAgICAgICAgICBiZ09wYWNpdHk6IDAuNyxcbiAgICAgICAgICAgICAgICBzaG93SGlkZU9wYWNpdHk6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgUGhvdG9Td2lwZVxuICAgICAgICAgICAgdmFyIGxpZ2h0Qm94ID0gbmV3IFBob3RvU3dpcGUoJHBob3RvQm94LCBQaG90b1N3aXBlVUlfRGVmYXVsdCwgaXRlbXMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgbGlnaHRCb3guaW5pdCgpO1xuICAgICAgICB9KVxuICAgIH0pXG59KVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=