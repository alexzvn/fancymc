<template>
  <div class="min-h-screen bg-gradient-to-b from-black to-base-100 relative overflow-hidden">

    <div v-for="star in 200" class="star"></div>

    <div class="container mx-auto pt-24 px-5">

      <div class="card bg-base-200/90 backdrop-blur-sm max-w-5xl mx-auto shadow-2xl">
        <div class="grid md:grid-cols-2 relative">

          <div class="px-5 py-10">
            <h1 class="block text-center mt-10 font-mono text-3xl font-bold">
              Đăng nhập <span class="font-minecraft text-white">FancyMC</span>
            </h1>
          
            <form class="mt-6" @submit.prevent="login">
              <div class="form-control">
                <label class="label">Username</label>
                <input v-model="form.username" @focus="form.error = ''" type="text" class="input input-bordered font-mono" placeholder="Tên đăng nhập" required>
                <label v-if="form.error" class="label text-error">{{ form.error }}</label>
              </div>

              <div class="form-control">
                <label class="label">Password</label>
                <input v-model="form.password" type="password" class="input input-bordered font-mono" placeholder="Mật khẩu của bạn" required>
              </div>

              <div class="text-center">
                <Button class="mt-10" type="submit">
                  <span class="mx-7 flex">
                    <span class="mt-0.5">Đăng nhập</span>
                    <span v-if="loading" class="mt-1 ml-2 scale-125">
                      <Icon class="size-5 animate-spin" name="pixelarticons:loader" />
                    </span>
                  </span>
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
import Button from '~/components/primitive/Button.vue'

definePageMeta({ layout: 'auth' })

const form = reactive({ username: '', password: '', error: '' })
const { query } = useRoute()
const { signIn, auth } = useAuth()
const loading = ref(false)
const redirect = computed(() => [query.redirect].flat().at(0) ?? '/')

const login = async () => {
  if (loading.value === true) {
    return
  }

  loading.value = true

  return signIn(form)
    .then(() => { navigateTo(redirect.value) })
    .catch(e => form.error = e.data.message)
    .finally(() => loading.value = false)
}

onBeforeMount(() => {
  if (auth.value) {
    navigateTo(redirect.value)
  }
})
</script>

<style lang="scss">
.star {
  position: absolute;
  background-color: white;
}

@function random_number($min, $max) {
  $random: random($min) + $max - $min;
  @return $random;
}

@mixin hashed-animation($name, $min-duration, $max-duration) {
  $duration: random_number($min-duration, $max-duration) + s;
  animation: $name #{$duration} linear infinite;
}


@for $i from 1 through 200 {
  .star:nth-of-type(#{$i}) {
    $num: ($i % 3) + 1;

    top: random(101) - 1 + vh;
    left: random(101) - 1 + vw;
    width: random(2) + px;
    height: random(2) + px;
    opacity: calc(random(50) / 100 + 0.5);
    @include hashed-animation(animStar#{$num}, 20, 60);
  }
}

@keyframes animStar1 {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(100vh);
  }
}

@keyframes animStar2 {
  0% {
    transform: translateY(-100vh) translateX(-10vw);
  }
  50% {
    transform: translateY();
  }
  100% {
    transform: translateY(100vh) translateX(10vw);
  }
}

@keyframes animStar3 {
  0% {
    transform: translateY(-100vh) translateX(10vw);
  }
  50% {
    transform: translateY();
  }
  100% {
    transform: translateY(200vh) translateX(-10vw);
  }
}
</style>

