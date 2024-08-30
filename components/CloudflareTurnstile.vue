<template>
  <div>
    <div ref="container" :id="id" data-retry="auto" data-refresh-expired="auto"/>
    <input v-model="token" name="turnstile" type="hidden" >
  </div>
</template>

<script lang="ts">
type TurnstileRenderOptions = {
  sitekey: string,
  action?: string,
  callback: (token: string) => unknown
}

type Turnstile = {
  ready: (callback: () => unknown) => unknown
  render: (selector: string, options: TurnstileRenderOptions) => unknown
  remove: () => unknown
}
</script>

<script lang="ts" setup>
const { turnstileSiteKey } = useRuntimeConfig().public
const id = ref(useId())
const token = ref('')
const container = ref<HTMLDivElement>()

const obtain = async (action?: string) => {
  if (action && !/^[a-zA-Z_-]{1,32}$/.test(action)) {
    throw new Error('Action can only contain up to 32 alphanumeric characters including _ and -.')
  }

  const { turnstile } = window as any as { turnstile: Turnstile }

  await new Promise<void>(ok => turnstile.ready(() => ok()))

  const _token = await new Promise<string>(callback => {
    turnstile.render(`#${id.value}`, {
      sitekey: turnstileSiteKey, callback, action
    })
  })

  turnstile.remove()

  return token.value = _token
}

defineExpose({ obtain })
</script>