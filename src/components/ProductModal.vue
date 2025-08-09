<!-- components/ProductModal.vue -->
<template>
  <div class="modal fade" ref="modalRef" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ product.name }}</h5>
          <button type="button" class="btn-close" @click="hideModal"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6">
              <img :src="product.image" class="img-fluid rounded" />
            </div>
            <div class="col-md-6">
              <p><strong>Thể loại:</strong> {{ product.category }}</p>
              <p><strong>Kích cỡ:</strong> {{ Array.isArray(product.sizes) ? product.sizes.join(', ') : (product.sizes || 'Chưa cập nhật') }}</p>
              <p class="text-danger fs-5"><strong>Giá:</strong> {{ product.price.toLocaleString() }} đ</p>
              <p><strong>Mô tả:</strong> {{ product.description || "Không có mô tả chi tiết." }}</p>

              <div class="mb-3">
                <label for="sizeSelect" class="form-label fw-semibold">Chọn kích cỡ giày *</label>
                <select v-model="selectedSize" id="sizeSelect" class="form-select" required>
                  <option value="" disabled>-- Chọn size --</option>
                  <option v-for="size in product.sizes" :key="size" :value="size">{{ size }}</option>
                </select>
              </div>
              <button class="btn btn-primary me-2" @click="addToCart">🛒 Mua ngay</button>
              <button class="btn btn-outline-warning" @click="toggleFavorite">
                <i class="bi" :class="isFavorite(product.id) ? 'bi-heart-fill' : 'bi-heart'" />
                Yêu thích
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import emitter from '../eventBus'

const props = defineProps({
  product: Object,
  show: Boolean
})

const modalRef = ref(null)
let modalInstance = null
const selectedSize = ref('')

// Tự động mở/đóng modal khi prop show thay đổi
watch(
  () => props.show,
  async val => {
    await nextTick()
    if (!modalRef.value) return
    if (!modalInstance) {
      const modalEl = modalRef.value
      modalInstance = new bootstrap.Modal(modalEl)
    }
    val ? modalInstance.show() : modalInstance.hide()
  }
)

function hideModal() {
  modalInstance?.hide()
}

function addToCart() {
  if (!selectedSize.value) {
    alert('Vui lòng chọn kích cỡ giày trước khi thêm vào giỏ hàng!')
    return
  }
  const cart = JSON.parse(localStorage.getItem('cart')) || []
  const item = cart.find(i => i.id === props.product.id && i.size === selectedSize.value)
  if (item) item.quantity++
  else cart.push({ ...props.product, quantity: 1, size: selectedSize.value })
  localStorage.setItem('cart', JSON.stringify(cart))
  emitter.emit('cart-updated')
  alert(`✅ Đã thêm "${props.product.name}" (size ${selectedSize.value}) vào giỏ hàng!`)
  hideModal()
  selectedSize.value = ''
}

const favorites = ref(new Set(JSON.parse(localStorage.getItem('favorites')) || []))
function toggleFavorite() {
  const id = props.product.id
  favorites.value.has(id) ? favorites.value.delete(id) : favorites.value.add(id)
  localStorage.setItem('favorites', JSON.stringify(Array.from(favorites.value)))
}
function isFavorite(id) {
  return favorites.value.has(id)
}
</script>
