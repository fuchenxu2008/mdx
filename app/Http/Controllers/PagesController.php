<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PagesController extends Controller
{
    public function index()
    {
        return view('pages.home');
    }

    public function chat()
    {
        return view('pages.chat');
    }

    public function liked()
    {
        return view('pages.liked');
    }

    public function profile()
    {
        return view('pages.profile');
    }
}
