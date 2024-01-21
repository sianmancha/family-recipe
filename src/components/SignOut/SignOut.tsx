import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

export function SignOutButton() {
    const router = useRouter();

   const handleSignOut = async () => {
        await signOut({redirect: false}); 
        router.push('/login')
    };

    return (
        <button onClick={handleSignOut}>Sign Out</button>
    )
}