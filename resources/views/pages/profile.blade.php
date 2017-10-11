@extends('layouts.app')

@section('content')
    @if (!Auth::guest())
        <div class="">
            <h1>Hello, Dear {{Auth::user()->name}}</h1>
        </div>
        <a href="{{ route('logout') }}" onclick="event.preventDefault();
                 document.getElementById('logout-form').submit();" class="btn btn-warning">
            Log Out
        </a>
        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
            {{ csrf_field() }}
        </form>
    @else
        <h1>Hello Guest</h1>
        <br><br>
        @include('auth.login')
        <a href="{{ route('register') }}" class="btn btn-default">Register</a>
    @endif
@endsection
