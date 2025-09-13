import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', () => {
  const isOpenModal = ref(false);

  const email = ref('');
  const password = ref('');
  const token = ref('');
  const isAuthenticated = ref(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  function getTokenFromCookie() {
    return (
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('auth_token='))
        ?.split('=')[1] || ''
    );
  }

  async function signIn({ email: inputEmail, password: inputPassword }) {
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: inputEmail || email.value,
          password: inputPassword || password.value,
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Wrong email or password');
      }

      const data = await response.json();
      document.cookie = `auth_token=${data.token}; max-age=3600; Secure; SameSite=Strict`;
      isAuthenticated.value = true;
      return data;
    } catch (error) {
      console.error('Wrong login:', error);
      throw error;
    }
  }

  async function checkAuth() {
    const cookieToken = getTokenFromCookie();
    console.log(cookieToken);
    if (!cookieToken) {
      isAuthenticated.value = false;
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/check-auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: cookieToken,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Auth fail');
      }

      const data = await response.json();
      isAuthenticated.value = data.authenticated;
    } catch (error) {
      console.error('Auth error:', error);
      isAuthenticated.value = false;
      document.cookie = 'auth_token=; max-age=0; path=/';
    }
  }

  return {
    isOpenModal,
    email,
    password,
    token,
    signIn,
    isAuthenticated,
    checkAuth,
  };
});
