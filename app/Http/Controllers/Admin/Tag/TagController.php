<?php

namespace App\Http\Controllers\Admin\Tag;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Tag\TagStoreRequest;
use App\Models\Tag;
use App\Services\Admin\Tag\TagService;
use Illuminate\Http\Request;

class TagController extends Controller
{
  public function __construct(protected TagService $service){}
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    return inertia('Admin/Tag/Index', $this->service->dataIndex($request->search));
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return inertia('Admin/Tag/Create');
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(TagStoreRequest $request)
  {
    $this->service->store($request->data());
    return to_route('tags.index')->with('success', 'Tag "'.$request->data()['name'].'" berhasil di tambahkan');
  }

  /**
   * Display the specified resource.
   */
  public function show(Tag $tag)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Tag $tag)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Tag $tag)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Tag $tag)
  {
    //
  }
}
