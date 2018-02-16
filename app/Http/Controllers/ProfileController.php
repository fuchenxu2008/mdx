<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Image;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('pages.profile');
    }

    public function updateAvatar(Request $request)
    {
        // var_dump($request);
        $this->validate($request, [
            'avatar' => 'image|required|max:2999'
        ]);

        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            $extension = $avatar->getClientOriginalExtension();
            $fileNameToStore = 'avatar_'.auth()->user()->id.'.'.$extension;
            $cropped_avatar = Image::make($avatar)->fit(200);
            $cropped_avatar->save(public_path('storage/avatar_images/'.$fileNameToStore));
        }else {
            return redirect('/me')->with('error', 'No image uploaded');
        }
        $user = User::find(auth()->user()->id);
        if ($user->avatar != 'noimage.png') {
            Storage::delete('public/avatar_images/'.$user->avatar);
        }
        $user->avatar = $fileNameToStore;
        $user->save();

        return redirect('/me')->with('success', 'Avatar Updated.');
    }

    public function deleteAvatar()
    {
        $user = User::find(auth()->user()->id);
        $avatar_path = $user->avatar;
        if ($avatar_path != 'noimage.png') {
            Storage::delete('public/avatar_images/'.$avatar_path);
        }
        $user->avatar = 'noimage.png';
        $user->save();
        return redirect('/me')->with('success', 'Avatar Deleted.');
    }
}
