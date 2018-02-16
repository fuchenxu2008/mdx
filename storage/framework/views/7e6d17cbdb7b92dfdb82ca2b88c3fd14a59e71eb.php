<?php $__env->startSection('content'); ?>
    <div class="container">
        <?php if(!Auth::guest()): ?>
            <div class="">
                <img class="center-block" src="/storage/avatar_images/<?php echo e(Auth::user()->avatar); ?>" alt="Avatar" style="margin-top: 20px; border-radius: 100%; width: 100px; height: 100px;">
                <h1>Hello, Dear <?php echo e(Auth::user()->name); ?></h1>
            </div>
            <a href="<?php echo e(route('logout')); ?>" onclick="event.preventDefault();
                     document.getElementById('logout-form').submit();" class="btn btn-warning">
                Log Out
            </a>
            <form id="logout-form" action="<?php echo e(route('logout')); ?>" method="POST" style="display: none;">
                <?php echo e(csrf_field()); ?>

            </form>

            <h2>Upload Your Avatar</h2>
            <div class="row container">
                <?php echo Form::open(['action' => 'ProfileController@updateAvatar', 'method' => 'POST', 'enctype' => 'multipart/form-data']); ?>

                    <?php echo e(Form::file('avatar', ['class' => 'form-control', 'style' => 'margin-bottom:20px; width: 70%;background-color: rgba(200,200,200,0.5); color: white;'])); ?>

                    <?php echo e(Form::submit('Upload', ['class' => 'btn btn-default col-xs-3'])); ?>

                <?php echo Form::close(); ?>

                <?php if(Auth::user()->avatar != 'noimage.png'): ?>
                    <?php echo Form::open(['action' => 'ProfileController@deleteAvatar', 'method' => 'POST']); ?>

                        <?php echo e(Form::hidden('_method', 'DELETE')); ?>

                        <?php echo e(Form::submit('Delete', ['class' => 'btn btn-danger col-xs-3'])); ?>

                    <?php echo Form::close(); ?>

                <?php endif; ?>
            </div>
        <?php else: ?>
            <h1>Hello Guest</h1>
            <br><br>
            <?php echo $__env->make('auth.login', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
            <a href="<?php echo e(route('register')); ?>" class="btn btn-default">Register</a>
        <?php endif; ?>
    </div>
    <?php echo $__env->make('inc.tabbar', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>