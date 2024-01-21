import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { CreateAccountModal } from "../CreateAccount/CreateAccountModal";
import { SignOutButton } from "../SignOut";

export function NavBar() {
    const {data: session} = useSession();
    const router = useRouter();

    const isLoginPage = router.pathname === '/login';
    const isLandingPage = router.pathname === '/';

    return (
        <nav className="flex justify-end items-center bg-[#D4AC97] h-20 p-10 mb-10">
            {session ? (
                <div>
                    <SignOutButton />
                </div>
            ): (
                <div>
                    {isLandingPage && (
                        <div className="flex gap-3">
                        <Link href='/login'>Login</Link>
                        <CreateAccountModal />
                        </div>
                    )}
                    {isLoginPage && (
                        <Link href='/'>Home</Link>
                    )}
                </div>
            )}
        </nav>
    )
}