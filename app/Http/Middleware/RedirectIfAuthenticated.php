<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if (Auth::guard($guard)->check()) {
            $user = Auth::user();
            
            
            if ($user->hasRole(RoleName::ADMIN)) {
                return redirect()->route('admin.dashboard');
            } elseif ($user->hasRole(RoleName::PROFESSOR)) {
                return redirect()->route('professor.dashboard');
            } elseif ($user->hasRole(RoleName::STUDENT)) {
                return redirect()->route('student.dashboard');
            }
        }

        return $next($request);
    }
}
