<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Disposition;
use Exception;
use Illuminate\Http\Request;

class CandidateController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function index()
	{
		$candidates = Candidate::join(
			'dispositions as dp',
			'dp.candidate_id',
			'=',
			'candidates.id'
		)
			->paginate(15);

		return response($candidates, 200);
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(Request $request)
	{
		try {
			$request->validate([
				'name' => 'required',
				'email' => 'required'
			]);

			$candidate = Candidate::create($request->all());
			Disposition::create([
				'disposition' => 'undecided',
				'candidate_id' => $candidate->id
			]);

			return response(true, 200);
		} catch (Exception $e) {
			return response(['message' => $e->getMessage()], 500);
		}
	}

	/**
	 * Display the specified resource.
	 */
	public function show(string $id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, string $id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(string $id)
	{
		//
	}
}
