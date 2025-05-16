import Image from "next/image";
import SignInForm from "./sign-in-form";

export default function SignIn() {
    return (
        <div className="grid grid-cols-2 h-screen min-h-[30rem] overflow-hidden">
            <SignInForm wrapperStyle="px-30" />
            <div className="size-full relative">
                <div className="relative size-full">
                    <Image
                        className="object-cover"
                        src={"/images/explore-opt.webp"}
                        alt="Signin background"
                        fill
                        priority={true}
                    />
                </div>
                <div className="absolute right-0 top-0 size-60">
                    <Image
                        src={"/images/line-1.webp"}
                        className="object-cover"
                        alt="Line"
                        fill
                        priority={true}
                    />
                </div>
                <div className="absolute bottom-0 left-0 w-80 h-40">
                    <Image
                        src={"/images/line-2.webp"}
                        className="object-cover bg-no-repeat"
                        alt="Line"
                        fill
                        priority={true}
                    />
                </div>
            </div>
        </div>
    );
}