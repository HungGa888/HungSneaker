<template>
  <HeaderLayout/>
  <main class="flex-grow-1">
    <RouterView />
  </main>
  <FooterLayout />
</template>

<script setup>
import HeaderLayout from './Layout/HeaderLayout.vue'
import FooterLayout from './Layout/FooterLayout.vue'
import { RouterView } from 'vue-router'
</script>
