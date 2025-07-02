<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;
    use \Spatie\Permission\Traits\HasRoles;

    /**
     * @var string[]
     */
    public static $permissoesHierarquia = [
        'admin', // Exemplo de permissões hierárquicas
        'manager',
        'user',
    ];

    /**
     * @var string[]
     */
    public static $permissoesVinculo = [
        'Admin',
        'Usuario',
        'Gerente',
        // Adicione outros vínculos conforme necessário
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
     
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
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
    public function userSubjectsAdded(): HasMany
    {
        return $this->hasMany(UserAddedSubject::class);
    }
}
