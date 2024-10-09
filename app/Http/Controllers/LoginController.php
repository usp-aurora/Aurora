<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
#use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Socialite;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    #use AuthenticatesUsers;
    protected $redirectTO = '/';


/*    public function __construct()
    {
    	$this ->middleware('guest');
    }
*/

    public function redirectToProvider()
    {
    	return Socialite::driver('senhaunica')->redirect();
    }


    public function handleProviderCallback()
    {
    	$userSenhaUnica = Socialite::driver('senhaunica')->user();
    	
    	
    	$user = User::where('codpes', $userSenhaUnica->codpes)->first();

    	if (is_null($user))
    	{
    		$user = new User;
    		#$user->id = $userSenhaUnica->codpes;
    		$user->codpes = $userSenhaUnica->codpes;
    		$user->email = $userSenhaUnica->email;
    		$user->name = $userSenhaUnica -> nompes;
    		$user->save();
    	} 
    	Auth::login($user, true);
    	return redirect('/');
    }
    
    
    public function logout(Request $request)
    {
    	Auth::logout();
    	return redirect('/');
    }
    
}
