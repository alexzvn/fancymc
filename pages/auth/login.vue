<template>
  <div class="min-h-screen bg-gradient-to-b from-black to-base-100">
    <div class="container mx-auto pt-24 px-5">

      <div class="card bg-base-200/90 backdrop-blur-sm max-w-5xl mx-auto shadow-2xl">
        <div class="grid md:grid-cols-2 relative">

          <div class="px-5 py-10">
            <h1 class="block text-center mt-10 font-mono text-3xl font-bold">
              Đăng nhập <span class="font-minecraft text-white">FancyMC</span>
            </h1>
          
            <form class="mt-6" @click.prevent>
              <div class="form-control">
                <label class="label">Username</label>
                <input v-model="form.username" @focus="form.error = ''" type="text" class="input input-bordered font-mono" placeholder="Tên đăng nhập">
                <label v-if="form.error" class="label text-error">{{ form.error }}</label>
              </div>

              <div class="form-control">
                <label class="label">Password</label>
                <input v-model="form.password" type="password" class="input input-bordered font-mono" placeholder="Mật khẩu của bạn">
              </div>

              <div class="text-center">
                <Button class="mt-10" @click="login">
                  <span class="mx-10">Đăng nhập</span>
                </Button>
              </div>
            </form>
          </div>

          <NuxtImg class="hidden md:block min-h-[60vh] h-full object-cover" src="/media/img/wallpaper-3.png" />
        
        </div>
      </div>

      <div class="max-w-sm mx-auto">

        <NuxtImg class="md:hidden object-cover mt-14" src="/media/img/Alexzvn.gif" />
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from '~/components/primitives/Button.vue'

const form = reactive({ username: '', password: '', error: '' })

const { signIn, data: auth } = useAuth()

const login = async () => {
  return signIn(form, { redirect: false })
    .then(() => { navigateTo('/') })
    .catch(e => form.error = e.data.message)
}
</script>