<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Product App
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
// import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';

// const linksList: EssentialLinkProps[] = [
//   {
//     title: 'Register',
//     caption: 'Create Account',
//     icon: 'person_add',
//     link: '/register'
//   },
//   {
//     title: 'Login',
//     caption: 'Sign In',
//     icon: 'login',
//     link: '/login'
//   },
//   {
//     title: 'Order',
//     caption: 'Create Order',
//     icon: 'shopping_cart',
//     link: '/order'
//   }
// ];

</script>
