<?php

namespace App\Http\Controllers;

use App\Models\Disposition;
use Exception;
use Illuminate\Http\Request;

class DispositionController extends Controller
{
  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    try {
      $disposition = Disposition::find($id);

      return response($disposition, 200);
    } catch (Exception $e) {
      return response(['message' => $e->getMessage()], 400);
    }
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    try {
      $request->validate([
        'disposition' => 'required',
        'hire_type' => 'required_if:disposition,hired',
        'currency' => 'required_with:fee',
        'rejection_reason' => 'required_if:disposition,rejected'
      ]);

      Disposition::where('id', '=', $id)
        ->update([
          'disposition' => $request->input('disposition'),
          'hire_type' => $request->input('hire_type'),
          'fee' => $request->input('fee'),
          'currency' => $request->input('currency'),
          'rejection_reason' => $request->input('rejection_reason'),
        ]);

      return response(true, 200);
    } catch (Exception $e) {
      return response(['message' => $e->getMessage()], 500);
    }
  }
}
