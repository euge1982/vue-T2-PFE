//Interfaz del User
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    remember?: boolean;
    isAdmin: boolean;
    jwtToken?: string;
    refreshToken: string[]
}