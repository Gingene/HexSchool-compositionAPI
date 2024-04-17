<script setup lang="ts">
import HeaderNav from '@/layout/HeaderNav.vue';
import Toaster from '@/components/ui/toast/Toaster.vue';
</script>

<template>
  <HeaderNav />

  <RouterView />

  <Toaster />
</template>

<style lang="scss">
body {
  @apply bg-gradient-to-br from-primary h-screen;
}
</style>
