<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('brand');
            $table->string('model');
            $table->string('type'); // elektrikli, dizel, vb.
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
