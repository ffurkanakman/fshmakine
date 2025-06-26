<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('sales_offers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vehicle_id')->constrained('vehicles')->onDelete('cascade');
            $table->string('client_name'); // Firma
            $table->string('client_authorized'); // Yetkili kişi
            $table->unsignedInteger('quantity')->default(1); // Adet
            $table->decimal('price', 15, 2); // Fiyat
            $table->string('currency')->default('TRY'); // USD, EUR, TRY...
            $table->date('offer_date')->nullable(); // Teklif tarihi
            $table->text('note')->nullable(); // Alt bilgi notu
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('sales_offers');
    }
};
