<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('products', function (Blueprint $table) {
			$table->engine = 'InnoDB';	
			$table->charset = 'utf8';
			$table->collation = 'utf8_unicode_ci';
			
            $table->increments('id');
            $table->string('title', 100);
			$table->text('images');
			$table->longText('description');
            $table->integer('category_id')->unsigned()->nullable();
        });

        Schema::table('products', function (Blueprint $table) {
			
            $table->foreign('category_id')
			  ->references('id')->on('categories')
			  ->onDelete('restrict');			  
			
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
