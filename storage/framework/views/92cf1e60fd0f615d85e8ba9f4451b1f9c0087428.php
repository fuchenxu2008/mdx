<?php $__env->startSection('content'); ?>
    <h1>Chat Page</h1>
    <?php if(isset($data)): ?>
        <h2><?php echo e($data); ?></h2>
    <?php endif; ?>

<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>