// stores/auth.ts
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '' as string | null,
  }),
  actions: {
    setToken(newToken: string) {
      this.token = newToken;
      localStorage.setItem('token', newToken);
    },
    logout() {
      this.token = null;
      localStorage.removeItem('token');
    },
    loadTokenFromStorage() {
      const storedToken = localStorage.getItem('token');
      if (storedToken) this.token = storedToken;
    }
  }
});
