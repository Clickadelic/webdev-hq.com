<?php

namespace App\Enums;

enum AppStatus: string
{
    case Draft = 'draft';
    case Published = 'published';
    case Archived = 'archived';
}