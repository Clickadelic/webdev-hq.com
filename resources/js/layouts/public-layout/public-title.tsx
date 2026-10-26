export default function PublicTitle({ title }: { title?: string | null }) {
    return <h2 className="mb-8 flex gap-3 text-xl font-medium">{title}</h2>;
}
