<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use App\User;
use App\Post;
use App\Comment;
use Image;
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
        $posts = Post::orderBy('created_at', 'desc')->get();
        return view('pages.home')->with('posts', $posts);
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
            'images' => 'array|nullable|max:9'
        ]);

        $fileSet = array();
        if ($request->hasFile('images')) {
            $files = $request->file('images');
            foreach ($files as $img) {
                $image = Image::make($img);
                $width = $image->width();
                $height = $image->height();
                $size = $image->filesize();

                $thumbSize = $size;
                $thumbnail = Image::make($img);
                $thumbnail->fit(200, 200, function ($constraint) {
                    $constraint->upsize();
                });

                // return $thumbnail;
            // $this->validate($
                // $filenameWithExt = $img->getClientOriginalName();
                // $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
                $extension = $img->getClientOriginalExtension();
                $fileNameToStore = auth()->user()->id.'_'.time().'_'.$width.'x'.$height.'.'.$extension;
                array_push($fileSet, $fileNameToStore);

                $img->storeAs('public/posts_images', $fileNameToStore);
                $thumbnail->save(public_path('storage/posts_images/thumb_'.$fileNameToStore));
                // $info = getimagesize($img);
                // if ($info['mime'] == 'image/jpeg')
                // 	$compressedImage = imagecreatefromjpeg($img);
                // elseif ($info['mime'] == 'image/gif')
                // 	$compressedImage = imagecreatefromgif($img);
                // elseif ($info['mime'] == 'image/png')
                // 	$compressedImage = imagecreatefrompng($img);

                // imagejpeg($compressedImage, 'storage/posts_images/'.$fileNameToStore, 10);
            }
        }
        $files = json_encode($fileSet);

        $post = new Post;
        $post->category = "";
        $post->title = $request->input('title');
        $post->body = $request->input('body');
        $post->images = $files;
        $post->user_id = auth()->user()->id;
        $post->likes = 0;
        $post->comment = 0;
        $post->save();

        return response()->json([
                'post_id' => $post->id,
                'user_id' => auth()->user()->id,
                'user_name' => auth()->user()->name,
                'user_avatar' => auth()->user()->avatar,
                'title' => $request->input('title'),
                'images' => $files
            ]);
        return redirect('/')->with('success', 'Post created.');
    }

    public function like($id)
    {
        $post = Post::find($id);
        $post->likes = $post->likes + 1;
        $post->save();

        return response()->json($post);
    }

    public function comment(Request $request, $id, $parent_id)
    {
        $this->validate($request, [
            'comment' => 'required'
        ]);

        $post = Post::find($id);
        $post->comment = $post->comment + 1;
        $post->save();
        $comment = new Comment();
        $comment->post_id = $id;
        $comment->user_id = auth()->user()->id;
        $comment->content = $request->input('comment');
        $comment->parent_comment_id = $parent_id;
        $comment->save();

        // return response()->json($comment);
        return redirect('/posts/'.$id)->with('success', 'Comment published.');
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
        if (!isset($post)){
            return redirect('/')->with('error', "Can't find Post");
        }
        $comment_info = array();
        $commentSet = $post->comments;
        //建立根评论
        foreach ($commentSet as $comment) {
            if ($comment->parent_comment_id == 0) {
                // echo $comment;
                // {"id":4,"post_id":42,"user_id":1,"content":"cool","parent_comment_id":0,"created_at":"2017-10-12 17:34:09","updated_at":"2017-10-12 17:34:09"}
                $info = array(''.$comment->id.'' => array(
                    'id' => $comment->id,
                    'user_id' => $comment->user_id,
                    'user_name' => User::find($comment->user_id)->name,
                    'content' => $comment->content,
                    'parent_comment_id' => $comment->parent_comment_id,
                    'created_at' =>  $comment->created_at,
                    'children' => array(),
                    'layer' => 0
                ));
                // array_push($comment_info, $info);
                $comment_info = $comment_info + $info;
                // 删掉
            }
        }

        //找插值路径
        function findPath($this_path, $child_comment)
        {
            $parent_comment = Comment::find($child_comment->parent_comment_id);
            array_unshift($this_path, $parent_comment->id);
            if ($parent_comment->parent_comment_id != 0) {
                // 如果父评论id不为0
                $this_path = findPath($this_path, $parent_comment);
            }
            return $this_path;
        }

        //插值
        foreach ($commentSet as $comment) {
            if ($comment->parent_comment_id != 0) {
                $path = array();
                $path = findPath($path, $comment);
                // print_r($path);
                $node = &$comment_info;
                foreach ($path as $i) {
                    $node = &$node["".$i.""]['children'];
                }
                $info = array(''.$comment->id.'' => array(
                    'id' => $comment->id,
                    'user_id' => $comment->user_id,
                    'user_name' => User::find($comment->user_id)->name,
                    'content' => $comment->content,
                    'parent_comment_id' => $comment->parent_comment_id,
                    'created_at' =>  $comment->created_at,
                    'children' => array(),
                    'layer' => count($path)
                ));
                // array_push($node, $info);
                $node = $node + $info;
            }
        }
        $data = array(
            'post' => $post,
            'comment_info' => json_encode($comment_info)
        );
        return view('Posts.show')->with($data);
    }


    public function deleteComment($id, $commentId)
    {
        function findChild($commentId){
            $comments = Comment::where('parent_comment_id', $commentId)->get();
            // echo $comments;
            // if (count($comments > 0)) {
                foreach ($comments as $comment) {
                    // print_r($comment);
                    $childCommentId = $comment->id;
                    $comment->delete();
                    findChild($childCommentId);
                }
            // }
        }
        $comment = Comment::find($commentId);
        // print_r($comment);
        $childCommentId = $comment->id;
        $comment->delete();
        findChild($childCommentId);
        return redirect('/posts/'.$id)->with('success', 'Successfully Deleted Comment.');
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
