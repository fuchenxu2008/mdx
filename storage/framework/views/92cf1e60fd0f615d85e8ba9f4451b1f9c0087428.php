<?php $__env->startSection('content'); ?>
    <div class="container">

        <div id="app">
            <div>
                <h3>Chat Page</h3>
                <span class="badge pull-right">{{ usersInRoom.length }}</span>
                <span class="badge pull-right" v-for="user in usersInRoom" :key="user.key">{{ user.name }}</span>
            </div>
            <chat-log :messages="messages"></chat-log>
    	    <?php if(!Auth::guest()): ?>
            	<chat-composer @messagesent="addMessage" current-user="<?php echo e(Auth::user()); ?>"></chat-composer>
    	    <?php else: ?>
            	<chat-composer @messagesent="addMessage" current-user="Guest"></chat-composer>
    	    <?php endif; ?>
        </div>

    </div>

    <?php echo $__env->make('inc.tabbar', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('script'); ?>
    
    <script src="<?php echo e(asset('js/chat.js')); ?>"></script>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>