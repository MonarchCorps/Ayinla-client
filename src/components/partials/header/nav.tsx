"use client"

import Link from "next/link"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { LinkType } from "@/types/Link"
import clsx from "clsx"

const propertiesLinks: LinkType[] = [
    { href: "/listing", text: "Listing" },
    { href: "/listing/all", text: "All Listings" },
    { href: "/listing/own", text: "My Listings" },
    { href: "/listing/history", text: "Listing history" },
]

const bookingsLinks: LinkType[] = [
    { href: "/booking", text: "Booking" },
    { href: "/booking/history", text: "Booking History" }
]

export default function NavigationMenuDemo() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href="/" className={clsx(navigationMenuTriggerStyle(), "bg-transparent text-white font-semibold text-[0.9rem] hover:bg-transparent hover:text-white")}>
                        Home
                    </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent text-white font-semibold text-[0.9rem] hover:bg-transparent hover:text-white cursor-pointer">Property Listing</NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white/5">
                        <ul className="px-0 py-1 w-[400px] grid grid-cols-2 gap-x-4">
                            {propertiesLinks.map((link, index: number) => (
                                <Link key={index} scroll={false} className="w-full" href={link.href}>
                                    <li className={clsx("px-2 py-2 hover:!bg-[#e7f0fd] hover:!text-[#000] text-[0.88rem] font-medium border-b border-solid border-grey-700 mb-2")}
                                    >
                                        {link.text}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent text-white font-semibold text-[0.9rem] hover:bg-transparent hover:text-white cursor-pointer">Booking</NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white/5">
                        <ul className="px-0 py-1 w-[400px] grid grid-cols-1 gap-x-4">
                            {bookingsLinks.map((link, index: number) => (
                                <Link key={index} scroll={false} className="w-full" href={link.href}>
                                    <li className={clsx("px-2 py-1 hover:!bg-[#e7f0fd] hover:!text-[#000] text-[0.88rem] font-medium border-b border-solid border-grey-700 mb-2")}
                                    >
                                        {link.text}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <Link href="/about" scroll={false} className={clsx(navigationMenuTriggerStyle(), "bg-transparent text-white font-semibold text-[0.9rem] hover:bg-transparent hover:text-white")}>
                        About Us
                    </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <Link href="/faq" scroll={false} className={clsx(navigationMenuTriggerStyle(), "bg-transparent text-white font-semibold text-[0.9rem] hover:bg-transparent hover:text-white")}>
                        FAQ&apos;S
                    </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <Link href="/contact" scroll={false} className={clsx(navigationMenuTriggerStyle(), "bg-transparent text-white font-semibold text-[0.9rem] hover:bg-transparent hover:text-white")}>
                        Contact
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}