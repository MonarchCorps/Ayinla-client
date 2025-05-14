import { Button } from "@/components/ui/button";
import Link from "next/link";
import "./globals.css"

export default function NotFound() {
    return (
        <section className="h-screen min-h-[30rem]">
            <div className="h-full grid place-content-center text-center">
                <div className="shadow-dance-container">
                    <h1 className="shadow-dance-text">400 Response</h1>
                </div>
                <h2 className="text-2xl mt-2 italic">Ooops!</h2>
                <h1 className="text-3xl/relaxed font-500 mb-2">The page you requested is not available!</h1>
                <div>
                    <Button
                        type="button"
                        asChild
                        className="w-fit cursor-pointer"
                    >
                        <Link href={"/"}>
                            Go Home
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}