<template>
  <div class="navbar bg-base-100/80 fixed z-10" style="backdrop-filter: blur(.75rem);">
    <div class="flex max-w-7xl w-full mx-auto">
      <div class="flex-1">
        <NuxtLink to="/" class="btn btn-ghost text-xl font-minecraft font-bold text-stone-400">FancyMC</NuxtLink>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li><a>Đóng góp</a></li>
          <li v-if="!auth">
            <details>
              <summary>Tài khoản</summary>
              <ul class="bg-base-100 rounded-t-none p-2 w-36 -translate-x-10" @click="(e: any) => e.target.closest('details').open = false">
                <li><NuxtLink to="/auth/login">Đăng nhập</NuxtLink></li>
                <li><a>Đăng ký</a></li>
              </ul>
            </details>
          </li>

          <li v-if="auth">
            <details>
              <summary>Hi, {{ auth.realname }}</summary>
              <ul class="bg-base-100 rounded-t-none p-2 w-36 -translate-x-10" @click="(e: any) => e.target.closest('details').open = false">
                <li class="text-error" @click="signOut({ redirect: false })"><a>Đăng xuất</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="h-16 bg-gradient-to-b from-base-100 to-black" />


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
const { data: auth, signOut } = useAuth()
</script>