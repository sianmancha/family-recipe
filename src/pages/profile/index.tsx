import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SignOutButton } from '@/components/SignOut';

export default function Profile() {
    const [isLoading, setIsLoading] = useState(true);
    const {data: session} = useSession();
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const currentSession = await getSession();
            if(!currentSession || !currentSession.user) {
                router.push('./login')
            } else {
                setIsLoading(false);
            }
        };

        if(!session?.user){
           checkSession();
        } else {
            setIsLoading(false);
        };

    }, [session, router])

    const userName = session?.user?.name

    return (
        <div>
            <SignOutButton />
            <h1>Welcome, {userName}!</h1>
        </div>
    )
}