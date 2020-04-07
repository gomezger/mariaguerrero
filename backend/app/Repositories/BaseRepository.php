<?php

namespace App\Repositories;

interface BaseRepository{
    public function getModel();

    public function findById($id);
    
    public function findAll();

    public function delete($id);

    public function update($id,$params);

    public function insert($params);
}


