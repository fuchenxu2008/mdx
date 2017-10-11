@extends('layouts.app')

@section('content')
    <h1>Chat Page</h1>
    @if (isset($data))
        <h2>{{$data}}</h2>
    @endif

@endsection
