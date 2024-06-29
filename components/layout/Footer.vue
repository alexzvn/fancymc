<template>
  <footer class="footer bg-base-100 text-neutral-content p-5">
    <div class="container mx-auto flex justify-between px-5">
      <div class="flex space-x-5">
        <img :src="status.icon" />
        <p class="leading-6 mt-2">
          <strong>Play.FancyMC.net</strong>
          <br />
          Server Minecraft Việt Nam
        </p>
      </div>

      <a href="https://alexzvn.me" target="_blank" class="mt-8 opacity-60 hover:opacity-90 transition duration-150">@alexzvn</a>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const status = useServerStatus()
</script>