<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class PagesController extends Controller
{
    // public function index()
    // {
    //     return view('pages.home');
    // }
    // Taken over by PostsController

    public function chat()
    {
        return view('pages.chat');
    }

    public function liked()
    {
        return view('pages.liked');
    }

    // public function profile()
    // {
    //     return view('pages.profile');
    // }
    // Taken over by ProfileController
}
