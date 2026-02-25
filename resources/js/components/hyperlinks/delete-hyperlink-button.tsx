import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Hyperlink } from '@/types';
import { toast } from "sonner"

import { destroy } from "@/actions/App/Http/Controllers/HyperlinkController";
import { router } from '@inertiajs/react';

// Todo: clarify
interface DeleteHyperlinkButtonProps {
    id: number;
}

// Todo: clarify type inheritance
export default function DeleteHyperlinkButton({ id }: DeleteHyperlinkButtonProps) {
    function handleDestroy({ id }: DeleteHyperlinkButtonProps) {
        if (confirm("Are you sure you want to delete this item?")) {
            router.delete(destroy.url(id));
            toast.success("Hyperlink deleted successfully.");
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Hyperlink</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this hyperlink? This action cannot be
                        undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="destructive">Delete</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}