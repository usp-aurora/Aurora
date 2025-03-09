<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Enums\RoleId;
use App\Enums\RoleName;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class LoginController extends Controller
{

    // $userSenhaUnica = Socialite::driver('senhaunica')->user();
    // $user = User::where('codpes', $userSenhaUnica->codpes)->first();
    // if (is_null($user)) {
    //     $user = new User;
    //     $user->codpes = $userSenhaUnica->codpes;
    //     $user->email = $userSenhaUnica->email;
    //     $user->name = $userSenhaUnica->nompes;
    //     $user->current_role_id = RoleId::STUDENT;
    //     $user->save();
    // }
    // Auth::login($user, true);
    // return redirect()->route('list');

    public function callbackHandler()
    {
        $userSenhaUnica = Socialite::driver('senhaunica')->user();

        $user = User::where(['codpes' => $userSenhaUnica->codpes])->first();
        if(is_null($user)){
            $user = new User;
            $user->codpes = $userSenhaUnica->codpes;
            $user->email = $userSenhaUnica->emailUsp ?? $userSenhaUnica->emailAlternativo ?? 'invalido' . $userSenhaUnica->codpes . '@usp.br';
            $user->name = $userSenhaUnica->nompes;
            $user->current_role_id = RoleId::STUDENT;
            $user->save();

            $user->assignRole(RoleId::STUDENT);
        }

        Auth::login($user, true);

        if ($user->hasRole(RoleName::ADMIN)) {
            return redirect()->route('admin.dashboard');
        } elseif ($user->hasRole(RoleName::PROFESSOR)) {
            return redirect()->route('professor.dashboard');
        } elseif ($user->hasRole(RoleName::STUDENT)) {
            return redirect()->route('student.dashboard');
        }

        // Redirecionar fallback
        return redirect('/')->with('error', 'User role not recognized');
    }
}
/*namespace App\Http\Controllers;

use App\Models\User;
use App\Enums\RoleId;
use App\Enums\RoleName;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GlobalController extends Controller
{
    public function callbackHandler()
    {
        $userSenhaUnica = Socialite::driver('senhaunica')->user();

        $user = null;
        $reason = null;
        $rolesInfo = [
            [RoleName::ADMIN, RoleId::ADMIN],
            [RoleName::PROFESSOR, RoleId::PROFESSOR],
            [RoleName::STUDENT, RoleId::STUDENT]
        ];

        if (config('senhaunica.onlyLocalUsers')) {
            $user = User::newLocalUser($userSenhaUnica->codpes);
            if (!$user) {
                $reason = 'noLocalUser';
                session()->invalidate();
                session()->regenerateToken();
                return redirect('/login')->with('reason', $reason);
            }
        } else {
            $user = User::firstOrNew(['codpes' => $userSenhaUnica->codpes]);

            $user->codpes = $userSenhaUnica->codpes;
            $user->email = $userSenhaUnica->emailUsp ?? 
                           $userSenhaUnica->emailAlternativo ?? 
                           'invalido' . $userSenhaUnica->codpes . '@usp.br';
            $user->name = $userSenhaUnica->nompes;
            $user->save();
        }

        foreach ($rolesInfo as $roleInfo) {
            if ($user->hasRole($roleInfo[0])) {
                $user->current_role_id = $roleInfo[1];
                $user->save();
                \Auth::login($user, true);

		switch ($user->current_role_id) {
		    case RoleId::ADMIN:
			return redirect()->route('admin.dashboard');
		    case RoleId::PROFESSOR:
			return redirect()->route('professor.dashboard');
		    case RoleId::STUDENT:
			return redirect()->route('student.dashboard');
		    default:
			return redirect('/'); // Segurança para evitar miss
}
            }
        }
    }
}*/
