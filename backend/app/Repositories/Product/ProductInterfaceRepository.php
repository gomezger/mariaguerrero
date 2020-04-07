<?php
namespace App\Repositories\Product;
use App\Repositories\BaseRepository;

interface ProductInterfaceRepository extends BaseRepository{
    public function getProductByCategory($category);
}