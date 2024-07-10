<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->dateTime('date');
            $table->string('customer');
            $table->unsignedBigInteger('customer_id')->nullable();
            $table->integer('total_quantity')->nullable();
            $table->decimal('total_price',10,2)->nullable();
            $table->decimal('discount',10,2)->nullable();
            $table->string('payment_method')->nullable();
            $table->text('note')->nullable();
            $table->enum('status', ['0','1','2'])->nullable()->default('1')->comment('0: canceled, 1: proccess, 2: done');
            $table->foreignId('created_by')->nullable()->constrained('users');
            $table->foreignId('updated_by')->nullable()->constrained('users');
            $table->foreignId('deleted_by')->nullable()->constrained('users');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};