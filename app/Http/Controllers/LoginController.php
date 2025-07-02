<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
#use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Laravel\Socialite\Contracts\User as SocialiteUser;

class LoginController extends Controller
{
    #use AuthenticatesUsers;
    protected string $redirectTO = '/';


/*    public function __construct()
    {
    	$this ->middleware('guest');
    }
*/

    public function redirectToProvider(): RedirectResponse
    {
    	return Socialite::driver('senhaunica')->redirect();
    }


    public function handleProviderCallback(): RedirectResponse
    {
    	/** @var SocialiteUser $userSenhaUnica */
    	$userSenhaUnica = Socialite::driver('senhaunica')->user();
    	
    	// Note: These properties (codpes, nompes) are custom properties from the senhaunica provider
    	// They may not be available in the standard SocialiteUser interface
    	/** @var int $codpes */
    	$codpes = (int) ($userSenhaUnica->codpes ?? 0);
    	/** @var string $email */
    	$email = $userSenhaUnica->email ?? '';
    	/** @var string $nompes */
    	$nompes = $userSenhaUnica->nompes ?? '';
    	
    	$user = User::where('codpes', $codpes)->first();

    	if (is_null($user))
    	{
    		$user = new User;
    		#$user->id = $userSenhaUnica->codpes;
    		$user->codpes = $codpes;
    		$user->email = $email;
    		$user->name = $nompes;
    		$user->save();
    	} 
    	Auth::login($user, true);
    	return redirect('/app');
    }
    
    
    public function logout(Request $request): RedirectResponse
    {
    	Auth::logout();
    	return redirect('/');
    }
    
}
