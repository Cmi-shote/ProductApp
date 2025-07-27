<template>
  <q-page class="flex flex-center">
    <q-card style="min-width: 350px;">
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>
      <q-card-section>
        <q-form
          @submit.prevent="login">
          <q-input v-model="email" label="Email" required />
          <q-input v-model="password" label="Password" type="password" required />
          <q-btn label="Login" type="submit" color="primary" class="full-width q-mt-md" />
        </q-form>
        <q-banner v-if="errorMessage" class="bg-red text-white q-mb-md">
  {{ errorMessage }}
</q-banner>

      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Register" to="/register" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from 'boot/axios';
import { useAuthStore } from 'src/stores/auth'

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const authStore = useAuthStore();

interface LoginPayload {
  email: string;
  password: string;
}

async function login() {
  const payload: LoginPayload = {
    email: email.value,
    password: password.value
  };


  try {
    const response = await api.post('/auth/signin', payload);
    const token = response.data;

      errorMessage.value = '';
      authStore.setToken(token);
      await router.push('/order');
  } catch (err) {
    const error = err as { response?: { data?: { message?: string } } };
    errorMessage.value = error.response?.data?.message || 'Invalid credentials';
    console.log(err);
  }
}

</script> 