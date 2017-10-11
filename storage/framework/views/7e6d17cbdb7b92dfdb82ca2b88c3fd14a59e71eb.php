<?php $__env->startSection('content'); ?>
    <?php if(!Auth::guest()): ?>
        <div class="">
            <h1>Hello, Dear <?php echo e(Auth::user()->name); ?></h1>
        </div>
        <a href="<?php echo e(route('logout')); ?>" onclick="event.preventDefault();
                 document.getElementById('logout-form').submit();" class="btn btn-warning">
            Log Out
        </a>
        <form id="logout-form" action="<?php echo e(route('logout')); ?>" method="POST" style="display: none;">
            <?php echo e(csrf_field()); ?>

        </form>
    <?php else: ?>
        <h1>Hello Guest</h1>
        <br><br>
        <?php echo $__env->make('auth.login', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
        <a href="<?php echo e(route('register')); ?>" class="btn btn-default">Register</a>
    <?php endif; ?>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>