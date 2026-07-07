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
     *
     * Override toMail() (not buildMailMessage) so we have access to $notifiable.
     */
    public function toMail($notifiable): MailMessage
    {
        $url = $this->verificationUrl($notifiable);

        return (new MailMessage)
            ->subject(__('Verify your e-mail address — :app', ['app' => config('app.name')]))
            ->markdown('emails.verify-email', [
                'url'  => $url,
                'name' => $notifiable->name,
            ]);
    }
}
