<template>
  <div class="container py-5">
    <h2 class="mb-4 text-primary">Quản lý Doanh thu</h2>
    
    <!-- Tổng quan doanh thu -->
    <div class="row mb-4">
      <div class="col-md-3">
        <div class="card text-center bg-success text-white">
          <div class="card-body">
            <h5>Tổng doanh thu</h5>
            <h3>{{ totalRevenue.toLocaleString() }} đ</h3>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-center bg-info text-white">
          <div class="card-body">
            <h5>Số đơn hàng</h5>
            <h3>{{ totalOrders }}</h3>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-center bg-warning text-white">
          <div class="card-body">
            <h5>Doanh thu trung bình</h5>
            <h3>{{ averageOrder.toLocaleString() }} đ</h3>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-center bg-primary text-white">
          <div class="card-body">
            <h5>Doanh thu hôm nay</h5>
            <h3>{{ todayRevenue.toLocaleString() }} đ</h3>
          </div>
        </div>
      </div>
    </div>

    <!-- Bộ lọc -->
    <div class="row mb-4">
      <div class="col-md-4">
        <label class="form-label">Từ ngày:</label>
        <input v-model="fromDate" type="date" class="form-control" />
      </div>
      <div class="col-md-4">
        <label class="form-label">Đến ngày:</label>
        <input v-model="toDate" type="date" class="form-control" />
      </div>
      <div class="col-md-4 d-flex align-items-end">
        <button class="btn btn-primary w-100" @click="filterOrders">Lọc</button>
      </div>
    </div>

    <!-- Danh sách đơn hàng -->
    <div class="card">
      <div class="card-header">
        <h5>Chi tiết đơn hàng</h5>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Khách hàng</th>
                <th>Ngày đặt</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in filteredOrders" :key="order.id">
                <td>#{{ order.id }}</td>
                <td>{{ order.userEmail }}</td>
                <td>{{ formatDate(order.createdAt) }}</td>
                <td class="text-success fw-bold">{{ order.totalPrice.toLocaleString() }} đ</td>
                <td>
                  <span class="badge" :class="getStatusClass(order.status)">
                    {{ order.status }}
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-info" @click="viewOrderDetail(order)">
                    Chi tiết
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal chi tiết đơn hàng -->
    <div v-if="selectedOrder" class="modal d-block" tabindex="-1" style="background: rgba(0,0,0,0.5)">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Chi tiết đơn hàng #{{ selectedOrder.id }}</h5>
            <button type="button" class="btn-close" @click="selectedOrder = null"></button>
          </div>
          <div class="modal-body">
            <p><strong>Khách hàng:</strong> {{ selectedOrder.userEmail }}</p>
            <p><strong>Địa chỉ:</strong> {{ selectedOrder.address }}</p>
            <p><strong>Ngày đặt:</strong> {{ formatDate(selectedOrder.createdAt) }}</p>
            <p v-if="selectedOrder.discountCode"><strong>Mã giảm giá:</strong> {{ selectedOrder.discountCode }} (-{{ selectedOrder.discountValue?.toLocaleString() || 0 }} đ)</p>
            
            <h6>Sản phẩm:</h6>
            <div class="table-responsive">
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in selectedOrder.items" :key="item.id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.price.toLocaleString() }} đ</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ (item.price * item.quantity).toLocaleString() }} đ</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="text-end">
              <strong>Tổng cộng: {{ selectedOrder.totalPrice.toLocaleString() }} đ</strong>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="selectedOrder = null">Đóng</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const orders = ref([])
const fromDate = ref('')
const toDate = ref('')
const selectedOrder = ref(null)

const totalRevenue = computed(() => {
  return orders.value.reduce((sum, order) => sum + order.totalPrice, 0)
})

const totalOrders = computed(() => orders.value.length)

const averageOrder = computed(() => {
  return totalOrders.value > 0 ? totalRevenue.value / totalOrders.value : 0
})

const todayRevenue = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return orders.value
    .filter(order => order.createdAt.split('T')[0] === today)
    .reduce((sum, order) => sum + order.totalPrice, 0)
})

const filteredOrders = computed(() => {
  if (!fromDate.value && !toDate.value) return orders.value
  
  return orders.value.filter(order => {
    const orderDate = order.createdAt.split('T')[0]
    const from = fromDate.value || '2020-01-01'
    const to = toDate.value || '2030-12-31'
    return orderDate >= from && orderDate <= to
  })
})

function loadOrders() {
  orders.value = JSON.parse(localStorage.getItem('orders') || '[]')
}

function filterOrders() {
  // Computed property sẽ tự động cập nhật
}

function formatDate(isoString) {
  const date = new Date(isoString)
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function getStatusClass(status) {
  switch (status) {
    case 'Đang xử lý': return 'bg-warning'
    case 'Đã giao': return 'bg-success'
    case 'Đã hủy': return 'bg-danger'
    default: return 'bg-secondary'
  }
}

function viewOrderDetail(order) {
  selectedOrder.value = order
}

onMounted(loadOrders)
</script>

<style scoped>
.card {
  border-radius: 1rem;
}
.modal {
  z-index: 1050;
}
</style>
