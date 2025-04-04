<?php

namespace App\Http\Controllers;
use \App\Models\Subject;
use \App\Models\Requirement;
use Illuminate\Support\Facades\DB;


class TestController extends Controller
{
	public function subject()
	{
		$subjects = Subject::select('code', 'name')->get();	
		dd($subjects);
	}

	public function requirement()
	{
		$requirements = Requirement::all();
		foreach ($requirements as $requirement) {
			echo "Subject Code: " . $requirement->subject_code . "\n";
			echo "Subject Name: " . $requirement->subject_name . "\n";
			echo "Required Subject Code: " . $requirement->required_subject_code . "\n";
			echo "Required Subject Name: " . $requirement->required_subject_name . "\n";
		}
	}
}