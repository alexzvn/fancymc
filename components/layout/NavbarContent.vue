<template>
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
</template>

<script lang="ts" setup>
const { data: auth, signOut } = useAuth()
</script>