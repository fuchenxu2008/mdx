@extends('layouts.app')

@section('content')
    <div class="container">
        <a href="/" class="btn btn-default" style="margin-top: 20px;">Go Back</a>
        <h1>{{$post->title}}</h1>
        <div>
            {!! $post->body !!}
        </div>
        @if (count(json_decode($post->images)) > 0)
            <div>
                @foreach (json_decode($post->images) as $img)
                    <img src="/storage/posts_images/{{$img}}" alt="post_img" style="width: 30%;">
                @endforeach
            </div>
        @endif
        <small>Published at {{$post->created_at}}</small>
        {{-- Delete Post --}}
        {!! Form::open(['action' => ['PostsController@destroy', $post->id], 'method' => 'POST']) !!}
            {{Form::hidden('_method', 'DELETE')}}
            {{Form::submit('Delete', ['class' => 'btn btn-danger'])}}
        {!! Form::close() !!}

        {{-- Comment Post --}}
        @php
            $id = $post->id.'_0'.'_'.time();
        @endphp

        @include('inc.inputModal', [
            'post' => $post,
            'comment_target' => $post->user->name,
            'parent_id' => 0,
            'id' => $id
        ])
        <button type="button" onclick="$('#{{$id}}').modal('toggle')" class="btn btn-primary pull-right">Reply</button>

        {{-- Comment-Area --}}

        {{-- {{$post->getComments()}} --}}


        <div class="comments-area">
            <h2 class="comments-title">Comments</h2>
            <ol class="comment-list" style="padding-left: 0;">
                @php $commentSet = json_decode($comment_info, true); @endphp
                @if (count($commentSet) > 0)
                    @foreach ($commentSet as $id => $info)
                        @include('inc.nestedComment', ['children' => $info])
                        @if (array_keys($info['children']) > 0)
                            <ol class="comment layer-0-children">
                                @foreach ($info['children'] as $id => $children)
                                    @include('inc.nestedComment', ['children' => $children])
                                @endforeach
                            </ol>
                        @endif
                    @endforeach
                @endif
            </ol>
        </div>
    </div>
@endsection
