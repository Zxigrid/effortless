<?php

namespace App\Http\Controllers\Admin\Category;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Category\CategoryStoreRequest;
use App\Services\Admin\Category\CategoryService;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
  public function __construct(protected CategoryService $service)
  {
  }
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    return inertia('Admin/Category/Index');
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return inertia('Admin/Category/Create');
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(CategoryStoreRequest $request)
  {
    $this->service->store($request->data());
    return to_route('categories.index')->with('success', 'Kategori baru berhasil di buat!');
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
  public function edit(string $id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }
}
