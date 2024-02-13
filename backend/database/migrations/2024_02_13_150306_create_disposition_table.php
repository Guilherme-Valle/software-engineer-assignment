<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Candidate;

use function Laravel\Prompts\table;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('dispositions', function (Blueprint $table) {
      Schema::dropIfExists('dispositions');
      $table->id();
      $table->foreignIdFor(Candidate::class);
      $table->enum('disposition', ['undecided', 'hired', 'rejected']);
      $table->enum('hire_type', ['internal', 'external'])->nullable();
      $table->decimal('fee', $precision = 12, $scale = 2)->nullable();
      $table->text('currency')->nullable();
      $table->text('rejection_reason')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('disposition');
  }
};
