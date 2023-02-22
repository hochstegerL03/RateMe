<script setup>
import { ref, onMounted } from 'vue';
import { Notify } from 'quasar';
let update = ref(false);
let isOnline = ref();

onMounted(async () => {
  const onlineTest = async () => {
    try {
      await fetch(window.location.origin, { method: 'HEAD' });
      return true;
    } catch (error) {
      return false;
    }
  };

  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) {
    console.log('registration failed');
    return;
  }
  registration.addEventListener('updatefound', updateNotify);
  if (registration.waiting) update.value = true;

  isOnline.value = await onlineTest();

  window.addEventListener('online', () => (isOnline.value = true));
  window.addEventListener('offline', notify);
});
const reloadclick = async () => {
  const registration = await navigator.serviceWorker.getRegistration();
  if (registration) registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
  window.location.reload();
};

function notify() {
  isOnline.value = false;
  Notify.create({
    message: 'You are Offline',
    color: 'negative',
    position: 'top',
    actions: [
      {
        label: 'Dismiss',
        color: 'white',
        handler: () => {
          /* ... */
        },
      },
    ],
  });
}

function updateNotify() {
  update.value = true;
  Notify.create({
    message: 'An Update is available!',
    color: 'negative',
    position: 'top',
    timeout: 0,
    actions: [
      {
        label: 'Update',
        color: 'white',
        handler: reloadclick,
      },
    ],
  });
}
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container class="h-100">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
q-layout {
  background-color: $primary !important;
}
.h-100 {
  height: 100vh;
}
</style>
