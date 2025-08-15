'use client'

import { AlignJustify } from "lucide-react"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet"
import Link from "next/link"
import {  UserButton } from "@clerk/nextjs"


function Header({user}) {

    const menuItems = [
        {
            label: 'Home',
            path: '/',
            show: true
        },
        {
            label: 'Login',
            path: '/sign-in',
            show: !user
        },
        {
            label: 'Register',
            path: '/sign-up',
            show: !user
        },
        {
            label: 'Jobs',
            path: '/jobs',
            show: user
        },
        {
            label: 'Activity',
            path: '/activity',
            show: user
        },
        {
            label: 'Membership',
            path: '/membership',
            show: user
        },
        {
            label: 'Account',
            path: '/account',
            show: user
        },
    ]

    return <div>
        <header className="flex h-16 w-full shrink-0 items-center">
            <Sheet>
                <SheetTrigger asChild>
                    <Button className="lg:hidden bg-violet-700  hover:bg-violet-800">
                        <AlignJustify className="h-6 w-6" />
                        <span className="sr-only">Toggle Navigation Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <Link className="text-violet-700 hover:text-indigo-800 mr-6 hidden lg:flex" href={'#'}>
                        <h3>JOBSCO</h3>
                    </Link>


                    <div className="grid gap-2 py-6">
                        {menuItems.map((menuItem) =>
                            menuItem.show ? (
                                <Link
                                    key={menuItem.path}
                                    href={menuItem.path}
                                    className="flex w-full items-center py-2 text-lg font-semibold text-violet-700 hover:text-black "
                                >
                                    {menuItem.label}
                                </Link>
                            ) : null
                        )}
                        <UserButton/>
                    </div>

                </SheetContent>
            </Sheet>
            <Link className="text-violet-700 font-bold text-2xl hidden lg:flex mr-6" href={'/'}>JOBSCO</Link>
            <nav className="ml-auto hidden lg:flex gap-6">
                {
                    menuItems.map((menuItem) => menuItem.show ?
                        <Link key={menuItem.path} href={menuItem.path} className="group inline-flex h-9 w-max items-center rounded-md bg-white px-4 py-2 text-sm font-medium  text-violet-700 hover:text-black">
                            {menuItem.label}
                        </Link> : null)
                }
              <UserButton />
            </nav>
        </header>
    </div>
}

export default Header   