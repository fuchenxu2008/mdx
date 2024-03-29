{!! Form::open(['action' => ['PostsController@comment', $post->id, $parent_id], 'method' => 'POST']) !!}
    <div class="modal fade" id="{{$id}}" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="" style="color: black;">
                {{Form::label('comment', 'Reply '.$comment_target.': ')}}
            </h4>
          </div>
          <div class="modal-body">
            {{Form::textarea('comment', '', ['class' => 'form-control'])}}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            {{Form::submit('Reply', ['class' => 'btn btn-primary'])}}
          </div>
        </div>
      </div>
    </div>
{!! Form::close() !!}
