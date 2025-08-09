<template>
  <div class="product-page" v-if="product">
    <div class="product-card shadow-lg rounded-4 p-4 bg-white row g-4 align-items-center">
      <div class="col-md-6 text-center">
        <img :src="product.image" class="product-img mb-3" alt="Product Image" />
      </div>
      <div class="col-md-6">
        <h2 class="fw-bold mb-2 text-primary">{{ product.name }}</h2>
        <p class="text-secondary mb-1"><i class="bi bi-tag"></i> Thể loại: <span class="fw-semibold">{{ product.category }}</span></p>
        <p class="text-secondary mb-1"><i class="bi bi-rulers"></i> Kích cỡ: <span class="fw-semibold">{{ Array.isArray(product.sizes) ? product.sizes.join(', ') : (product.sizes || 'Chưa cập nhật') }}</span></p>
        <h3 class="text-danger mb-3">{{ product.price.toLocaleString() }} đ</h3>
        <div class="d-flex gap-3 mb-4">
          <button class="btn btn-lg btn-gradient-primary shadow" @click="addToCart">
            <i class="bi bi-cart-plus me-2"></i>Thêm vào giỏ
          </button>
          <button
            class="btn btn-lg shadow"
            :class="isFavorite(product.id) ? 'btn-warning' : 'btn-outline-warning'"
            @click="toggleFavorite"
          >
            <i class="bi" :class="isFavorite(product.id) ? 'bi-heart-fill' : 'bi-heart'" />
            <span class="ms-1">Yêu thích</span>
          </button>
        </div>
        <div class="product-desc bg-light rounded-3 p-3">
          <h5 class="mb-2 text-dark">Mô tả sản phẩm</h5>
          <p class="mb-0 text-muted">Mô tả chi tiết sản phẩm sẽ được hiển thị tại đây. Bạn có thể bổ sung nội dung từ backend hoặc API sau.</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-5">
    <h4 class="text-muted">Sản phẩm không tồn tại</h4>
    <router-link to="/products" class="btn btn-outline-secondary mt-3">Quay lại danh sách</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import emitter from '../eventBus'

const route = useRoute()
const product = ref(null)
const favorites = ref(new Set())

function loadProduct() {
  const id = Number(route.params.id)
  const allProducts = JSON.parse(localStorage.getItem('products')) || []
  favorites.value = new Set(JSON.parse(localStorage.getItem('favorites')) || [])
  product.value = allProducts.find(p => p.id === id)
}

function addToCart() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!user) {
    alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
    return;
  }
  const cartKey = `cart_${user.email}`;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  const item = cart.find(i => i.id === product.value.id);
  if (item) item.quantity++;
  else cart.push({ ...product.value, quantity: 1 });
  localStorage.setItem(cartKey, JSON.stringify(cart));
  emitter.emit('cart-updated');
  alert('Sản phẩm đã được thêm vào giỏ hàng!');
}

function toggleFavorite() {
  const id = product.value.id
  if (favorites.value.has(id)) {
    favorites.value.delete(id)
  } else {
    favorites.value.add(id)
  }
  localStorage.setItem('favorites', JSON.stringify(Array.from(favorites.value)))
}

function isFavorite(id) {
  return favorites.value.has(id)
}

onMounted(loadProduct)
</script>

<style scoped>
.product-page {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%);
}
.product-card {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  border: none;
}
.product-img {
  max-height: 420px;
  width: auto;
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  transition: transform 0.3s;
}
.product-img:hover {
  transform: scale(1.04);
}
.btn-gradient-primary {
  background: linear-gradient(90deg, #4f8cff 0%, #38b6ff 100%);
  color: #fff;
  border: none;
}
.btn-gradient-primary:hover {
  background: linear-gradient(90deg, #38b6ff 0%, #4f8cff 100%);
  color: #fff;
}
.product-desc {
  margin-top: 1.5rem;
}
@media (max-width: 768px) {
  .product-card {
    flex-direction: column;
    padding: 1.5rem 0.5rem;
  }
  .product-img {
    max-width: 100%;
    max-height: 260px;
  }
}
</style>