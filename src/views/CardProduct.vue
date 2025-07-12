<template>
  <div class="card h-100 shadow-sm position-relative">

    <!-- 🏷️ Tag “Mới” hoặc “Hot” -->
    <span
      v-if="product.tag"
      class="badge bg-danger position-absolute top-0 start-0 m-2"
    >
      {{ product.tag }}
    </span>

    <!-- ❤️ Nút yêu thích -->
    <button
      class="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-2"
      :class="{ 'btn-danger text-white': isFavorite }"
      @click="toggleFavorite"
    >
      ❤️
    </button>

    <img :src="product.image" class="card-img-top" :alt="product.name" />

    <div class="card-body d-flex flex-column justify-content-between">
      <div>
        <h5 class="card-title">{{ product.name }}</h5>
        <p class="card-text text-danger fw-bold">
          {{ formatCurrency(product.price) }}
        </p>
      </div>

      <div class="d-flex justify-content-between mt-3">
        <button class="btn btn-primary btn-sm" @click="handleAddToCart(product)">
          🛒 Thêm giỏ hàng
        </button>
        <router-link
          :to="`/product/${product.id}`"
          class="btn btn-outline-secondary btn-sm"
        >
          Chi tiết
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

defineProps({
  product: {
    type: Object,
    required: true
  }
})

const store = useStore()
const isFavorite = ref(false)

function toggleFavorite() {
  isFavorite.value = !isFavorite.value
  // ✅ Có thể lưu vào localStorage hoặc gọi API sau
  alert(isFavorite.value
    ? `💖 Đã thêm ${product.name} vào danh sách yêu thích!`
    : `❌ Đã bỏ yêu thích sản phẩm.`)
}

function formatCurrency(value) {
  return value.toLocaleString('vi-VN') + ' đ'
}

function handleAddToCart(product) {
  const cart = JSON.parse(localStorage.getItem('cart')) || []

  const existing = cart.find((p) => p.id === product.id)
  if (existing) {
    existing.quantity += 1
  } else {
    cart.push({ ...product, quantity: 1 })
  }

  localStorage.setItem('cart', JSON.stringify(cart))

  store.dispatch('updateCartCount') // 🔁 Cập nhật lên Header qua Vuex
  alert(`✅ Đã thêm "${product.name}" vào giỏ hàng!`)
}
</script>

<style scoped>
.card-img-top {
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.card-img-top:hover {
  transform: scale(1.03);
}
</style>
