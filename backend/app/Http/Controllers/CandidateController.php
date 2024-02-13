<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use Exception;
use Illuminate\Http\Request;

class CandidateController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function index()
	{
		$candidates = Candidate::paginate(15);

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

			Candidate::create($request->all());
			
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
