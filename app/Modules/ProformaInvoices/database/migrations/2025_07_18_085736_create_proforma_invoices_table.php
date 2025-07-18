<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('proforma_invoices', function (Blueprint $table) {
            $table->id();
            $table->string('proforma_no')->unique();
            $table->string('company_name');
            $table->text('address')->nullable();
            $table->string('tax_office')->nullable();
            $table->string('authorized_person')->nullable();
            $table->string('email')->nullable();
            $table->string('delivery_time')->nullable();
            $table->string('delivery_place')->nullable();
            $table->string('payment')->nullable();
            $table->string('warranty')->nullable();
            $table->string('origin')->nullable();
            $table->string('gtip_no')->nullable();
            $table->text('bank_info')->nullable();
            $table->string('account_name')->nullable();
            $table->string('iban')->nullable();
            $table->decimal('total_price', 15, 2)->default(0);
            $table->timestamps();
        });

    }

    public function down()
    {
        Schema::dropIfExists('proforma_invoices');
    }
};
