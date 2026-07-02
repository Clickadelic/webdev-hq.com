'use client';

import { Hyperlink } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Hyperlink>[] = [
    {
        id: 'title',
        title: 'Dings',
    },
];
