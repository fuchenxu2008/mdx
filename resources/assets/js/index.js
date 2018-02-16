$(document).ready(function() {
    var event = new Event('newPost');
    document.dispatchEvent(event);
})

// Swiper Banner
var swiper = new Swiper('.swiper-container',{
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
    $posts = $('#recent').find('.post')
    console.log($posts);
    $.each($posts, function(index, value) {
        $(value).waypoint(function(direction) {
            if (direction == 'down') {
                $(value).addClass('animated slideInUp');
                console.log(value);
                setTimeout(function() {
                    $(value).removeClass('animated slideInUp');
                }, 1000);
            }
        }, { offset: '100%' });

        $(value).waypoint(function(direction) {
            if (direction == 'up') {
                $(value).addClass('animated slideInDown');
                console.log(value);
                setTimeout(function() {
                    $(value).removeClass('animated slideInDown');
                }, 1000);
            }
        }, { offset: function() {
                return -this.element.clientHeight
        } });
    });
})

// Add Posts
$postModal = $('#create_post_modal')
$('#plus_icon').click(
    function() {
        $postModal.modal('toggle')
    }
)
$('#new_post_form').submit(function(e) {
    e.preventDefault();
    $postModal.removeClass('animated slideInUp');
    $postModal.addClass('animated zoomOutRight');
    $('#plus_icon').attr("disabled", 'disabled');
    $('#new_post_form').ajaxSubmit({
        success: function(data) {
            console.log(data);
            var newPost = `
            <div class="post container animated slideInLeft">
                <!-- User -->
                <div class="post_user">
                    <img src="/storage/avatar_images/`+data['user_avatar']+`" alt="logo"> `+data['user_name']+`
                </div>
                <div class="post_content">
                    <!-- Post Text -->
                    <p class="post_text" onclick="window.location.href='/posts/`+data['post_id']+`'">`+data['title']+`</p>`
            //  Post Img
            if (data['images'].length > 0) {
                newPost += `<div class="container row post-gallery" style="padding-right:30px;"  itemscope itemtype="mdx.kyrie.top">`
                $.each(JSON.parse(data['images']), function(index, img) {
                    newPost += `<figure class='img-wrap col-xs-4'>
                                    <div class="img-container">
                                        <a href="/storage/posts_images/`+img+`" itemprop="contentUrl" data-size="`+(img.split('.')[0]).split('_')[2]+`" data-index="`+index+`">
                                            <img src="/storage/posts_images/thumb_`+img+`" itemprop="thumbnail" alt="post_img">
                                        </a>
                                    </div>
                                </figure>`
                })
                newPost += `</div>`
            }
            newPost += `</div>
                <div class="post_btn row">
                    <div class="col-xs-3 text-left"><p>view: </p></div>
                    <div class="col-xs-9 text-right">
                        <button class="like_btn" name="like" value="`+data['post_id']+`">
                            <i class="iconfont icon-like"></i>
                            <text id="likes_count_`+data['post_id']+`">0</text>
                        </button>
                        <button class="comment_btn" name="comment" value="`+data['post_id']+`">
                            <i class="iconfont icon-comment"></i>
                            <text>0</text>
                        </button>
                    </div>
                </div>
            </div>`
            $(newPost).insertBefore($('.post')[0]);
            var event = new Event('newPost');
            $($('.post')[0]).removeClass('slideInUp');
            document.dispatchEvent(event);
            $('#plus_icon').prop("disabled", false);
            $('#new_post_form').trigger('reset');
            console.log('Success: ', data);
        },
        error: function(data) {
            console.log('Error: ', data);
        }
    })
    setTimeout(function() {
        $postModal.modal('hide').removeClass('animated zoomOutRight')
        $postModal.addClass('animated slideInUp');
    },1000)

})

// Like Button Ajax
$('.like_btn').click(
    function () {
        id = $(this).val()
        $.get('/posts/'+ id +'/like', function (data) {
            console.log('#likes_count_' + id);
            $('#likes_count_' + id).html(data.likes)
        }, 'json');
    }
)
// Comment Button Ajax
$('.comment_btn').click(
    function () {

    }
)

document.addEventListener('newPost', function () {
    $('.post-gallery').each(function() {
        var $gallery = $(this);
        console.log('Gallery: ', $gallery);
        var getItems = function() {
            var items = []
            $gallery.find('a').each(function() {
                var $href = $(this).attr('href'),
                $size = $(this).data('size').split('x'),
                $width = $size[0],
                $height = $size[1];

                var item = {
                    src: $href,
                    w  : $width,
                    h  : $height
                }
                items.push(item)
            });
            return items;
        }
        var items = getItems();
        console.log(items);

        var $photoBox = $('.pswp')[0];
        $gallery.on('click', 'figure', function(e) {
            e.preventDefault();
            var $index = $(this).index();
            var options = {
                index: $index,
                bgOpacity: 0.7,
                showHideOpacity: true
            }
            // Initialize PhotoSwipe
            var lightBox = new PhotoSwipe($photoBox, PhotoSwipeUI_Default, items, options);
            lightBox.init();
        })
    })
})
