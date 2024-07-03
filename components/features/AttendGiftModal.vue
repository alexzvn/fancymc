<template>
  <Teleport to="body">
    <dialog ref="modal":id="id" class="modal">
      <div class="modal-box bg-base-100/80 backdrop-blur">
        <form method="dialog">
          <button class="btn btn-sm btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <h3 class="text-lg font-bold">Nhận quà hằng ngày</h3>

        <div v-if="status.isLoading" class="grid place-content-center my-5">
          <p>Xin đợi trong giây lát...</p>
        </div>

        <div v-if="status.isReady" class="grid place-content-center mt-5">
          <div v-if="status.state.available">
            <Button v-if="!vote.state" @click="vote.execute()">
              <span class="mx-3 flex">
                <span class="mt-0.5">Nhận quà ngay</span>
                <span v-if="vote.isLoading" class="mt-1 ml-2 scale-125">
                  <Icon class="size-5 animate-spin" name="pixelarticons:loader" />
                </span>
              </span>
            </Button>

            <div v-if="vote.state?.success" role="alert" class="alert alert-success">
              <Icon name="pixelarticons:calendar-check" class="size-6" />
              <span>Đã nhận được quà tặng hôm nay</span>
            </div>
          </div>

          <div v-if="!status.state.available" role="alert" class="alert alert-warning">
            <Icon name="pixelarticons:info-box" class="size-6" />
            <div>
              <h3 class="font-bold">Bạn đã nhận quà hôm nay rồi.</h3>
              <div class="text-xs">Xin hãy chờ lượt tiếp theo trong {{ dayjs.duration(status.state.duration, 's').humanize() }}.</div>
            </div>
          </div>
        </div>

      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </Teleport>
</template>

<script lang="ts" setup>
import { useAsyncState } from '@vueuse/core'
import dayjs from 'dayjs'
import Button from '../primitive/Button.vue'

const id = useId()
const modal = ref() as Ref<HTMLDialogElement>
const prefetch = ref(false)

const status = reactive(
  useAsyncState(() => useRequest('/api/me/vote'), { available: false, duration: 0 }, { immediate: false })
)

const vote = reactive(
  useAsyncState(() => useRequest('/api/me/vote', { method: 'POST' }), undefined, { immediate: false })
)

const open = async () => {
  !prefetch.value && status.execute()
  modal.value.showModal()

  prefetch.value = true
}

defineExpose({ open })
</script>