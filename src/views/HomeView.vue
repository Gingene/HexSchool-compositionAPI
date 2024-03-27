<script setup lang="ts">
import { Button } from '@/components/ui/button';
</script>

<template>
  <section class="container">
    <main>
      <h2 class="mb-6 lg:mb-10">六角composition API作業回報區</h2>
      <ul>
        <li>
          <h3 class="text-center mb-4">第一周</h3>
          <RouterLink to="/todos" class="block w-full text-center">
            <Button class="w-full"> TodoList </Button>
          </RouterLink>
        </li>
      </ul>
    </main>
  </section>
</template>
