<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;
    use \Spatie\Permission\Traits\HasRoles;

    public static $permissoesHierarquia = [
        'admin', // Exemplo de permissões hierárquicas
        'manager',
        'user',
    ];


    public static $permissoesVinculo = [
        'Admin',
        'Usuario',
        'Gerente',
        // Adicione outros vínculos conforme necessário
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
     
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the user subjects added
     */
    public function userSubjectsAdded(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(UserAddedSubjects::class);
    }
}
