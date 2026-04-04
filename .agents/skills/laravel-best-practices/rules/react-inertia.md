# React & Inertia.js Best Practices

## Pass Data via Inertia::render()

Controllers should pass data to React page components using `Inertia::render()`.

Incorrect:
```php
return view('posts.show', ['post' => $post]);
```

Correct:
```php
use Inertia\Inertia;

return Inertia::render('posts/show', [
    'post' => $post,
]);
```

## Type Props with TypeScript Interfaces

Define typed props for every page component. Use the shared `types/` directory for reusable interfaces.

```tsx
interface Props {
    post: App.Data.PostData;
    canEdit: boolean;
}

export default function Show({ post, canEdit }: Props) {
    // ...
}
```

## Shared Data via HandleInertiaRequests

Use the `HandleInertiaRequests` middleware to share data globally (e.g., auth user, flash messages). Access it via `usePage()`.

```tsx
import { usePage } from '@inertiajs/react';

const { auth } = usePage().props;
```

## Type-Safe Routing with Wayfinder

Use Wayfinder-generated route helpers instead of hardcoded URLs. Run `npm run wayfinder` after adding/changing routes.

Incorrect:
```tsx
router.visit('/posts/1');
```

Correct:
```tsx
import { show } from '@/wayfinder/App/Http/Controllers/PostController';

router.visit(show({ post: 1 }));
```

## ShadCN/UI Components

Use ShadCN/UI components built on Radix UI primitives. Follow existing component patterns in `resources/js/components/ui/`. Do not install additional UI libraries when ShadCN already provides the component.

## Forms with react-hook-form + Zod

Use `react-hook-form` with Zod schemas for client-side validation. Use Inertia's `useForm` or `router` for form submission to the backend.

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
    title: z.string().min(1),
    body: z.string().min(10),
});

type FormData = z.infer<typeof schema>;

const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
});
```

## Client-Side State with Zustand

Use Zustand for client-side state that does not come from the server. Keep server state in Inertia props, not in Zustand stores.

## Page Component File Organization

Page components live in `resources/js/pages/` mirroring the route structure. Reusable components go in `resources/js/components/`. Layout components go in `resources/js/layouts/`.

## Avoid Blade Templates

This project uses Inertia.js with React — do not create Blade views for pages. The only Blade file should be `app.blade.php` (the Inertia root template).
