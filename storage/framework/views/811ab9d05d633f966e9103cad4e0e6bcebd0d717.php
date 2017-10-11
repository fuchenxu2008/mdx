<?php $__env->startSection('content'); ?>
    <h1><?php echo e($post->title); ?></h1>
    <div>
        <?php echo $post->body; ?>

    </div>
    <small>Published at <?php echo e($post->created_at); ?></small>
    <?php echo Form::open(['action' => ['PostsController@destroy', $post->id], 'method' => 'POST']); ?>

        <?php echo e(Form::hidden('_method', 'DELETE')); ?>

        <?php echo e(Form::submit('Delete', ['class' => 'btn btn-danger'])); ?>

    <?php echo Form::close(); ?>

<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>