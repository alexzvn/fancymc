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
            <li><a @click="gift.open()">Nhận quà</a></li>
            <li class="text-error" @click="signOut()"><a>Đăng xuất</a></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>

  <ClientOnly>
    <AttendGiftModal ref="gift" />
  </ClientOnly>
</template>

<script lang="ts" setup>
import AttendGiftModal from '~/components/features/AttendGiftModal.vue'

const { auth, signOut } = useAuth()

const gift = ref() as Ref<InstanceType<typeof AttendGiftModal>>
</script>