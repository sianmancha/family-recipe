import React from "react"
import { CreateAccountModal } from "@/components/CreateAccount/CreateAccountModal"
import Link from "next/link";

export default function Home() {
  return (
    <div>
      Home
      <CreateAccountModal />
      <Link href='/login'>Sign In</Link>
    </div>
  )
}
