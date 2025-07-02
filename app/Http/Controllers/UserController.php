<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserController extends Controller
{
	public function index(): ?User
	{
		return Auth::user();
	}
}
