//Archivo de configuracion del store

import { defineStore } from 'pinia';   //Libreria para trabajar con el store
import type { User } from '../models/UserModel.ts';   //Se importa el modelo User

//Se crea  y se exporta el store
export const useStore = defineStore('main', {
  //Se crea el state
  state: () => ({   
    user: {} as User,   //Se crea el objeto user y se inicializa como un objeto vacío
  }),
  //Se crean las acciones
  actions: {   
    //Funcion para setear el usuario
    setUser(newUser: User) {
      this.user = newUser;
    },
  },
});