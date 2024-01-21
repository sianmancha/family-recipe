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
        <nav>
            {session ? (
                <div>
                    <SignOutButton />
                </div>
            ): (
                <div>
                    {isLandingPage && (
                        <>
                        <Link href='/login'>Login</Link>
                        <CreateAccountModal />
                        </>
                    )}
                    {isLoginPage && (
                        <Link href='/'>Home</Link>
                    )}
                </div>
            )}
        </nav>
    )
}