import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="!bg-[#0C111D] py-10">
            <div className="max-w-[90%] mx-auto">
                <div className="grid grid-cols-5 justify-between gap-10 lg:text-left">
                    <div className="flex w-full flex-col gap-6 col-span-2">
                        <div className="flex items-center gap-2 lg:justify-start">
                            <div
                                className="w-42 h-16 relative">
                                <Link href={"/"}>
                                    <Image
                                        src="/images/logo1.webp"
                                        alt="Ayinla Logo"
                                        title="Ayinla Logo"
                                        fill
                                    />
                                </Link>
                            </div>
                        </div>
                        <p className="text-white/70 text-sm leading-[1.7]">
                            Explore unique spaces that enhance your creativity—cozy homes, vibrant studios, and stunning outdoor settings. We simplify finding the perfect location for your projects.
                        </p>
                        <ul className="flex items-center space-x-6">

                            <li className="font-medium duration-200 hover:scale-110 hover:text-muted-foreground">

                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-2 font-semibold text-white">
                            Main Pages
                        </h3>
                        <ul className="space-y-4 text-sm text-white/60">
                            <li className="font-medium hover:text-white hover:opacity-100">
                                {/* <ScrollLink toId="home"> */}
                                Home
                                {/* </ScrollLink> */}
                            </li>
                            <li className="font-medium hover:text-white hover:opacity-100">
                                {/* <ScrollLink toId="contact"> */}
                                Contact
                                {/* </ScrollLink> */}
                            </li>
                            <li className="font-medium hover:text-white hover:opacity-100">
                                <Link href={"/about"}>
                                    About Us
                                </Link>
                            </li>
                            <li className="font-medium hover:text-white hover:opacity-100">
                                <Link href={"/how-it-works"}>
                                    How it works
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-2 font-semibold text-white">
                            Other Pages
                        </h3>
                        <ul className="space-y-4 text-sm text-white/60">
                            <li className="font-medium hover:text-white hover:opacity-100">
                                <Link href={"/properties"}>
                                    Properties
                                </Link>
                            </li>
                            <li className="font-medium hover:text-white hover:opacity-100">
                                <Link href={"/agents"}>
                                    Agents
                                </Link>
                            </li>
                            <li className="font-medium hover:text-white hover:opacity-100">
                                <Link href={"/blogs"}>
                                    Blogs
                                </Link>
                            </li>

                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-2 font-semibold text-white">
                            Follow Us
                        </h3>
                        <ul className="space-y-4 text-sm text-white/60">
                            <li className="font-medium hover:text-white hover:opacity-100">
                                <a>
                                    Instagram
                                </a>
                            </li>
                            <li className="font-medium hover:text-white hover:opacity-100">
                                <a>
                                    Linkedin
                                </a>
                            </li>
                            <li className="font-medium hover:text-white hover:opacity-100">
                                <a>
                                    Facebook
                                </a>
                            </li>
                            <li className="font-medium hover:text-white hover:opacity-100">
                                <a>
                                    Twitter
                                </a>
                            </li>

                        </ul>
                    </div>

                </div>
            </div>
        </footer>
    );
}