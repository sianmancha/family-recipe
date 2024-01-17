import React, { useState } from "react";
import { CreateAccountForm } from "../CreateAccountForm";

export function CreateAccountModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }
    
    return (
        <div>
            <button onClick={openModal}>Create Account</button>
            {isModalOpen ? <CreateAccountForm onClose={closeModal}/> : null}
        </div>
    )
}