@extends('layouts.app')

@section('content')
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

    {{-- Create Post --}}
    <div class="modal fade" id="create_post_btn" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id=""></h4>
                </div>
                <div class="modal-body">
                    {!! Form::open(array('action' => 'PostsController@store', 'method' => 'POST', 'enctype'=>'multipart/form-data', 'files' => true)) !!}
                    {{Form::text('title', 'test', ['class' => 'form-control', 'placeholder' => 'Title'])}}
                    {{Form::textarea('body', 'test', ['class' => 'form-control', 'placeholder' => 'Body'])}}
                    <div id="upBox">
                        <div id="inputBox">
                            {{-- {{Form::file('images', ['multiple' => 'true', 'id' => 'file'])}} --}}
                            {{-- <input type="file" name="images" title="请选择图片" id="file" multiple accept="image/png,image/jpg,image/gif,image/JPEG"/> --}}
                            {{-- <input type="file" name="images[]" title="请选择图片" id="file" /> --}}
                            {!! Form::file('images[]', array('multiple'=>true, 'id' => 'file')) !!}
                            {{-- {{Form::file('images')}} --}}
                            点击选择图片
                        </div>
                        <div id="imgBox"></div>
                        {{-- <button id="btn">上传</button> --}}
                    </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        {{Form::submit('Publish', ['class' => 'btn btn-primary'])}}
                        {!! Form::close() !!}
                    </div>
                </div>
            </div>
        </div>
        {{-- End Create Post --}}

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
            @if(count($posts) > 0)
                @foreach ($posts as $post)
                    <div class="post container">
                        <!-- User -->
                        <div class="post_user">
                            <img src="{{ asset('pic/logo2.JPG') }}" alt="logo"> {{$post->user->name}}
                        </div>
                        <div class="post_content" onclick="window.location.href='/posts/{{$post->id}}'">
                            <!-- Post Text -->
                            <p class="post_text">{{$post->title}}</p>
                            <!-- Post Img -->
                            @if(count(json_decode($post->images)) > 0)
                                @foreach (json_decode($post->images) as $img)
                                    <img src="/storage/posts_images/{{$img}}" alt="demo">
                                @endforeach
                            @endif
                            <!-- Interactive button -->
                        </div>
                        <div class="post_btn row">
                            <div class="col-xs-3 text-left"><p>view: </p></div>
                            <div class="col-xs-9 text-right">
                                <button name="like"><i class="iconfont icon-like"></i>
                                    <text>{{$post->likes}}</text>
                                </button>
                                <button name="comment"><i class="iconfont icon-comment"></i>
                                    <text>{{$post->comment}}</text>
                                </button>
                            </div>
                        </div>
                    </div>
                @endforeach
            @else
                <p>There is no posts.</p>
            @endif
        </section>
        <!-- End Recent Items -->
    @endsection
