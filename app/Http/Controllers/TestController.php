<?php
namespace App\Http\Controllers;


use App\Models\Institutes;

class TestController extends Controller
{
	public function index()
	{
		$institutes = Institutes::all();
		dd($institutes);
	}
}