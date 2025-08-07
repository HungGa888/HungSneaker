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
          <span 
            class="badge" 
            :class="getStatusClass(order.status)"
          >
            {{ getStatusText(order.status) }}
          </span>
        </div>

        <div class="card-body">
          <div class="row mb-3">
            <div class="col-md-6">
              <strong>Người nhận:</strong> {{ order.receiverName || 'Chưa cập nhật' }}<br>
              <strong>SĐT:</strong> {{ order.receiverPhone || 'Chưa cập nhật' }}<br>
              <strong>Địa chỉ:</strong> {{ order.address || 'Chưa cập nhật' }}
            </div>
            <div class="col-md-6">
              <div v-if="order.discountCode" class="text-success">
                <strong>Mã giảm giá:</strong> {{ order.discountCode }}<br>
                <strong>Giảm:</strong> {{ order.discountValue?.toLocaleString() || 0 }} đ
              </div>
            </div>
          </div>

          <table class="table align-middle">
            <thead>
              <tr>
                <th>Hình</th>
                <th>Tên sản phẩm</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th v-if="order.status === 'Hoàn thành'">Đánh giá</th>
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
                <td v-if="order.status === 'Hoàn thành'">
                  <button 
                    v-if="!item.reviewed"
                    class="btn btn-sm btn-outline-warning"
                    @click="openReviewModal(item, order.id)"
                  >
                    ⭐ Đánh giá
                  </button>
                  <span v-else class="text-success">
                    ✅ Đã đánh giá
                  </span>
                </td>
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

    <!-- Modal đánh giá sản phẩm -->
    <ProductReview 
      ref="productReview"
      :product="selectedProduct"
      :orderId="selectedOrderId"
      @reviewSubmitted="onReviewSubmitted"
    />
  </div>
</template>

<script>
import ProductReview from '../components/ProductReview.vue'

export default {
  name: 'OrderHistory',
  components: {
    ProductReview
  },
  data() {
    return {
      orders: [],
      selectedProduct: null,
      selectedOrderId: null
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
    },
    getStatusClass(status) {
      const statusClasses = {
        'Đang xử lý': 'bg-warning text-dark',
        'Đã xác nhận': 'bg-info text-white',
        'Đang giao': 'bg-primary text-white',
        'Hoàn thành': 'bg-success text-white',
        'Đã hủy': 'bg-danger text-white'
      }
      return statusClasses[status] || 'bg-secondary text-white'
    },
    getStatusText(status) {
      return status || 'Đang xử lý'
    },
    openReviewModal(product, orderId) {
      this.selectedProduct = product
      this.selectedOrderId = orderId
      this.$nextTick(() => {
        this.$refs.productReview.openModal()
      })
    },
    onReviewSubmitted(review) {
      // Cập nhật lại danh sách đơn hàng
      this.loadOrders()
    },
    loadOrders() {
      const user = JSON.parse(localStorage.getItem('loggedInUser'))
      const allOrders = JSON.parse(localStorage.getItem('orders')) || []

      if (user) {
        this.orders = allOrders.filter(order => order.userEmail === user.email)
      } else {
        this.orders = []
      }
    }
  },
  mounted() {
    this.loadOrders()
  }
}
</script>

<style scoped>
.card img {
  border-radius: 4px;
  object-fit: cover;
}

.badge {
  font-size: 0.9em;
  padding: 0.5em 0.75em;
}
</style>