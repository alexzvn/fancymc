<template>
  <div class="navbar bg-base-100/90 fixed z-10" style="backdrop-filter: blur(.25rem);">
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

  <div class="h-16"></div>


  <div class="bg-[url('/media/img/wallpaper.png')] bg-center bg-no-repeat py-32 md:py-40">
    <div class="card bg-base-200/90 max-w-3xl mx-auto border-t-2 border-zinc-600" style="backdrop-filter: blur(.25rem);">
      <NuxtImg class="absolute -top-32 left-20 md:-left-24 max-w-60" src="/media/img/axolotlmount.png" />

      <div class="card-body">
        <h1 v-if="status" class="justify-center text-center" v-html="status.motd.html"></h1>
        <h1 v-else class="card-title justify-center">Server Minecraft Việt Nam FancyMC</h1>

        <div class="grid md:grid-cols-2">
          <div class="form-control mt-5 font-mono">
            <label class="label">Chơi ngay tại</label>

            <div class="flex">
              <div class="avatar" :class="status.online ? 'online' : 'offline'">
                <div class="w-12 rounded">
                  <img :src="status.icon" />
                </div>
              </div>

              <label class="input input-bordered font-mono flex ml-1">
                <input class="grow" type="text" value="play.fancymc.net" readonly />
                
                <UseClipboard v-slot="{ copy, copied }">
                  <div class="py-2 text-3xl cursor-pointer" @click="copy('play.fancymc.net')">
                    <Icon v-if="!copied" name="pixelarticons:copy" />
                    <Icon v-else name="pixelarticons:check" class="text-success" />
                  </div>
                </UseClipboard>

              </label>
            </div>

            <label v-if="status.online" class="label text-sm">
              <span class="text-success">Server đang online với <small class="text-warning">{{ status.players.online }}</small> người chơi</span>
            </label>
            <label v-else class="label text-error text-sm">Server đang được bảo trì ...</label>

          </div>
        </div>


      </div>
    </div>
  </div>


  <div class="min-h-screen bg-black/70 py-20">
    <div class="container max-w-7xl mx-auto px-5 lg:px-0">
      <div class="grid lg:grid-cols-2 gap-5 md:gap-10">
        <NuxtImg src="/media/img/atlanta-banner.png" />

        <div>
          <h3 class="text-2xl font-bold mt-5">
            Chế độ chơi <span class="font-minecraft bg-slate-800 px-2 py-1">Atlanta Underwater</span>
          </h3>

          <p class="mt-5 leading-loose font-mono">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit numquam maxime aliquid id officiis officia distinctio, iste, quia, aspernatur reiciendis dolore. Saepe exercitationem labore quae corporis doloribus, expedita voluptate eos?</p>
        
          <Button class="mt-5 group">
           <span class="flex">
              Khám phá ngay
              <Icon name="pixelarticons:chevron-right" class="transition size-6 group-hover:translate-x-2" />
            </span>
          </Button>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import Button from '~/components/primitives/Button.vue'
import { useServerStatus } from '~/composables/useServerStatus'
import { UseClipboard } from '@vueuse/components'

const status = await useServerStatus()

useSeoMeta({
  ogLocale: 'vi_VN',
  ogImage: '/media/img/atlanta-banner.png',
  ogSiteName: 'FancyMC',
})

</script>