<template>
  <button class="mc-btn transition-all font-sans font-bold uppercase active:scale-95">
    <div class="block h-1.5 btn-top"></div>
    <div class="px-3 py-2 btn-content">
      <slot />
    </div>

    <div class="block h-1.5 btn-bottom"></div>
  </button>
</template>

<style lang="scss" class="scoped">

.mc-btn {
  color: #262423;

  .btn-top {
    background: #ede5e2;
  }

  .btn-content {
    background: #d0c5c0;
  }

  .btn-content:hover {
    background: #d9d1cd;
  }

  .btn-bottom {
    background: #aba09c;
  }

  .btn-bottom:hover {
    background: #aba09c;
  }
}

.primary {
  color: white;

  .btn-top {
    background: #52a535;
  }

  .btn-content {
    background: #3c8527;
  }

  .btn-content:hover {
    background: #367723;
  }

  .btn-bottom {
    background: #2a641c;
  }

  .btn-bottom:hover {
    background: #2a641c;
  }
}


</style>