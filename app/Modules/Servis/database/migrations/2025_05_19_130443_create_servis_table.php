<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('servis', function (Blueprint $table) {
            $table->id();

            $table->string('code')->unique(); // FSH-3123
            $table->string('company_name');
            $table->string('authorized_person')->nullable();
            $table->string('machine_info')->nullable();
            $table->string('service_type'); // Tamir, Teklif, vs
            $table->decimal('price', 15, 2)->nullable();
            $table->enum('status', ['bekliyor', 'onaylandi', 'reddedildi'])->default('bekliyor');
            $table->string('sales_person')->nullable(); // Satış yetkilisi

            $table->text('notes')->nullable(); // Yapılacak işlemler
            $table->text('done_jobs')->nullable(); // Yapılan işlemler

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('servis');
    }
};
