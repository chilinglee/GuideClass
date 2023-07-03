import { defineStore } from 'pinia';
export const useUserStore = defineStore('user', () => {
  const user = ref({});
  const fetchUser = async () => {
    const { data } = await useFetch('/api/auth/checkAuth', {
      method: 'get',
    });
    user.value = { ...data.value };
  };

  const logout = () => {
    user.value = {};
  };
  return { user, fetchUser, logout };
});
