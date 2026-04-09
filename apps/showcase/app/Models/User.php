<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'azure_id',
        'azure_token',
        'azure_refresh_token',
        'avatar',
        'entra_groups',
        'entra_roles',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'azure_token',
        'azure_refresh_token',
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
            'entra_groups'      => 'array',
            'entra_roles'       => 'array',
        ];
    }

    /**
     * Check whether the user carries a given Entra app role.
     */
    public function hasRole(string $role): bool
    {
        return in_array($role, $this->entra_roles ?? [], true);
    }

    /**
     * Check whether the user is a member of a given Entra group.
     */
    public function inGroup(string $group): bool
    {
        return in_array($group, $this->entra_groups ?? [], true);
    }
}
