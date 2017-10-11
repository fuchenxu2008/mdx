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

    
    <div class="modal fade" id="create_post_btn" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id=""></h4>
                </div>
                <div class="modal-body">
                    <?php echo Form::open(array('action' => 'PostsController@store', 'method' => 'POST', 'enctype'=>'multipart/form-data', 'files' => true)); ?>

                    <?php echo e(Form::text('title', 'test', ['class' => 'form-control', 'placeholder' => 'Title'])); ?>

                    <?php echo e(Form::textarea('body', 'test', ['class' => 'form-control', 'placeholder' => 'Body'])); ?>

                    <div id="upBox">
                        <div id="inputBox">
                            
                            
                            
                            <?php echo Form::file('images[]', array('multiple'=>true, 'id' => 'file')); ?>

                            
                            点击选择图片
                        </div>
                        <div id="imgBox"></div>
                        
                    </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <?php echo e(Form::submit('Publish', ['class' => 'btn btn-primary'])); ?>

                        <?php echo Form::close(); ?>

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
                            <img src="<?php echo e(asset('pic/logo2.JPG')); ?>" alt="logo"> <?php echo e($post->user->name); ?>

                        </div>
                        <div class="post_content" onclick="window.location.href='/posts/<?php echo e($post->id); ?>'">
                            <!-- Post Text -->
                            <p class="post_text"><?php echo e($post->title); ?></p>
                            <!-- Post Img -->
                            <?php if(count(json_decode($post->images)) > 0): ?>
                                <?php $__currentLoopData = json_decode($post->images); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $img): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                    <img src="/storage/posts_images/<?php echo e($img); ?>" alt="demo">
                                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                            <?php endif; ?>
                            <!-- Interactive button -->
                        </div>
                        <div class="post_btn row">
                            <div class="col-xs-3 text-left"><p>view: </p></div>
                            <div class="col-xs-9 text-right">
                                <button name="like"><i class="iconfont icon-like"></i>
                                    <text><?php echo e($post->likes); ?></text>
                                </button>
                                <button name="comment"><i class="iconfont icon-comment"></i>
                                    <text><?php echo e($post->comment); ?></text>
                                </button>
                            </div>
                        </div>
                    </div>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            <?php else: ?>
                <p>There is no posts.</p>
            <?php endif; ?>
        </section>
        <!-- End Recent Items -->
    <?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>