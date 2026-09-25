export default function PublicTitle({ title }: { title: string }) {
    return <h2 className="text-2xl font-medium text-rose-300">{title}</h2>;
}

export function PublicDescription({ description }: { description: string }) {
    return <p>{description}</p>;
}
