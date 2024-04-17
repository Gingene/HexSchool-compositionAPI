import { defineStore } from 'pinia';
import { ref } from 'vue';
import { http, endpoint } from '@/utils';
import type { CheckLoginData } from '@/types/user';
import { useRouter } from 'vue-router';

export const useUserStore = defineStore('user', () => {
  const token = ref<string>('');
  const nickname = ref<string>('');
  const router = useRouter();

  const getToken = () => {
    const hexToken = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*)|^.*$/, '$1');
    if (hexToken) {
      token.value = hexToken;
    }
    nickname.value = localStorage.getItem('nickname') ?? '';
  };

  const checkLogin = async () => {
    try {
      const res: CheckLoginData = await http.get(endpoint.users.checkout);
      console.log(res);
      getToken();
    } catch (error) {
      console.log(error);
      localStorage.removeItem('nickname');
      router.push('/login');
    }
  };

  return { token, nickname, getToken, checkLogin };
});
