import Link from "next/link";
import Nav from "./nav";
import Image from "next/image";

export default function Header() {
    return (
        <header className="!bg-[#0C111D] shadow w-full z-[2000]">
            <div className="max-w-[90%] mx-auto py-5 flex items-center justify-between">
                <div
                    className="w-42 h-16 relative">
                    <Link href={"/"}>
                        <Image
                            src="/images/logo1.webp"
                            alt="Ayinla Logo"
                            title="Ayinla Logo"
                            layout="fill"
                        />
                    </Link>
                </div>
                <Nav />
                <div className="flex gap-x-3">
                    <Link href={"/sign-in"} scroll={false} className="py-3 px-6 bg-[#23396A] hover:bg-[#23396A] text-[#fff] rounded-none font-medium border border-solid border-[#23396A]">
                        Sign In
                    </Link>
                    <Link href={"/sign-up"} scroll={false} className="py-3 px-6 bg-[#fff] hover:bg-[#fff] text-[#23396A] rounded-none font-medium border border-solid border-[#23396A]">
                        Sign Up
                    </Link>
                </div>
            </div>
        </header>
    );
}