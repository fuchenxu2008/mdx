<!-- Tab Bar -->
<nav id="tab_bar" class="navbar navbar-inverse navbar-fixed-bottom center-block">
  <div>
      <a class="col-xs-3 tab_btn" href="/">
          <img src="<?php echo e(asset('pic/006-coins.svg')); ?>" alt="Trade Now"><br>
          <label>Trade Now</label>
      </a>
      <a class="col-xs-3 tab_btn" href="/chat">
          <img src="<?php echo e(asset('pic/004-chat.svg')); ?>" alt="Messaging"><br>
              <label>Message</label>
      </a>
      <a class="col-xs-3 tab_btn" href="/liked">
          <img src="<?php echo e(asset('pic/003-star.svg')); ?>" alt="Liked"><br>
          <label>Liked</label>
      </a>
      <a class="col-xs-3 tab_btn" id="tab_btn_me" href="/me">
          <img src="<?php echo e(asset('pic/001-social.svg')); ?>" alt="Me"><br>
          <label>Me</label>
      </a>
  </div>
</nav>
<!-- End Tab Bar -->

<!-- Blur Layer -->
<nav id="tab_bar_blur" class="navbar navbar-inverse navbar-fixed-bottom center-block blur">
</nav>
<!-- End Blur Layer -->
