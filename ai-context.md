# AI Context

## Project Overview

Project name: WebDev HQ
Purpose: A toolbox and social network for web-developers with news, resources, tools and practical things

Main features:

* App CRUD
* Hyperlink CRUD
* Categories
* Authenticated users

---

# Tech Stack

Backend:

* Laravel 12
* PHP 8+

Frontend:

* Inertia.js
* React
* Vite

Styling:

* TailwindCSS
* ShadCN

HTTP Client:

* Axios

---

# Architecture Rules

General:

* Business logic should live in Services when controllers become large.
* Use Laravel FormRequest classes for validation.
* Prefer composition over inheritance.

Frontend:

* React components should stay small and reusable.
* Use functional components and hooks.
* State should remain local unless shared across multiple components.

API / Requests:

* Axios is used for async requests.
* Use Inertia navigation where possible instead of manual routing.

---

# Folder Structure

Important directories:

app/
Models/
Http/Controllers/
Http/Requests/

resources/js/
Components/
Pages/
Layouts/

routes/
web.php
api.php

---

# Coding Conventions

PHP:

* Follow PSR-12
* Prefer typed properties and return types.

React:

* Prefer arrow functions
* Use descriptive component names
* use hyphens to seperate component names

CSS:

* Tailwind utilities first
* Avoid custom CSS when possible

---

# Existing Modules

Comments System:

* Supports nested replies
* Uses pagination
* Components:

  * CommentsDirectory
  * CommentItem

Authentication:

* Laravel authentication
* Protected routes via middleware

---

# Known Constraints

* Some comment queries can become heavy with large datasets.
* Pagination must remain server-side.

---

# AI Instructions

When suggesting code changes:

1. Do not rewrite large files if a small change is possible.
2. Prefer Laravel-native solutions over external packages.
3. Maintain existing architecture unless a clear improvement exists.
4. Avoid unnecessary abstractions.

If something is unclear, ask before restructuring code.
