<script setup></script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container class="h-100">
      <router-view />
    </q-page-container>

    <q-footer class="bg-white">
      <q-toolbar>
        <q-toolbar-title> </q-toolbar-title>
      </q-toolbar>
    </q-footer>
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
