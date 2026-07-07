@component('mail::message')
# Verify your e-mail address

Hi **{{ $name }}**,

thank you for registering with **{{ config('app.name') }}**.

Please confirm your e-mail address by clicking the button below.
The link will expire in **60 minutes**.

@component('mail::button', ['url' => $url, 'color' => 'primary'])
Confirm e-mail address
@endcomponent

If you did not create an account, no further action is required.

Thanks,<br>
{{ config('app.name') }}

---
<small>If the button does not work, copy this link into your browser:<br>{{ $url }}</small>
@endcomponent
