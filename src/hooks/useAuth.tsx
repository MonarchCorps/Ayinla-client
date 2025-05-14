"use client";

import type { AuthContextType } from "@/types/Auth";

import AuthContext from "@/context/AuthContext";
import { useContext } from "react";

function useAuth() {
    return useContext<AuthContextType>(AuthContext);
}

export default useAuth;
