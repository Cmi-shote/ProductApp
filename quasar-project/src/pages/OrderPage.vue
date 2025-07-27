<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-lg">Products</div>
    
    <div class="row q-gutter-md">
      <q-card v-for="product in products" :key="product.id" class="product-card">
        <q-img
          :src="product.imageUrl"
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
                :disable="product.amount <= 0"
                @click="decreaseQuantity(product.id)"
              />
              <div class="text-h6 q-px-md">{{ product.amount }}</div>
              <q-btn
                round
                dense
                icon="add"
                color="primary"
                :disable="product.amount >= 10"
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
import { ref, computed, onMounted } from 'vue';
import { api } from 'boot/axios';
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  amount: number;
}

const products = ref<Product[]>([]);

function fetchProducts() {
  api.get(`/product`)
  .then(response => {
  products.value = response.data
  .map((item: any) => ({
    ...item,
    quantity: 0 // Initialize quantity to 0
  }));
 })
 .catch(err => {
  console.log('Error fetching products:', err);
 });
}

// Call fetchProducts when component is mounted
onMounted(() => {
  authStore.loadTokenFromStorage();
  if (!authStore.token) {
    void router.push('/login'); // redirect if not logged in
    return;
  }
  
  fetchProducts();
});

const hasItems = computed(() => {
  return products.value.some(product => product.amount > 0);
});

function increaseQuantity(productId: number) {
  const product = products.value.find(p => p.id === productId);
  if (product && product.amount < 10) {
    product.amount++;
  }
}

function decreaseQuantity(productId: number) {
  const product = products.value.find(p => p.id === productId);
  if (product && product.amount > 0) {
    product.amount--;
  }
}

async function createOrder() {
  const orderItems = products.value.filter(product => product.amount > 0);
  
  if (orderItems.length === 0) return;
  
  try {
    await api.post('/product', {
      products: orderItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.amount,
        price: item.price
      }))
    });
    
    // Reset quantities after successful order
    products.value.forEach(product => {
      product.amount = 0;
    });
    
    // Show success message (you can add a notification here)
    console.log('Order created successfully!');
  } catch (err) {
    console.log('Error creating order:', err);
  }
}

</script>

<style scoped>
.product-card {
  width: 300px;
  max-width: 100%;
}
</style> 