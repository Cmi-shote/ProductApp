<template>
  <q-page class="flex flex-center">
    <q-card style="min-width: 400px;">
      <q-card-section>
        <div class="text-h6">Create Order</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="createOrder">
          <div v-for="(product, idx) in products" :key="idx" class="q-mb-md">
            <q-input v-model="product.name" label="Product Name" required />
            <q-input v-model.number="product.quantity" label="Quantity" type="number" min="1" required />
            <q-btn flat icon="delete" color="negative" @click="removeProduct(idx)" />
          </div>
          <q-btn flat icon="add" color="primary" @click="addProduct" label="Add Product" class="q-mb-md" />
          <q-btn label="Create Order" type="submit" color="primary" class="full-width q-mt-md" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { api } from 'boot/axios';

interface Product {
  name: string;
  quantity: number;
}

const products = ref<Product[]>([
  { name: '', quantity: 1 }
]);

function addProduct() {
  products.value.push({ name: '', quantity: 1 });
}

function removeProduct(idx: number) {
  products.value.splice(idx, 1);
}

async function createOrder() {
  try {
    await api.post('/orders', {
      products: products.value
    });
    // Optionally, reset form or show success
    products.value = [{ name: '', quantity: 1 }];
  } catch (err) {
    // handle error (show notification, etc.)
    console.error(err);
  }
}
</script> 