import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

export default function PreviewModal({ preview }: { preview: string }) {
    return (
        <Dialog>
            <DialogTrigger asChild className="shadow rounded-md">
                <button className="cursor-pointer absolute text-white text-xl right-4 top-3 z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 100 100">
                        <rect x="5" y="5" width="40" height="40" rx="10" fill="#000" />
                        <rect x="55" y="5" width="40" height="40" rx="10" fill="#000" />
                        <rect x="5" y="55" width="40" height="40" rx="10" fill="#000" />
                        <rect x="55" y="55" width="40" height="40" rx="10" fill="#000" />
                    </svg>
                </button>
            </DialogTrigger>
            <DialogContent className="grid place-content-center bg-transparent outline-none border-none z-[1100]">
                <div className="relative w-[425px] h-[425px]">
                    <Image
                        src={preview}
                        alt="Preview"
                        className="size-full object-cover select-none"
                        fill
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
