<template>
  <div class="navbar bg-base-100/80 fixed z-10" style="backdrop-filter: blur(.75rem);">
    <div class="flex container mx-auto">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl font-minecraft font-bold text-stone-400">FancyMC</a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li><a>Đóng góp</a></li>
          <li>
            <details>
              <summary>Tài khoản</summary>
              <ul class="bg-base-100 rounded-t-none p-2 w-36">
                <li><a>Đăng nhập</a></li>
                <li><a>Đăng ký</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="h-16" />


  <NuxtPage />

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