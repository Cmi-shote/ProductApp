<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Product App
        </q-toolbar-title>

        <q-space />

        <!-- Show logout only on /order page -->
        <q-btn
          v-if="route.path === '/order'"
          color="negative"
          label="Logout"
          @click="logout"
          flat
          dense
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

function logout() {
  authStore.logout(); 
  router.push('/login');
}
</script>
