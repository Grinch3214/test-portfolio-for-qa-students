import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useGlobalStore = defineStore('global', () => {
  const isOpenModal = ref(false);

  const email = ref('');
  const password = ref('');
  const token = ref('');
  const isAuthenticated = ref(false);
  const currentUserId = ref(null);

  const posts = ref([]);

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
      const response = await axios.post(
        `${apiUrl}/login`,
        {
          email: inputEmail || email.value,
          password: inputPassword || password.value,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      const data = response.data;
      document.cookie = `auth_token=${data.token}; max-age=3600; path=/; Secure; SameSite=Strict`;
      // document.cookie = `auth_token=${data.token}; max-age=3600; Secure; SameSite=Strict`;
      isAuthenticated.value = true;
      currentUserId.value = data.id;
      return data;
    } catch (error) {
      console.error('Wrong login:', error.response?.data || error.message);
      throw new Error('Wrong email or password');
    }
  }

  function logout() {
    document.cookie = 'auth_token=; max-age=0; path=/; Secure; SameSite=Strict';

    isAuthenticated.value = false;
    currentUserId.value = null;

    console.log('User logged out successfully');
  }

  async function checkAuth() {
    const cookieToken = getTokenFromCookie();

    if (!cookieToken) {
      isAuthenticated.value = false;
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/check-auth`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            token: cookieToken,
          },
          withCredentials: true,
        }
      );

      const data = response.data;
      isAuthenticated.value = data.authenticated;
      currentUserId.value = data.user.id;
    } catch (error) {
      console.error('Auth error:', error.response?.data || error.message);
      isAuthenticated.value = false;
      document.cookie =
        'auth_token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    }
  }

  async function getAllPosts() {
    const url = `${apiUrl}/posts`;
    try {
      const response = await axios.get(url);
      posts.value = response.data;
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

  async function getSinglePost(id) {
    try {
      const response = await axios.get(`${apiUrl}/posts/${id}`);
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  async function createNewPost(body) {
    const url = `${apiUrl}/posts`;
    try {
      const response = await axios.post(url, body);
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  async function incrementPostView(id) {
    const url = `${apiUrl}/posts/${id}/views`;

    try {
      const response = await axios.patch(url);
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  async function deletePost(id) {
    const url = `${apiUrl}/posts/${id}`;
    const cookieToken = getTokenFromCookie();

    console.log('Token:', cookieToken);

    try {
      const response = await axios.delete(url, {
        headers: {
          'Content-Type': 'application/json',
          token: cookieToken,
        },
        withCredentials: true,
      });

      if (response.data) {
        const deletedId = response.data.deletedPost.id;
        console.log(deletedId);
        posts.value = posts.value.filter((post) => post.id !== deletedId);
        return response.data;
      }
    } catch (err) {
      console.error(err);
    }
  }

  return {
    isOpenModal,
    isAuthenticated,
    email,
    password,
    token,
    posts,
    currentUserId,

    signIn,
    logout,
    checkAuth,
    getAllPosts,
    getSinglePost,
    createNewPost,
    incrementPostView,
    deletePost,
  };
});
