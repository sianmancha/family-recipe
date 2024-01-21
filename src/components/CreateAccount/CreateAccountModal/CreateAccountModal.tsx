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
            {isModalOpen ? (
                <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-full sm:w-2/3 max-w-screen-md mx-4">
                            <div className="flex flex-col border-0 rounded-lg shadow-lg relative w-full bg-[#F9F6EE]">
                                <div className="flex items-center justify-between p-5 border-b-2 border-solid border-[#D4AC97] rounded-t">
                                    <h3 className="flex items-center text-3xl font-semibold text-[#772604]">
                                        Create an Account
                                    </h3>
                                    <button className="flex items-center p-1 border-0 font-semibold outline-none focus:outline-none text-2xl text-[#772604]" onClick={closeModal}>
                                   
                                        x
                                    
                                    </button>
                                </div>
                                <div className="relative p-6">
                                    <CreateAccountForm onClose={closeModal} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                ) : null
            }
        </div>
    )
}