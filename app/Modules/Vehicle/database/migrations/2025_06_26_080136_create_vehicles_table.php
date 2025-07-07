<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('brand_id')->constrained('vehicle_brands')->onDelete('cascade');
            $table->string('model');
            $table->string('product');
            $table->string('type'); // elektrikli, dizel, vb.
            $table->string('cover_image')->nullable(); // Araç kapak fotoğrafı
            $table->string('slug')->unique();
            $table->text('description')->nullable(); // Opsiyonel açıklama

            $table->timestamps();
        });

    }

    public function down()
    {
        Schema::dropIfExists('vehicles');
    }
};
