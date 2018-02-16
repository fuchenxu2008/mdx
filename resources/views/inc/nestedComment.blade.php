<article class="comment-body">
    <footer class="comment-meta">
        <div class="comment-author vcard">
            <img src="/storage/avatar_images/{{App\User::find($children['user_id'])->avatar}}" class='avatar avatar-56 photo' style="border-radius:100%;" height='56' width='56' />
            <b class="fn">{{$children['user_name']}}</b>
        </div><!-- .comment-author -->
        <div class="comment-metadata">
            <time datetime="datetime">{{$children['created_at']['date']}}</time>
        </div><!-- .comment-metadata -->
    </footer><!-- .comment-meta -->
    <div class="comment-content">
        <p><b>{{$children['content']}}</b></p>
    </div><!-- .comment-content -->
    <div class="reply">
        @php
            $id = $post->id.'_'.$children['id'].'_'.time();
        @endphp
        @include('inc.inputModal', [
            'post' => $post,
            'comment_target' => $children['user_name'],
            'parent_id' => $children['id'],
            'id' => $id
        ])
        <div class="row">
            <a class='comment-reply-link col-xs-6' onclick="$('#{{$id}}').modal('toggle')">Reply</a>
            {!! Form::open(['action' => ['PostsController@deleteComment', $post->id, $children['id']], 'method' => 'POST']) !!}
                {{Form::hidden('_method', 'DELETE')}}
                {{Form::submit('Delete', ['class' => 'col-xs-6', 'style' => 'color: red; border: none; background-color: transparent'])}}
            {!! Form::close() !!}
        </div>

    </div>
</article>
@if ($children['layer'] != 0)
    @foreach ($children['children'] as $id => $info)
        <ol class="children">
            <li class="">
                @include('inc.nestedComment', ['children' => $info])
            </li>
        </ol>
    @endforeach
@endif
