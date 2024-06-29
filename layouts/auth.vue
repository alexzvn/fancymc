<template>
  <div ref="navbar" class="navbar transition duration-500 fixed z-10" :class="navbarClass" style="backdrop-filter: blur(.75rem);">
    <div class="flex max-w-7xl w-full mx-auto">
      <div class="flex-1">
        <NuxtLink to="/" class="btn btn-ghost text-xl font-minecraft font-bold text-stone-400">FancyMC</NuxtLink>
      </div>
      
      <NavbarContent />
    </div>
  </div>

  <div class="h-16 bg-gradient-to-b from-base-100 to-black" />


  <NuxtPage />

  <Footer />
</template>

<script lang="ts" setup>
import Footer from '~/components/layout/Footer.vue'
import NavbarContent from '~/components/layout/NavbarContent.vue'
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()

useHead({ meta: [{ name:'theme-color', content: '#000000' }] })

const navbarClass = computed(() => {
  return y.value < 50 ? 'bg-black' : 'bg-base-100/80'
})
</script>