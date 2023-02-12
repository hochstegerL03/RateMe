<script setup></script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar class="q-my-md">
        <q-toolbar-title class="flex items-center">
          <q-avatar>
            <i class="fa-solid fa-angle-left"></i>
          </q-avatar>
          <div class="">Home</div>
        </q-toolbar-title>
        <div class="text-h4 q-mx-lg"><i class="fa-solid fa-ellipsis"></i></div>
      </q-toolbar>
    </q-header>

    <q-page-container>
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
</style>
