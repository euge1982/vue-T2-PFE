//Archivo de configuracion del store

import { defineStore } from 'pinia';   //Libreria para trabajar con el store
import type { Sesion } from '@/models/Sesion';   //Se importa el modelo Sesion
import type { SesionState } from '@/models/SesionState';
import { useAuthStore } from './authStore';

//Se crea  y se exporta el store
export const useSesionStore = defineStore('sesion', {
  //Se crea el state
  state: (): SesionState => ({   
    loading: false,
    data: null
  }),
  //Se crean las acciones
  actions: {   
    update( newSesion: Sesion ) {
        this.data = newSesion;
    },
    async refreshSesion() {
        const authStore = useAuthStore();
        const jwtBase64 = authStore.auth.data?.jwtToken?.split('.')[1];

        if(!jwtBase64) return;
               
        const decodedToken = JSON.parse(atob(jwtBase64));
        const creationTime = new Date((decodedToken.exp - 120) * 1000);
        const expirationTime = new Date(decodedToken.exp * 1000);
        const refreshTime = new Date(decodedToken.exp * 1000 - (60 * 1000));

        const sesionData: Sesion = {
            tokenPayload: jwtBase64,
            creationDate: creationTime,
            expirationDate: expirationTime,
            refreshDate: refreshTime
        };

        this.update(sesionData);
    },
  },  
});