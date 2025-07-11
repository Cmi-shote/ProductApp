<template>
  <q-page class="flex flex-center">
    <q-card style="min-width: 350px;">
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>
      <q-card-section>
        <q-form >
        <!-- @submit.prevent="login" -->
          <q-input v-model="identifier" label="Email or Username" required />
          <q-input v-model="password" label="Password" type="password" required />
          <q-btn label="Login" type="submit" color="primary" class="full-width q-mt-md" />
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Register" to="/register" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import { useRouter } from 'vue-router';
// import { api } from 'boot/axios';

const identifier = ref('');
const password = ref('');
// const router = useRouter();

// async function login() {
//   try {
//     await api.post('/login', {
//       identifier: identifier.value,
//       password: password.value
//     });
//     router.push('/order');
//   } catch (err) {
//     // handle error (show notification, etc.)
//     console.error(err);
//   }
// }
</script> 