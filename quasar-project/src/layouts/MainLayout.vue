<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Product App
        </q-toolbar-title>
        <q-space />
        <!-- Show user greeting and logout only on /order page -->
        <div v-if="route.path === '/order'" class="row items-center q-gutter-md">
          <div v-if="user" class="text-white">
            Hello {{ user.name }}
          </div>
          <q-btn
            color="negative"
            label="Logout"
            @click="logout"
            flat
            dense
          />
        </div>
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
import { ref, onMounted } from 'vue';
import { api } from 'boot/axios';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

interface User {
  name: string;
  email: string;
}

const user = ref<User>();

function logout() {
  authStore.logout(); 
  void router.push('/login');
}

onMounted(() => {
  api.get('/auth/user', {
    headers: {
      authorization: authStore.token
    }
  }).then(response => {
    user.value = response.data;
  }).catch(err => {
    console.log('Error fetching user:', err);
    // If token is invalid, redirect to login
    if (err.response?.status === 401) {
      void router.push('/login');
    }
  });
})
</script>
