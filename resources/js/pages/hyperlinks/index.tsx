// Hyperlinks.tsx
import { index } from "@/actions/App/Http/Controllers/HyperlinkController";
import AppLayout from '@/layouts/app-layout';
import HyperlinkForm from '@/components/forms/hyperlink-form';
import { type BreadcrumbItem } from '@/types';

// Definiere den Typ für ein Hyperlink-Item (basierend auf deinem Model)
interface Hyperlink {
    id: number;
    title: string;
    url: string;
    description: string | null;
    status: string;
}

interface Props {
    hyperlinks: Hyperlink[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Hyperlinks',
        href: index.url(),
    },
];

export default function Hyperlinks({ hyperlinks }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-8 p-4">
                
                {/* Sektion 1: Das Formular (oben oder in der Sidebar) */}
                <div className="max-w-2xl">
                    <h2 className="text-xl font-bold mb-4">Neuen Link hinzufügen</h2>
                    <HyperlinkForm className="border bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-sm" />
                </div>

                <hr className="border-sidebar-border" />

                {/* Sektion 2: Die Liste der Items */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Deine Ressourcen</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {hyperlinks.length > 0 ? (
                            hyperlinks.map((link) => (
                                <div 
                                    key={link.id} 
                                    className="group relative flex flex-col gap-2 rounded-xl border border-sidebar-border bg-white p-4 shadow-sm transition-all hover:shadow-md dark:bg-neutral-900"
                                >
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold text-lg leading-tight">{link.title}</h3>
                                        <span className={`text-[10px] uppercase px-2 py-1 rounded-full font-bold ${
                                            link.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {link.status}
                                        </span>
                                    </div>
                                    
                                    <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                                        {link.description || "Keine Beschreibung vorhanden."}
                                    </p>

                                    <a 
                                        href={link.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-500 hover:underline truncate mt-2"
                                    >
                                        {link.url}
                                    </a>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted-foreground italic">Noch keine Hyperlinks gespeichert.</p>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}