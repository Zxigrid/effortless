<?php

namespace App\Http\Controllers\Admin\Category;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Category\CategoryStoreRequest;
use App\Http\Requests\Admin\Category\CategoryUpdateRequest;
use App\Models\Category;
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
  public function index(Request $request)
  {
    return inertia('Admin/Category/Index', $this->service->dataIndex($request->search));
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
    return to_route('categories.index')->with('success', 'Kategori "'.$request->data()['name'].'" berhasil di buat!');
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
  public function edit(Category $category)
  {
    return inertia('Admin/Category/Edit', $this->service->dataEdit($category) ?? []);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(CategoryUpdateRequest $request, Category $category)
  {
    $this->service->update($category, $request->data());
    return to_route('categories.index')->with('success', 'Kategori berhasil di ubah jadi "'.$request->data()['name'].'" !');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Category $category)
  {
    $this->service->destroy($category);
    return back()->with('success', 'Kategori "'.$category->name.'" berhasil di hapus!');
  }
}
