import SignInForm from "./sign-in-form";

export default function SignIn() {
    return (
        <div className="grid grid-cols-2 h-screen min-h-[30rem]">
            <SignInForm wrapperStyle="px-30" />
            <div className="size-full relative">
                <img className="size-full object-cover" src={"/images/explore-opt.webp"} alt="" />
                <img src={"/images/line-1.webp"} className="absolute right-0 top-0 object-cover w-60" alt="Line" />
                <img src={"/images/line-2.webp"} className="absolute bottom-0 left-0 object-cover w-80" alt="Line" />
            </div>
        </div>
    );
}