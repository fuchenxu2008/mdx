<?php $__env->startSection('content'); ?>
    <div class="container">
        <a href="/" class="btn btn-default" style="margin-top: 20px;">Go Back</a>
        <h1><?php echo e($post->title); ?></h1>
        <div>
            <?php echo $post->body; ?>

        </div>
        <?php if(count(json_decode($post->images)) > 0): ?>
            <div>
                <?php $__currentLoopData = json_decode($post->images); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $img): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <img src="/storage/posts_images/<?php echo e($img); ?>" alt="post_img" style="width: 30%;">
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </div>
        <?php endif; ?>
        <small>Published at <?php echo e($post->created_at); ?></small>
        
        <?php echo Form::open(['action' => ['PostsController@destroy', $post->id], 'method' => 'POST']); ?>

            <?php echo e(Form::hidden('_method', 'DELETE')); ?>

            <?php echo e(Form::submit('Delete', ['class' => 'btn btn-danger'])); ?>

        <?php echo Form::close(); ?>


        
        <?php
            $id = $post->id.'_0'.'_'.time();
        ?>

        <?php echo $__env->make('inc.inputModal', [
            'post' => $post,
            'comment_target' => $post->user->name,
            'parent_id' => 0,
            'id' => $id
        ], array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
        <button type="button" onclick="$('#<?php echo e($id); ?>').modal('toggle')" class="btn btn-primary pull-right">Reply</button>

        

        


        <div class="comments-area">
            <h2 class="comments-title">Comments</h2>
            <ol class="comment-list" style="padding-left: 0;">
                <?php $commentSet = json_decode($comment_info, true); ?>
                <?php if(count($commentSet) > 0): ?>
                    <?php $__currentLoopData = $commentSet; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $id => $info): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <?php echo $__env->make('inc.nestedComment', ['children' => $info], array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
                        <?php if(array_keys($info['children']) > 0): ?>
                            <ol class="comment layer-0-children">
                                <?php $__currentLoopData = $info['children']; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $id => $children): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                    <?php echo $__env->make('inc.nestedComment', ['children' => $children], array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
                                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                            </ol>
                        <?php endif; ?>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                <?php endif; ?>
            </ol>
        </div>
    </div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>