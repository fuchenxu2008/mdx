<?php

use App\Events\MessagePosted;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Application Homepage for Showing Posts
Route::get('/', 'PostsController@index');

    // Indiviual Page for Single Post
    Route::get('/posts/{post}', 'PostsController@show');

    // Delete a Post
    Route::delete('/posts/{post}', 'PostsController@destroy');

    // Create a New Post
    Route::post('/posts/create', 'PostsController@store');
        //In case of authentication redirect
        Route::get('/posts/create', function (){
            return redirect('/');
        });

    // Like a Post
    Route::get('/posts/{post}/like', 'PostsController@like');

    // Comment a Post
    Route::post('/posts/{post}/comment/{parent_comment}', 'PostsController@comment');

    // Delete a Comment
    Route::delete('/posts/{post}/comment/{parent_comment}', 'PostsController@deleteComment');
        //In case of authentication redirect
        Route::get('/posts/{post}/comment/{parent_comment}', function ($post, $parent_comment){
            return redirect('/posts/'.$post);
        });

// Chat Main Page
Route::get('/chat', 'PagesController@chat');
                                            // ->middleware('auth');

    // Route for Retrieving All Chat Messages
    Route::get('/messages', function(){
        return App\Message::with('user')->get();
    });

    // Send a New Chat Message
    Route::post('/messages', function(){
        // Store the new messages
        if (!Auth::guest()) {
            $user = Auth::user();
        }else {
            $user = App\User::find(0);
        }

        $message = $user->messages()->create([
            'message' => request()->get('message')
        ]);

        // Announce That a New Message Has Been Posted
        broadcast(new MessagePosted($message, $user))->toOthers();

        return ['status' => 'OK'];
    });

    Route::get('/avatar/{id}', function ($id){
        return App\User::find($id)->avatar;
    });

// Page for  Liked Items
Route::get('/liked', 'PagesController@liked');

// Profile Page
Route::get('/me', 'ProfileController@index');

    // Upload New Avatar
    Route::post('/me/avatar/update', 'ProfileController@updateAvatar');
        //In case of authentication redirect
        Route::get('/me/avatar/update', function (){
            return redirect('/me');
        });

    // Route for Deleting Avatar
    Route::delete('/me/avatar/delete', 'ProfileController@deleteAvatar');
        //In case of authentication redirect
        Route::get('/me/avatar/delete', function (){
            return redirect('/me');
        });

// Authentication Routes
Auth::routes();
    //In case of authentication redirect
    Route::get('/logout', function (){
        return redirect('/me');
    });

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
