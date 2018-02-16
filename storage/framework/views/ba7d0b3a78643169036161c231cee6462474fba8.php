<?php $__env->startSection('content'); ?>
    <!-- Search Bar -->
    <nav class="search_bar fixed_sec blur">
        <i id="search_icon" class="iconfont icon-search"></i>
        <input class="search_input" type="text" name="search" placeholder="Search here...">
        <i id="plus_icon" class="iconfont icon-jiahao pull-right"></i>
    </nav>
    <nav class="search_bar" style="opacity: 0;">
        <input class="search_input" type="text">
    </nav>
    <!-- End Search Bar -->

    
    <div class="modal fade animated slideInUp" id="create_post_modal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="container">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h3 class="modal-title" id="">Put Your Goods On Sale</h3>
                    </div>
                    <div class="modal-body">
                        <?php echo Form::open(array('id' => 'new_post_form', 'action' => 'PostsController@store', 'method' => 'POST', 'enctype'=>'multipart/form-data', 'files' => true)); ?>

                        <div class="textFormGroup">
                            <?php echo e(Form::text('title', '', ['id' => 'post_title', 'class' => 'form-control', 'placeholder' => 'Title', 'required' => 'true'])); ?>

                            
                            <?php echo e(Form::textarea('body', '', ['id' => 'post_body', 'class' => 'form-control', 'placeholder' => 'Body', 'rows' => '4', 'required' => 'true'])); ?>

                        </div>
                        <div id="upBox">
                            <div id="inputBox">
                                <?php echo Form::file('images[]', array('multiple'=>true, 'id' => 'file')); ?>

                                Add Photos
                            </div>
                            <div id="imgBox"></div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="dismissBtn pull-left" data-dismiss="modal">Close</button>
                        <?php echo e(Form::submit('Publish', ['class' => 'confirmBtn pull-right'])); ?>

                        <?php echo Form::close(); ?>

                    </div>
                </div>
            </div>
        </div>
    </div>
    

        <!-- Big Banner -->
        <div>
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <img src="pic/banner3.jpg" class="banner-img">
                    </div>
                    <div class="swiper-slide">
                        <img src="pic/test.jpg" class="banner-img">
                    </div>
                    <div class="swiper-slide">
                        <img src="pic/banner2.jpg" class="banner-img">
                    </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <!-- End Big Banner -->

        <!-- Category -->
        <section>
            <div id="category" class="text-center">
                <button class="category_btn">
                    <img src="pic/011-technology.svg" alt="Gadgets"><br>
                    <label>Gadgets</label>
                </button>
                <button class="category_btn">
                    <img src="pic/008-shirt-1.svg" alt="Clothes"><br>
                    <label>Clothes</label>
                </button>
                <button class="category_btn">
                    <img src="pic/006-washing-machine.svg" alt="Furniture"><br>
                    <label>Furniture</label>
                </button>
                <button class="category_btn">
                    <img src="pic/002-books-1.svg" alt="Books"><br>
                    <label>Books</label>
                </button>
                <button class="category_btn">
                    <img src="pic/001-disc.svg" alt="Misc"><br>
                    <label>Misc</label>
                </button>
            </div>
        </section>
        <!-- End Category -->

        <!-- News Section -->
        <div class="">

        </div>
        <!-- End News Section -->

        <!-- Recent Items -->
        <section id="recent">
            <?php if(count($posts) > 0): ?>
                <?php $__currentLoopData = $posts; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $post): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <div class="post container">
                        <!-- User -->
                        <div class="post_user">
                            <img src="/storage/avatar_images/<?php echo e($post->user->avatar); ?>" alt="logo"> <?php echo e($post->user->name); ?>

                        </div>
                        <div class="post_content">
                            <!-- Post Text -->
                            <p class="post_text" onclick="window.location.href='/posts/<?php echo e($post->id); ?>'"><?php echo e($post->title); ?></p>
                            <!-- Post Img -->
                            <?php if(count(json_decode($post->images)) > 0): ?>
                                <div class="container row post-gallery" style="padding-right:30px;"  itemscope itemtype="mdx.kyrie.top">
                                    <?php $__currentLoopData = json_decode($post->images); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $index => $img): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                        <figure class='img-wrap col-xs-4'>
                                            <div class="img-container">
                                                <a href="/storage/posts_images/<?php echo e($img); ?>" itemprop="contentUrl" data-size="<?php echo e(explode('_', explode('.', $img)[0])[2]); ?>" data-index="<?php echo e($index); ?>">
                                                    <img src="/storage/posts_images/thumb_<?php echo e($img); ?>" itemprop="thumbnail" alt="post_img">
                                                </a>
                                            </div>
                                        </figure>
                                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                                </div>
                            <?php endif; ?>
                            <!-- Interactive button -->
                        </div>
                        <div class="post_btn row">
                            <div class="col-xs-3 text-left"><p>view: </p></div>
                            <div class="col-xs-9 text-right">
                                <button class="like_btn" name="like" value="<?php echo e($post->id); ?>">
                                    <i class="iconfont icon-like"></i>
                                    <text id="likes_count_<?php echo e($post->id); ?>"><?php echo e($post->likes); ?></text>
                                </button>
                                <button class="comment_btn" name="comment" value="<?php echo e($post->id); ?>">
                                    <i class="iconfont icon-comment"></i>
                                    <text><?php echo e($post->comment); ?></text>
                                </button>
                            </div>
                        </div>
                    </div>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            <?php else: ?>
                <div id="noposts_board" class="container text-center">
                    <p id="noposts_text">🛒 There is no post.</p>
                </div>
            <?php endif; ?>

            <!-- Root element of PhotoSwipe. Must have class pswp. -->
            <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
                <!-- Background of PhotoSwipe.
                It's a separate element as animating opacity is faster than rgba(). -->
                <div class="pswp__bg"></div>
                <!-- Slides wrapper with overflow:hidden. -->
                <div class="pswp__scroll-wrap">
                    <!-- Container that holds slides.
                    PhotoSwipe keeps only 3 of them in the DOM to save memory.
                    Don't modify these 3 pswp__item elements, data is added later on. -->
                    <div class="pswp__container">
                        <div class="pswp__item"></div>
                        <div class="pswp__item"></div>
                        <div class="pswp__item"></div>
                    </div>
                    <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
                    <div class="pswp__ui pswp__ui--hidden">
                        <div class="pswp__top-bar">
                            <!--  Controls are self-explanatory. Order can be changed. -->
                            <div class="pswp__counter"></div>
                            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                            <button class="pswp__button pswp__button--share" title="Share"></button>
                            <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                            <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                            <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
                            <!-- element will get class pswp__preloader--active when preloader is running -->
                            <div class="pswp__preloader">
                                <div class="pswp__preloader__icn">
                                    <div class="pswp__preloader__cut">
                                        <div class="pswp__preloader__donut"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                            <div class="pswp__share-tooltip"></div>
                        </div>
                        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
                        </button>
                        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
                        </button>
                        <div class="pswp__caption">
                            <div class="pswp__caption__center"></div>
                        </div>
                    </div>
                </div>
            </div>

            

        </section>
        <!-- End Recent Items -->
        <?php echo $__env->make('inc.tabbar', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>

    <?php $__env->stopSection(); ?>

<?php $__env->startSection('script'); ?>
    
    <script src="<?php echo e(asset('js/index.js')); ?>"></script>

    <script type="text/javascript">


    </script>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>