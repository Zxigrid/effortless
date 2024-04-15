<?php

namespace App\Helpers;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class ImageHelper
{
  public static function save(UploadedFile $image)
  {
    // generate a unique image name
    $imageName = Str::random(40);

    // save the image
    Image::make($image)->encode('image/webp', 80)->save(storage_path('app/public/'.$imageName));
    return $imageName;
  }
}
