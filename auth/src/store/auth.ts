import { create } from "zustand"

type UserCred = {
    email: string,
    password: string
}

export const UserCredentialStore = create<UserCred>((set) => ({
    email: '',
    password: '',
    setCredentials: (email:string, password: string) => set({ email, password })
}))
