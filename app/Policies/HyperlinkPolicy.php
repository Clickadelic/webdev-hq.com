<?php

namespace App\Policies;

use App\Models\Hyperlink;
use App\Models\User;

class HyperlinkPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Hyperlink $hyperlink): bool
    {
        if ($hyperlink->team_id === null) {
            return $hyperlink->created_by === $user->id;
        }

        return $user->teams()->whereKey($hyperlink->team_id)->exists();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Hyperlink $hyperlink): bool
    {
        return $this->view($user, $hyperlink);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Hyperlink $hyperlink): bool
    {
        return $this->view($user, $hyperlink);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Hyperlink $hyperlink): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Hyperlink $hyperlink): bool
    {
        return false;
    }
}
