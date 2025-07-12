<template>
  <div class="container py-4">
    <h2 class="mb-4 text-success">📦 Duyệt đơn hàng</h2>

    <div v-if="orders.length === 0" class="alert alert-info">Không có đơn hàng nào.</div>

    <div v-for="(order, index) in orders" :key="index" class="border rounded p-3 mb-3 bg-light">
      <h5>Đơn hàng #{{ index + 1 }}</h5>
      <p><strong>Khách hàng:</strong> {{ order.customer }}</p>
      <p><strong>Ngày:</strong> {{ order.date }}</p>
      <p><strong>Tổng tiền:</strong> {{ totalAmount(order.items).toLocaleString() }} đ</p>

      <ul class="list-group mb-3">
        <li class="list-group-item" v-for="item in order.items" :key="item.id">
          {{ item.name }} - SL: {{ item.quantity }} - {{ item.price.toLocaleString() }} đ
        </li>
      </ul>

      <div class="text-end">
        <button class="btn btn-success me-2" @click="approveOrder(index)">✔️ Duyệt</button>
        <button class="btn btn-danger" @click="rejectOrder(index)">❌ Hủy</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const orders = ref([])

onMounted(() => {
  orders.value = JSON.parse(localStorage.getItem('orders')) || []
})

function approveOrder(index) {
  alert(`✅ Đã duyệt đơn hàng #${index + 1}`)
  orders.value.splice(index, 1)
  save()
}

function rejectOrder(index) {
  if (confirm('Bạn có chắc muốn hủy đơn này?')) {
    alert(`❌ Đã hủy đơn hàng #${index + 1}`)
    orders.value.splice(index, 1)
    save()
  }
}

function save() {
  localStorage.setItem('orders', JSON.stringify(orders.value))
}

function totalAmount(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}
</script>

<style scoped>
.list-group-item {
  font-size: 0.95rem;
}
</style>
