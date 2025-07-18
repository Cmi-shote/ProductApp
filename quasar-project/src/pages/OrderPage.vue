<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-lg">Products</div>
    
    <div class="row q-gutter-md">
      <q-card v-for="product in products" :key="product.id" class="product-card">
        <q-img
          :src="product.image"
          :alt="product.name"
          height="200px"
        />
        
        <q-card-section>
          <div class="text-h6">{{ product.name }}</div>
          <div class="text-subtitle2 q-mb-md">${{ product.price }}</div>
          
          <div class="row items-center justify-between">
            <div class="text-caption">Quantity:</div>
            <div class="row items-center q-gutter-sm">
              <q-btn
                round
                dense
                icon="remove"
                color="primary"
                :disable="product.quantity <= 0"
                @click="decreaseQuantity(product.id)"
              />
              <div class="text-h6 q-px-md">{{ product.quantity }}</div>
              <q-btn
                round
                dense
                icon="add"
                color="primary"
                :disable="product.quantity >= 10"
                @click="increaseQuantity(product.id)"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    
    <div class="q-mt-xl text-center">
      <q-btn
        label="Order Now"
        color="primary"
        size="lg"
        :disable="!hasItems"
        @click="createOrder"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { api } from 'boot/axios';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const products = ref<Product[]>([
  {
    id: 1,
    name: 'Laptop',
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
    quantity: 0
  },
  {
    id: 2,
    name: 'Smartphone',
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    quantity: 0
  },
  {
    id: 3,
    name: 'Headphones',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    quantity: 0
  }
]);

const hasItems = computed(() => {
  return products.value.some(product => product.quantity > 0);
});

function increaseQuantity(productId: number) {
  const product = products.value.find(p => p.id === productId);
  if (product && product.quantity < 10) {
    product.quantity++;
  }
}

function decreaseQuantity(productId: number) {
  const product = products.value.find(p => p.id === productId);
  if (product && product.quantity > 0) {
    product.quantity--;
  }
}

async function createOrder() {
  const orderItems = products.value.filter(product => product.quantity > 0);
  
  if (orderItems.length === 0) return;
  
  try {
    await api.post('/orders', {
      products: orderItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    });
    
    // Reset quantities after successful order
    products.value.forEach(product => {
      product.quantity = 0;
    });
    
    // Show success message (you can add a notification here)
    console.log('Order created successfully!');
  } catch (err) {
    console.error('Error creating order:', err);
  }
}
</script>

<style scoped>
.product-card {
  width: 300px;
  max-width: 100%;
}
</style> 