<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use App\Post;
use Illuminate\Http\Request;

class PostsController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth', ['except' => ['index', 'show']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::orderBy('updated_at', 'desc')->get();
        return view('pages.home')->with('posts', $posts);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            // 'category' => 'required',
            'title' => 'required',
            'body' => 'required',
            'images' => 'array|nullable|max:8'
        ]);




        // function compress($source, $destination, $quality) {
        //
        // 		$info = getimagesize($source);
        //
        // 		if ($info['mime'] == 'image/jpeg')
        // 			$image = imagecreatefromjpeg($source);
        //
        // 		elseif ($info['mime'] == 'image/gif')
        // 			$image = imagecreatefromgif($source);
        //
        // 		elseif ($info['mime'] == 'image/png')
        // 			$image = imagecreatefrompng($source);
        //
        // 		imagejpeg($image, $destination, $quality);
        //
        // 		return $destination;
        // 	}
        //
        // 	$source_img = 'source.jpg';
        // 	$destination_img = 'destination .jpg';
        //
        // 	$d = compress($source_img, $destination_img, 90);






        $fileSet = array();
        if ($request->hasFile('images')) {
            $files = $request->file('images');
            foreach ($files as $img) {
                // $this->validate($
                $filenameWithExt = $img->getClientOriginalName();
                $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
                $extension = $img->getClientOriginalExtension();
                $fileNameToStore = $filename.'_'.time().'.'.$extension;
                array_push($fileSet, $fileNameToStore);
                $path = $img->storeAs('public/posts_images',$fileNameToStore);
            }
        }else {
            return view('pages.chat')->with('data', $request->file('images'));
        }
        $files = json_encode($fileSet);
        // return view('pages.chat')->with('data', $files);

        $post = new Post;
        $post->category = "";
        $post->title = $request->input('title');
        $post->body = $request->input('body');
        $post->images = $files;
        $post->user_id = auth()->user()->id;
        $post->likes = 0;
        $post->comment = 0;
        $post->save();

        // return response()->json($post);
        return redirect('/')->with('success', 'Post created.');
    }

    public function like($id)
    {
        // $post = Post::find($id);
        // $post->likes += 1;
        // $post->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = Post::find($id);
        return view('Posts.show')->with('post', $post);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = Post::find($id);
        $images = json_decode($post->images);
        if (count($images) > 0) {
            foreach ($images as $img) {
                Storage::delete('public/posts_images/'.$img);
            }
        }
        $post->delete();

        return redirect('/');
    }
}
