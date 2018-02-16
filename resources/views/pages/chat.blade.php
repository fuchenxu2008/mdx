@extends('layouts.app')

@section('content')
    <div class="container">

        <div id="app">
            <div>
                <h3>Chat Page</h3>
                <span class="badge pull-right">@{{ usersInRoom.length }}</span>
                <span class="badge pull-right" v-for="user in usersInRoom" :key="user.key">@{{ user.name }}</span>
            </div>
            <chat-log :messages="messages"></chat-log>
    	    @if(!Auth::guest())
            	<chat-composer @messagesent="addMessage" current-user="{{Auth::user()}}"></chat-composer>
    	    @else
            	<chat-composer @messagesent="addMessage" current-user="Guest"></chat-composer>
    	    @endif
        </div>

    </div>

    @include('inc.tabbar')
@endsection

@section('script')
    {{-- Script --}}
    <script src="{{ asset('js/chat.js') }}"></script>
@endsection
