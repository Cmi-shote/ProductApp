<template>
  <q-page class="flex flex-center">
    <q-card style="min-width: 350px;">
      <q-card-section>
        <div class="text-h6">Register</div>
      </q-card-section>
      <q-card-section>
        <q-form
          @submit.prevent="register">
          <q-input v-model="username" label="Username" required />
          <q-input v-model="email" label="Email" type="email" required />
          <q-input v-model="password" label="Password" type="password" required />
          <q-btn label="Register" type="submit" color="primary" class="full-width q-mt-md" />
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Login" to="/login" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from 'boot/axios';

const username = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

async function register() {
  try {
    await api.post('/signup', {
      username: username.value,
      email: email.value,
      password: password.value
    });
    router.push('/login');
  } catch (err) {
    // handle error (show notification, etc.)
    console.error(err);
  }
}
</script> 