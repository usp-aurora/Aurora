<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;   

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;
    use \Uspdev\SenhaunicaSocialite\Traits\HasSenhaunica;
    
    protected $fillable = [
        'name',
        'email',
        'password',
        'current_role_id',
        'codpes'
    ];

    // Hidden attributes
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Casts
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    public function currentRole() {
        return $this->belongsTo(Role::class, 'current_role_id');
    }


    public function roles(){
	return $this->belongsToMany(Role::class);
    }
	
    public function hasRole($roleName){
         return $this->roles()->where('name', $roleName)->exists();
    }
}
