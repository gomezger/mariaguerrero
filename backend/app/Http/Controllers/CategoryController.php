<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Product\ProductRepo;
use App\Repositories\Category\CategoryRepository;
use App\Exception\InvalidFileException;
use App\Helpers\Validator\FileValidator;
use App\Helpers\Validator\FormProductValidator;
use App\Helpers\File\FileUploader;
use App\Helpers\Response\Response;

class CategoryController extends Controller{
    
    public function insert(Request $request){
        $requestParams = getData($request);
        validateDate($request);
        $category= CategoryRepository::insert($requestParams);
        return Response::success('Categoria subida','categoria',$category);

    }

    public function getAll(){
        $categories= CategoryRepository::findAll();
        return Response::success('Categorias listas','categorias',$categories);
    }

    public function getById($id){
        $category= CategoryRepository::getById($id);
        return Response::success('Categoria cargada','categoria',$category);
    }

    public function update($id,Request $request){
        $requestParams = getData($request);
        validateDate($request);
        CategoryRepository::update($id,$requestParams);
    }

    public function delete($id){
        CategoryRepository::delete($id);
    } 

    private function getData(Request $request){
        return json_decode($request->input('json'),true);
    }

    private function validateData(Request $request,$requestParams){
        //Aca va una especie de FormCategoryValidator 
    }
}