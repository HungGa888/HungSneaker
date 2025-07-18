<template>
  <div class="container mt-5">
    <h2 class="mb-4">🛒 Giỏ hàng</h2>

    <div v-if="cart.length === 0">
      <p>Giỏ hàng của bạn đang trống.</p>
    </div>

    <div v-else>
      <table class="table table-bordered align-middle">
        <thead class="table-light text-center">
          <tr>
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Tổng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cart" :key="index" class="text-center">
            <td>
              <img :src="item.image" alt="" style="width: 80px; height: auto" />
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.price.toLocaleString() }} đ</td>
            <td>
              <button class="btn btn-sm btn-outline-secondary me-1" @click="decreaseQuantity(index)">-</button>
              {{ item.quantity }}
              <button class="btn btn-sm btn-outline-secondary ms-1" @click="increaseQuantity(index)">+</button>
            </td>
            <td>{{ (item.price * item.quantity).toLocaleString() }} đ</td>
            <td>
              <button class="btn btn-sm btn-danger" @click="removeItem(index)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="text-end fw-bold fs-5">Tổng cộng: {{ totalPrice.toLocaleString() }} đ</div>

      <!-- Nút thanh toán -->
      <div class="text-end mt-3">
        <button class="btn btn-success" @click="checkout">✅ Thanh toán</button>
      </div>
    </div>

    <!-- Nút xem lịch sử mua hàng -->
    <div class="mt-4">
      <button class="btn btn-info" @click="goToOrderHistory">📦 Xem lịch sử mua hàng</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
      cart: []
    }
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }
  },
  methods: {
    getCartKey() {
      const user = JSON.parse(localStorage.getItem('loggedInUser'))
      return user ? `cart_${user.email}` : null
    },
    loadCart() {
      const key = this.getCartKey()
      if (!key) {
        this.cart = []
        return
      }
      const stored = JSON.parse(localStorage.getItem(key)) || []
      this.cart = stored.map(item => ({
        ...item,
        quantity: item.quantity || 1
      }))
    },
    saveCart() {
      const key = this.getCartKey()
      if (key) {
        localStorage.setItem(key, JSON.stringify(this.cart))
      }
    },
    removeItem(index) {
      this.cart.splice(index, 1)
      this.saveCart()
    },
    increaseQuantity(index) {
      this.cart[index].quantity++
      this.saveCart()
    },
    decreaseQuantity(index) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--
        this.saveCart()
      }
    },
    checkout() {
      const user = JSON.parse(localStorage.getItem('loggedInUser')) || null
      if (!user) {
        alert('Vui lòng đăng nhập để thanh toán!')
        return
      }
      if (this.cart.length === 0) {
        alert('Giỏ hàng trống!')
        return
      }
      const order = {
        id: Date.now(),
        items: this.cart,
        totalPrice: this.totalPrice,
        status: 'Đang xử lý',
        createdAt: new Date().toISOString(),
        userEmail: user.email
      }
      let orders = JSON.parse(localStorage.getItem('orders')) || []
      orders.push(order)
      localStorage.setItem('orders', JSON.stringify(orders))
      this.cart = []
      this.saveCart()
      alert('✅ Thanh toán thành công!')
      this.$router.push('/order-history')
    },
    goToOrderHistory() {
      this.$router.push('/order-history')
    }
  },
  mounted() {
    this.loadCart()
  }
}
</script>

<style scoped>
table img {
  border-radius: 6px;
  object-fit: cover;
}
</style>
