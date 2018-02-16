@extends('layouts.app')

@section('content')
    <div class="container">
        @if (!Auth::guest())
            <div class="">
                <img class="center-block" src="/storage/avatar_images/{{Auth::user()->avatar}}" alt="Avatar" style="margin-top: 20px; border-radius: 100%; width: 100px; height: 100px;">
                <h1>Hello, Dear {{Auth::user()->name}}</h1>
            </div>
            <a href="{{ route('logout') }}" onclick="event.preventDefault();
                     document.getElementById('logout-form').submit();" class="btn btn-warning">
                Log Out
            </a>
            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                {{ csrf_field() }}
            </form>

            <h2>Upload Your Avatar</h2>
            <div class="row container">
                {!! Form::open(['action' => 'ProfileController@updateAvatar', 'method' => 'POST', 'enctype' => 'multipart/form-data']) !!}
                    {{Form::file('avatar', ['class' => 'form-control', 'style' => 'margin-bottom:20px; width: 70%;background-color: rgba(200,200,200,0.5); color: white;'])}}
                    {{Form::submit('Upload', ['class' => 'btn btn-default col-xs-3'])}}
                {!! Form::close() !!}
                @if (Auth::user()->avatar != 'noimage.png')
                    {!! Form::open(['action' => 'ProfileController@deleteAvatar', 'method' => 'POST']) !!}
                        {{Form::hidden('_method', 'DELETE')}}
                        {{Form::submit('Delete', ['class' => 'btn btn-danger col-xs-3'])}}
                    {!! Form::close() !!}
                @endif
            </div>
        @else
            <h1>Hello Guest</h1>
            <br><br>
            @include('auth.login')
            <a href="{{ route('register') }}" class="btn btn-default">Register</a>
        @endif
    </div>
    @include('inc.tabbar')
@endsection
