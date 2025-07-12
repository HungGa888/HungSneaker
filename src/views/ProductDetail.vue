<template>
  <div class="container my-5" v-if="product">
    <div class="row">
      <div class="col-md-6">
        <img :src="product.image" class="img-fluid rounded shadow-sm w-100" alt="Product Image" />
      </div>
      <div class="col-md-6">
        <h2 class="fw-bold mb-3">{{ product.name }}</h2>
        <p class="text-muted mb-1">Thể loại: <strong>{{ product.category }}</strong></p>
        <p class="text-danger fs-4 mb-3">{{ product.price.toLocaleString() }} đ</p>

        <!-- Nút thao tác -->
        <div class="d-flex gap-2 mb-4">
          <button class="btn btn-success" @click="addToCart">🛒 Mua ngay</button>
          <button class="btn" :class="isFavorite(product.id) ? 'btn-warning' : 'btn-outline-warning'" @click="toggleFavorite">
            <i class="bi" :class="isFavorite(product.id) ? 'bi-heart-fill' : 'bi-heart'" />
            Yêu thích
          </button>
        </div>

        <!-- Mô tả -->
        <div class="border-top pt-3">
          <h5>Mô tả chi tiết</h5>
          <p>
            {{ product.description || "Sản phẩm thuộc dòng thời trang cao cấp, phù hợp với mọi hoạt động thể thao và dạo phố. Chất liệu thoáng mát, form chuẩn hiện đại." }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-5">
    <h4 class="text-muted">⛔ Sản phẩm không tồn tại</h4>
    <router-link to="/products" class="btn btn-outline-secondary mt-3">⬅ Quay lại danh sách</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import emitter from '../eventBus'

const route = useRoute()
const product = ref(null)
const favorites = ref(new Set())

// Load sản phẩm theo ID từ route
function loadProduct() {
  const id = Number(route.params.id)
  const allProducts = JSON.parse(localStorage.getItem('products')) || []
  const favoriteArray = JSON.parse(localStorage.getItem('favorites')) || []
  favorites.value = new Set(favoriteArray)

  product.value = allProducts.find(p => p.id === id) || null
}

// Thêm vào giỏ hàng
function addToCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || []
  const existingItem = cart.find(i => i.id === product.value.id)

  if (existingItem) {
    existingItem.quantity++
  } else {
    cart.push({ ...product.value, quantity: 1 })
  }

  localStorage.setItem('cart', JSON.stringify(cart))
  emitter.emit('cart-updated')
  alert(`✅ Đã thêm "${product.value.name}" vào giỏ hàng!`)
}

// Thêm/xoá khỏi danh sách yêu thích
function toggleFavorite() {
  const id = product.value.id
  favorites.value.has(id) ? favorites.value.delete(id) : favorites.value.add(id)
  localStorage.setItem('favorites', JSON.stringify(Array.from(favorites.value)))
}

function isFavorite(id) {
  return favorites.value.has(id)
}

onMounted(loadProduct)
</script>

<style scoped>
img {
  max-height: 450px;
  object-fit: contain;
}
</style>
