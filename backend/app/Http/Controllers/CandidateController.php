<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Disposition;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CandidateController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    $candidates = Candidate::join(
      'dispositions as dp',
      'dp.candidate_id',
      '=',
      'candidates.id'
    )
      ->select(
        'candidates.*',
        DB::raw('DATE_FORMAT(candidates.created_at, "%M %e, %Y, at %h:%i %p") AS created_at_candidate'),
        'dp.id as disposition_id',
        'dp.disposition',
        'dp.hire_type',
        'dp.fee',
        'dp.currency',
        'dp.rejection_reason',
        DB::raw('DATE_FORMAT(dp.created_at, "%M %e, %Y, at %h:%i %p") AS created_at_disposition'),      )
      ->paginate(15);

    return response($candidates, 200);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    try {
      DB::beginTransaction();

      $request->validate([
        'name' => 'required',
        'email' => 'required'
      ]);

      $candidate = Candidate::create($request->all());
      Disposition::create([
        'disposition' => 'undecided',
        'candidate_id' => $candidate->id
      ]);

      DB::commit();

      return response(true, 200);
    } catch (Exception $e) {
      DB::rollBack();
      return response(['message' => $e->getMessage()], 500);
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    try {
      $candidate = Candidate::find($id);
      return response($candidate, 200);
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
      Candidate::where('id', '=', $id)
        ->update([
          'name' => $request->input('name'),
          'email' => $request->input('email'),
          'phone' => $request->input('phone')
        ]);

      return response(true, 200);
    } catch (Exception $e) {
      return response(
        [
          'message' => $e->getMessage()
        ],
        500
      );
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    try {
      DB::beginTransaction();
      
      Disposition::where('candidate_id', '=', $id)
        ->delete();
      Candidate::where('id', '=', $id)
        ->delete();

      DB::commit();
      return response(true, 200);
    } catch (Exception $e) {
      DB::rollBack();
      return response(
        ['message' => $e->getMessage()],
        500
      );
    }
  }
}
