import type { User } from '@/models/UserModel';
import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers/fetchWrapper';

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useAuthStore = defineStore ({
    id: 'auth',
    state: () => ({
        auth: {} as { loading: boolean, data?: User | null, refreshTokenTimeout: number | null }
    }),
    actions: {
        async login(username: string, password: string) {
            this.auth.data= await fetchWrapper.post (`${ baseUrl}/authenticate`, { username, password }, { credentials : 'include'});
        },
        logout() {
            fetchWrapper.post (`${ baseUrl}/revoke-token`, {}, { credentials : 'include'});
        },
        startTefreshTokenTimer() {
            if (!this.auth.data || !this.auth.data.jwtToken) return;
             
            //Parsear un objeto JSON de base 64
            
            
        }
    }
})