<template>
  <div class="container mt-5">
    <h2 class="mb-4">📦 Lịch sử đơn hàng</h2>

    <div v-if="orders.length === 0">
      <div class="alert alert-warning text-center">
        Bạn chưa có đơn hàng nào.
      </div>
    </div>

    <div v-else>
      <div
        v-for="order in orders"
        :key="order.id"
        class="card mb-4 shadow-sm border"
      >
        <div class="card-header bg-light d-flex justify-content-between align-items-center">
          <div>
            <strong>Mã đơn:</strong> #{{ order.id }}<br />
            <small>Ngày tạo: {{ formatDate(order.createdAt) }}</small>
          </div>
          <span class="badge bg-warning text-dark">{{ order.status }}</span>
        </div>

        <div class="card-body">
          <table class="table align-middle">
            <thead>
              <tr>
                <th>Hình</th>
                <th>Tên sản phẩm</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order.items" :key="item.id">
                <td>
                  <img :src="item.image" alt="" style="width: 60px; height: auto" />
                </td>
                <td>{{ item.name }}</td>
                <td>{{ item.price.toLocaleString() }} đ</td>
                <td>{{ item.quantity }}</td>
                <td>{{ (item.price * item.quantity).toLocaleString() }} đ</td>
              </tr>
            </tbody>
          </table>

          <div class="text-end fw-bold fs-5">
            Tổng tiền: {{ order.totalPrice.toLocaleString() }} đ
          </div>
        </div>
      </div>
    </div>

    <router-link to="/" class="btn btn-outline-primary">⬅️ Quay về trang chủ</router-link>
  </div>
</template>

<script>
export default {
  name: 'OrderHistory',
  data() {
    return {
      orders: []
    }
  },
  methods: {
    formatDate(isoString) {
      const date = new Date(isoString)
      return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'))
    const allOrders = JSON.parse(localStorage.getItem('orders')) || []

    if (user) {
      this.orders = allOrders.filter(order => order.userEmail === user.email)
    } else {
      this.orders = []
    }
  }
}
</script>

<style scoped>
.card img {
  border-radius: 4px;
  object-fit: cover;
}
</style>