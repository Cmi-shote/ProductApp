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
          <q-input v-model="password" label="Password" :type="showPassword ? 'text' : 'password'" required >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>
          <q-btn label="Register" type="submit" color="primary" class="full-width q-mt-md" />
        </q-form>

        <q-card-section>
       <q-banner v-if="errorMessage" class="bg-red text-white q-mb-md">
  {{ errorMessage }}
</q-banner>

      </q-card-section>
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

const showPassword = ref(false);
const username = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

async function register() {
  try {
    await api.post('/auth/signup', {
      username: username.value,
      email: email.value,
      password: password.value
    })
      
    errorMessage.value = ""
    await router.push('/login');
  } catch (err) {
    const error = err as { response?: { data?: { message?: string } } };
    errorMessage.value = error.response?.data?.message || 'Invalid credentials';
    console.log(err)
  }
}
</script> 