<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Post\PostStoreRequest;
use App\Http\Requests\Admin\Post\PostUpdateRequest;
use App\Models\Post;
use App\Services\Admin\Post\PostService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
  public function __construct(protected PostService $service)
  {
  }
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    return Inertia::render("Admin/Post/Index", $this->service->dataIndex($request->search) ?? []);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return Inertia::render("Admin/Post/Create");
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(PostStoreRequest $request)
  {
    $this->service->store($request->data());

    return to_route('posts.index')->with('success', 'Blog baru berhasil di posting!');
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Post $post)
  {
    return Inertia::render("Admin/Post/Edit", $this->service->dataEdit($post) ?? []);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(PostUpdateRequest $request, Post $post)
  {
    $this->service->update($post, $request->data());
    return to_route('posts.index')->with('success', 'Blog berhasil di edit!');
  }

  public function updateStatus(Request $request, Post $post)
  {
    $this->service->updateStatus($post, $request->status);
    return back()->with('success', 'Status blog berhasil di ubah jadi '.$request->status);
  }
  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Post $post)
  {
    if($post['status'] === 'published'){
      return back()->with('failed','Blog sedang di publikasi, tidak dapat di hapus!');
    } else {
      $this->service->destroy($post);
      return back()->with('success', 'Blog berhasil di hapus!');
    }
  }
}
