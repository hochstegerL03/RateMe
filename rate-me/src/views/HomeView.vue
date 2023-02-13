<script setup>
import { ref } from 'vue';
</script>

<template>
  <div class="h-100">
    <div class="flex justify-center items-center h-20">
      <div>
        <div class="text-h3 text-center">Rate Me!</div>
        <div>
          <figcaption class="text-center text-weight-light text-italic q-mt-xs q-mb-lg">
            Snap, Rate and go! Make your life a rating game
          </figcaption>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center stats-overview">
      <div class="stats q-pa-xl flex items-center">
        <div @click="$router.push('/overview')" class="text-h4 text-weight-bold">Start</div>
      </div>
    </div>
    <div class="flex items-center stats-container text-white justify-center">
      <div class="row w-80 q-my-lg text-h5 text-weight-bold">
        <div class="col-6 q-my-md">Today:</div>
        <div class="col-6 q-my-md text-italic text-h5">0</div>
        <div class="col-6 q-my-md">Week:</div>
        <div class="col-6 q-my-md text-italic text-h5">0</div>
        <div class="col-6 q-my-md">Total:</div>
        <div class="col-6 q-my-md text-italic text-h5">0</div>
        <div class="col-12 text-center q-mt-lg">
          <q-btn size="lg" push color="primary" class="leave absolute-bottom q-mb-xl text-center"
            >Leave</q-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stats {
  border-radius: 100%;
  background-color: $primary;
  color: white;
  aspect-ratio: 1 / 1;
}

.stats-overview {
  height: 40%;
}
.h-20 {
  height: 20%;
}
.h-100 {
  height: 100%;
}
.w-80 {
  width: 80%;
}
.stats-container {
  background-color: $primary;
  height: 40%;
}
.leave {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}
</style>
