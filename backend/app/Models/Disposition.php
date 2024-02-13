<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Disposition extends Model
{
    use HasFactory;

    protected $fillable = [
      'disposition',
      'hire_type',
      'fee',
      'currency',
      'rejection_reason',
      'candidate_id'
    ];
}
