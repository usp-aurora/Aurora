<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\User;


class UserController extends Controller
{
	public function index()
	{
		return Auth::user();
	}

	public function onboarded()
	{
		$user = Auth::user();
		if (!$user) {
			return false;
		}

		$userEntry = User::where('codpes', $user->codpes)->first();

		$onboarded = $userEntry->onboarded_at !== null;
		if(!$onboarded){
			$userEntry->onboarded_at = true;
			$userEntry->onboarded_at = now();
			$userEntry->save();
		}

		return $onboarded;
	}
}
