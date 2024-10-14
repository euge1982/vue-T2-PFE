import type { User } from '@/models/UserModel';
import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers/fetchWrapper';
import router from '@/router';

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useAuthStore = defineStore ({
    id: 'auth',
    state: () => ({
        auth: {} as { 
            loading: boolean, 
            data?: User | null, /***************************/
            refreshTokenTimeout: number | null }/****************** */
    }),
    actions: {
        async login(userName: string, password: string) {
            this.auth.data = await fetchWrapper.post (`${ baseUrl}/authenticate`, { userName, password }, { credentials : 'include'});
            this.startRefreshTokenTimer();
        },
        logout() {
            fetchWrapper.post (`${ baseUrl}/revoke-token`, {}, { credentials : 'include'});
            this.stopRefreshTokenTimer();
            this.auth.data = null;
            router.push({ name : 'login' });
        },
        async refreshToken() {
            this.auth.data = await fetchWrapper.post (`${ baseUrl}/refresh-token`, {}, { credentials : 'include'});
            this.startRefreshTokenTimer(); /************************** */
        },
        startRefreshTokenTimer() {
            if (!this.auth.data || !this.auth.data.jwtToken) return;
             
            //Parsear un objeto JSON de base 64
            const jwtBase64 = this.auth.data.jwtToken.split(".")[1];
            const decodedJwtToken = JSON.parse(atob(jwtBase64));   ///SAqQUE EL WINDOWS. DE ADELANTE DEL ATOB

            //Crear un TimeOut, para refrescar el token antes de que expire
            const expires = new Date(decodedJwtToken.exp * 1000);
            const timeout = expires.getTime() - Date.now() - (60 * 1000);

            this.auth.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);          
        },
        stopRefreshTokenTimer() {
            if (this.auth.refreshTokenTimeout) {
                clearTimeout(this.auth.refreshTokenTimeout);
                this.auth.refreshTokenTimeout = null;
            }
        }
    }
})