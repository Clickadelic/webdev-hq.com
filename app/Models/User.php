<?php

namespace App\Models;

use App\Notifications\VerifyEmailNotification;
use Database\Factories\UserFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
	/** @use HasFactory<UserFactory> */
	use HasApiTokens, HasFactory, HasRoles, HasUuids, Notifiable, TwoFactorAuthenticatable;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var list<string>
	 */
	protected $fillable = [
		'name',
		'email',
		'password',
		'profile_image_path',
	];

	/**
	 * The attributes that should be hidden for serialization.
	 *
	 * @var list<string>
	 */
	protected $hidden = [
		'password',
		'two_factor_secret',
		'two_factor_recovery_codes',
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
			'two_factor_confirmed_at' => 'datetime',
		];
	}

	public function teams(): BelongsToMany
	{
		return $this->belongsToMany(Team::class)->withTimestamps();
	}

	/**
	 * Determine whether the user holds the platform-wide "admin" role, regardless of team scope.
	 */
	public function isPlatformAdmin(): bool
	{
		return $this->hasRoleNamedForAnyTeam('admin');
	}

	/**
	 * Determine whether the user can manage the given team (settings, members).
	 * Team deletion is intentionally excluded; see canDeleteTeam().
	 */
	public function canManageTeam(Team $team): bool
	{
		return $this->is($team->owner)
			|| $this->isPlatformAdmin()
			|| $this->hasRoleNamedForTeam($team, ['admin', 'team-admin']);
	}

	/**
	 * Determine whether the user can delete the given team.
	 */
	public function canDeleteTeam(Team $team): bool
	{
		return $this->is($team->owner) || $this->isPlatformAdmin();
	}

	/**
	 * Determine whether the user has any of the given role names assigned for a specific team,
	 * bypassing the ambient Spatie "current team" context.
	 *
	 * @param  array<int, string>|string  $roles
	 */
	private function hasRoleNamedForTeam(Team $team, array|string $roles): bool
	{
		return $this->rolePivotQuery()
			->where('model_roles.' . $this->teamForeignKey(), $team->id)
			->whereIn('roles.name', (array) $roles)
			->exists();
	}

	/**
	 * Determine whether the user has the given role name assigned for any team.
	 */
	private function hasRoleNamedForAnyTeam(string $role): bool
	{
		return $this->rolePivotQuery()
			->where('roles.name', $role)
			->exists();
	}

	private function rolePivotQuery(): \Illuminate\Database\Query\Builder
	{
		$tableNames = config('permission.table_names');
		$columnNames = config('permission.column_names');
		$rolePivotKey = $columnNames['role_pivot_key'] ?? 'role_id';
		$modelMorphKey = $columnNames['model_morph_key'] ?? 'model_id';

		return DB::table($tableNames['model_has_roles'] . ' as model_roles')
			->join($tableNames['roles'] . ' as roles', 'roles.id', '=', "model_roles.{$rolePivotKey}")
			->where('model_roles.' . $modelMorphKey, $this->getKey())
			->where('model_roles.model_type', $this->getMorphClass())
			->where('roles.guard_name', config('auth.defaults.guard'));
	}

	private function teamForeignKey(): string
	{
		return config('permission.column_names.team_foreign_key') ?? 'team_id';
	}

	/**
	 * Send the email verification notification.
	 * Overrides the default so both web (Fortify) and API registrations
	 * use the same shared template.
	 */
	public function sendEmailVerificationNotification(): void
	{
		$this->notify(new VerifyEmailNotification);
	}
}
