<script setup lang="ts">
import LoginTab from './LoginTab.vue';
import { http, endpoint } from '@/utils';
import { useRouter } from 'vue-router';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { toast } from '@/components/ui/toast';

import type { FormType, LoginType, LoginData } from '@/types/user';

const router = useRouter();

const loginInputs: FormType[] = [
  {
    name: 'email',
    label: '信箱',
    type: 'email',
    placeholder: '請輸入信箱'
  },
  {
    name: 'password',
    label: '密碼',
    type: 'password',
    placeholder: '請輸入密碼'
  }
];

const login = async (user: LoginType) => {
  try {
    const data: LoginData = await http.post(endpoint.users.signin, user);
    const { token, exp, nickname } = data;
    document.cookie = `hexToken=${token};expires=${new Date(exp * 1000)}`;
    localStorage.setItem('nickname', nickname);
    router.replace({ name: 'todosapi' });
  } catch (err) {
    console.error(err);
    toast({
      title: '登入失敗'
    });
  }
};

const formSchema = toTypedSchema(
  z.object({
    email: z.string({ required_error: '信箱必填' }).email('信箱格式不正確'),
    password: z.string({ required_error: '密碼必填' })
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema
});

const handleLogin = handleSubmit((values) => {
  login(values);
});
</script>

<template>
  <div class="container flex justify-center">
    <LoginTab default-value="login" :inputs="loginInputs" @onSubmit="handleLogin" />
  </div>
</template>
