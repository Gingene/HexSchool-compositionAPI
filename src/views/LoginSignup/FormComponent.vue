<script setup lang="ts">
import { vAutoAnimate } from '@formkit/auto-animate/vue';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { FormType } from '@/types/user';

defineProps<{
  inputs: FormType[];
}>();

const emit = defineEmits<{
  (e: string, values: Event): void;
}>();

const onSubmit = (values: Event) => {
  emit('onSubmit', values);
};
</script>

<template>
  <form class="space-y-6" @submit="onSubmit">
    <template v-for="input in inputs" :key="input.name">
      <FormField v-slot="{ componentField }" :name="input.name">
        <FormItem v-auto-animate>
          <FormLabel>{{ input.label }}</FormLabel>
          <FormControl>
            <Input
              :type="input.type"
              :placeholder="input.placeholder"
              v-bind="componentField"
              autocomplete="on"
            />
          </FormControl>
          <FormDescription> {{ input.name }} </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
    </template>

    <Button type="submit"> Submit </Button>
  </form>
</template>
