@extends('layouts.app')

@section('content')
    <h1>{{$post->title}}</h1>
    <div>
        {!! $post->body !!}
    </div>
    <small>Published at {{$post->created_at}}</small>
    {!! Form::open(['action' => ['PostsController@destroy', $post->id], 'method' => 'POST']) !!}
        {{Form::hidden('_method', 'DELETE')}}
        {{Form::submit('Delete', ['class' => 'btn btn-danger'])}}
    {!! Form::close() !!}
@endsection
