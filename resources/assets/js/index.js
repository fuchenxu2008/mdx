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

$('#plus_icon').click(
    function() {
        $('#create_post_btn').modal('toggle')
    }
)
