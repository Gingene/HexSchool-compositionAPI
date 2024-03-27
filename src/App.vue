<script setup lang="ts">
import HeaderNav from '@/components/layout/HeaderNav.vue';
</script>

<template>
  <HeaderNav />

  <RouterView />
</template>

<style lang="scss">
body {
  @apply bg-gradient-to-br from-primary h-screen;
}
</style>
