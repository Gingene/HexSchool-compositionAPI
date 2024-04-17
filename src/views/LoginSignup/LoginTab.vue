<script setup lang="ts">
import FormComponent from './FormComponent.vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'vue-router';
import type { FormType } from '@/types/user';

const router = useRouter();

defineProps<{
  inputs: FormType[];
  defaultValue: 'login' | 'signup';
}>();

const emit = defineEmits<{
  (e: string, values: Event): void;
}>();

const onSubmit = (values: Event) => {
  emit('onSubmit', values);
};
</script>

<template>
  <Tabs :default-value="defaultValue" class="w-1/2">
    <div class="flex justify-center">
      <TabsList class="w-full">
        <TabsTrigger value="login" class="w-1/2" @click="router.push({ name: 'login' })">
          登入
        </TabsTrigger>
        <TabsTrigger value="signup" class="w-1/2" @click="router.push({ name: 'signup' })">
          註冊
        </TabsTrigger>
      </TabsList>
    </div>
    <TabsContent value="login">
      <FormComponent :inputs="inputs" @onSubmit="onSubmit" />
    </TabsContent>
    <TabsContent value="signup">
      <FormComponent :inputs="inputs" @onSubmit="onSubmit" />
    </TabsContent>
  </Tabs>
</template>
