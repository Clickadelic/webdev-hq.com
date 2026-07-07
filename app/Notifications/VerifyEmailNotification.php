<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;

class VerifyEmailNotification extends VerifyEmail
{
    /**
     * Build the mail representation of the notification.
     * Uses the shared emails.verify-email Markdown template so both
     * web (Fortify) and API registrations send an identical e-mail.
     */
    protected function buildMailMessage($url): MailMessage
    {
        return (new MailMessage)
            ->subject(__('Verify your e-mail address — :app', ['app' => config('app.name')]))
            ->markdown('emails.verify-email', [
                'url'  => $url,
                'name' => $this->notifiable->name,
            ]);
    }
}
