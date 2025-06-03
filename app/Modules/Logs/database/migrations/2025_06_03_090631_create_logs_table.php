<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('logs', function (Blueprint $table) {
            $table->id();
            $table->string('subject_type')->nullable(); // Model tipi (örnek: App\Models\Service)
            $table->unsignedBigInteger('subject_id')->nullable(); // Model ID
            $table->unsignedBigInteger('causer_id')->nullable(); // Auth kullanıcısı
            $table->string('event')->nullable(); // created, updated, deleted
            $table->json('properties')->nullable(); // before/after değerleri
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('logs');
    }
};
