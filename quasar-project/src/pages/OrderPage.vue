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
              :disable="product.currentAmount <= 0"
              @click="decreaseQuantity(product.id)"
            />
            <div class="text-h6 q-px-md">{{ product.currentAmount }}</div>
              <q-btn
                round
                dense
                icon="add"
                color="primary"
                :disable="product.currentAmount >= product.amount"
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
import { useQuasar } from 'quasar';

const router = useRouter();
const authStore = useAuthStore();
const $q = useQuasar();

authStore.loadTokenFromStorage();

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  amount: number;
currentAmount: number;
}

const products = ref<Product[]>([]);

function fetchProducts() {
  api.get('/product')
  .then(response => {
    products.value = response.data.map((item: Omit<Product, 'currentAmount'>) => ({
    ...item,
    currentAmount: 0
    }));
  })
  .catch(err => {
  console.log('Error fetching products:', err);
  $q.notify({
    color: 'negative',
    message: 'Error fetching products',
    icon: 'report_problem'
    });
  });
}

// Call fetchProducts when component is mounted
onMounted(() => {
  if (!authStore.token) {
    void router.push('/login'); // redirect if not logged in
    return;
  }

  fetchProducts();
});

const hasItems = computed(() => {
  return products.value.some(product => product.currentAmount > 0);
});

function increaseQuantity(productId: number) {
  const product = products.value.find(p => p.id === productId);
  if (product && product.currentAmount < product.amount) {
    product.currentAmount++;
  }
}

function decreaseQuantity(productId: number) {
  const product = products.value.find(p => p.id === productId);
  if (product && product.currentAmount > 0) {
    product.currentAmount--;
  }
}

async function createOrder() {
const orderItems = products.value.filter(product => product.currentAmount > 0);

if (orderItems.length === 0) return;

try {
  await api.post(
    '/order',
    {
      items: orderItems.map(item => ({
        productId: item.id,
        quantity: item.currentAmount
      }))
    },
    {
      headers: {
        authorization: authStore.token
      }
    }
  );

  for (const item of orderItems) {
    await api.put(
      `/product/${item.id}`,
      {
        amount: item.amount - item.currentAmount
      }
    );
  }

  // Reset quantities after successful order
  products.value.forEach(product => {
    product.currentAmount = 0;
  });

  // Show success notification
  $q.notify({
    color: 'positive',
    message: 'Order created successfully!',
    icon: 'check_circle',
    position: 'top'
  });

  console.log('Order created successfully!');

  } catch (err) {
    console.log('Error creating order:', err);
    // Show error notification
    $q.notify({
      color: 'negative',
      message: 'Error creating order. Please try again.',
      icon: 'report_problem',
      position: 'top'
    });
    }
  }

</script>

<style scoped>
.product-card {
width: 300px;
max-width: 100%;
}
</style>