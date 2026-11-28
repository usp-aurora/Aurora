<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
#use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Socialite;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use App\Services\Metrics\Metrics;

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


    public function handleProviderCallback(Metrics $metrics)
    {
    	$userSenhaUnica = Socialite::driver('senhaunica')->user();
    	
    	
    	$user = User::where('codpes', $userSenhaUnica->codpes)->first();

    	$isNewUser = is_null($user);
    	if ($isNewUser)
    	{
    		$user = new User;
    		#$user->id = $userSenhaUnica->codpes;
    		$user->codpes = $userSenhaUnica->codpes;
    		$user->email = $userSenhaUnica->email;
    		$user->name = $userSenhaUnica -> nompes;
    		$user->save();
    	} 
    	Auth::login($user, true);

    	$user->forceFill(['last_login_at' => now()])->saveQuietly();
    	if ($isNewUser) {
    		$metrics->record(Metrics::USER_REGISTERED, [], $user);
    	}
    	$metrics->record(Metrics::USER_LOGIN, ['first_login' => $isNewUser], $user);

    	return redirect('/app');
    }
    
    
    public function logout(Request $request, Metrics $metrics)
    {
    	if (Auth::check()) {
    		$metrics->record(Metrics::USER_LOGOUT);
    	}
    	Auth::logout();
    	return redirect('/');
    }
    
}
