import React, {ReactNode} from "react";
import { NavBar } from "../NavBar";

interface Props {
    children: ReactNode;
}

export function Layout ({children}: Props) {
    return (
        <div>
            <NavBar />
            {children}
        </div>
    )
}