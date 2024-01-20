import React from "react";
import {LoginForm} from "@/components/LoginForm";
import { CreateAccountModal } from "@/components/CreateAccount/CreateAccountModal";

export default function Login() {
    return(
        <div>
            Login Page
            <LoginForm />
            <CreateAccountModal />
        </div>
    )
}