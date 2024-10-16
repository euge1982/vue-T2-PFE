//Archivo de configuracion del store

import { defineStore } from 'pinia';   //Libreria para trabajar con el store
import type { User } from '../models/UserModel.js';   //Se importa el modelo User

//Se crea  y se exporta el store
export const useStore = defineStore('user', {
  //Se crea el state
  state: () => ({   
    user: {} as User,
    users: [] as User[],
  }),
  //Se crean las acciones
  actions: {   
    //Funcion para setear el usuario
    setUser(newUser: User) {
      this.user = newUser;
    },
    setUsers(newUsers: User[]) {
      this.users = newUsers;
      localStorage.setItem('vue-3-jwt-refresh-token-users', JSON.stringify(newUsers));
    },
    loadUsersFromLocalStorage() {
      const userFromStorage = JSON.parse(localStorage.getItem('vue-3-jwt-refresh-token-users') || '[]');
      this.setUsers(userFromStorage);
    }
  },
});