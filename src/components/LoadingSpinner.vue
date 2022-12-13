<template>
  <div class="loading">
    <div class="loading__inner">
      <div class="loading__content">
        <span class="spinner"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.loading {
  width: 100%;
  height: 230px;
  position: relative;
  z-index: 999;
}

.loading__inner {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: absolute;
}

.loading__content {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}

.spinner {
  width: 50px;
  height: 50px;
  display: inline-block;
  border-width: 3px;
  border-color: #ebebeb;
  border-top-color: #212121;
  animation: spin 1s infinite linear;
  border-radius: 100%;
  border-style: solid;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
