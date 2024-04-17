<script setup lang="ts">
import LoginTab from './LoginTab.vue';
import { http, endpoint } from '@/utils';
import { useRouter } from 'vue-router';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { toast } from '@/components/ui/toast';

import type { FormType, SignUpType, SignupData } from '@/types/user';
const router = useRouter();

const signupInputs: FormType[] = [
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
  },
  {
    name: 'nickname',
    label: '暱稱',
    type: 'text',
    placeholder: '請輸入暱稱'
  }
];

const signup = async (user: SignUpType) => {
  try {
    const res: SignupData = await http.post<any, SignupData>(endpoint.users.signup, user);
    toast({
      title: res.message
    });
    router.replace({ name: 'login' });
  } catch (err: any) {
    console.error(err);
    if (err.response) {
      toast({
        title: err.response.data.message
      });
    } else {
      toast({
        title: '註冊失敗了...'
      });
    }
  }
};

const formSchema = toTypedSchema(
  z.object({
    email: z.string({ required_error: '信箱必填' }).email('信箱格式不正確'),
    password: z.string({ required_error: '密碼必填' }).min(6, { message: '至少輸入6碼' }),
    nickname: z.string({ required_error: '暱稱必填' }).min(3, { message: '暱稱至少3個字' })
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema
});

const handleSignup = handleSubmit((values) => {
  signup(values);
});
</script>

<template>
  <div class="container flex justify-center">
    <LoginTab default-value="signup" :inputs="signupInputs" @onSubmit="handleSignup" />
  </div>
</template>
