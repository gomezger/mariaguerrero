<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Product\ProductRepo;
use App\Repositories\Category\CategoryRepo;
use App\Exception\InvalidFileException;
use App\Helpers\Validator\FileValidator;
use App\Helpers\Validator\FormProductValidator;
use App\Helpers\File\FileUploader;
use App\Helpers\Response\Response;

class CategoryController extends Controller{
    
    public function insert(Request $request){
        $requestParams = $this->getData($request);
        $this->validateData($requestParams);
        $category= CategoryRepo::insert($requestParams);
        return Response::success('Categoria subida','categoria',$category);

    }

    public function getAll(){
        $categories= CategoryRepo::findAll();
        return Response::success('Categorias listas','categorias',$categories);
    }

    public function getById($id){
        $category = CategoryRepo::findById($id);
        return Response::success('Categoria cargada','categoria',$category);
    }

    public function update($id,Request $request){
        $requestParams = $this->getData($request);
        $this->validateData($request);
        $category = CategoryRepo::update($id,$requestParams);
        return Response::success('Categoria editada','categoria',$category);
    }

    public function delete($id){
        $category = CategoryRepo::delete($id);
        return Response::success('Categoria eliminada','categoria',$category);
    } 

    private function getData(Request $request){
        return $request->json()->all();
    }

    private function validateData($requestParams){
        //Aca va una especie de FormCategoryValidator 
    }
}