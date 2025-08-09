<template>
  <header>
    <div class="bg-light py-2 border-bottom">
      <div class="container">
        <div class="row align-items-center">
          <!-- Logo -->
          <div class="col-md-3">
            <router-link to="/" class="text-decoration-none">
              <h4 class="m-0 fw-bold text-primary">HungSneaker</h4>
            </router-link>
          </div>

          <!-- Danh mục + Tìm kiếm + Tài khoản -->
          <div class="col-md-6 d-flex align-items-center gap-3">
            <!-- Danh mục -->
            <div class="dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Danh mục
              </a>
              <ul class="dropdown-menu">
                <li><router-link class="dropdown-item" to="/products">Tất cả sản phẩm</router-link></li>
                <li><router-link class="dropdown-item" to="/products?category=Giày Nam">Giày Nam</router-link></li>
                <li><router-link class="dropdown-item" to="/products?category=Giày Nữ">Giày Nữ</router-link></li>
                <li><router-link class="dropdown-item" to="/products?category=Giày Trẻ Em">Giày Trẻ Em</router-link></li>
                <li><router-link class="dropdown-item" to="/products?category=Giày Thể Thao">Giày Thể Thao</router-link></li>
                <li><hr class="dropdown-divider" /></li>
                <li><router-link class="dropdown-item" to="/discount">Khuyến mãi</router-link></li>
                <li><router-link class="dropdown-item" to="/size-guide">Hướng dẫn chọn size</router-link></li>
              </ul>
            </div>

            <!-- Tìm kiếm -->
            <form class="d-flex flex-grow-1">
              <input class="form-control me-2" type="search" placeholder="Tìm kiếm sản phẩm..." aria-label="Search" />
              <button class="btn btn-outline-primary" type="submit">Tìm</button>
            </form>

            <!-- Tài khoản -->
            <div class="dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-person-circle fs-4 me-1"></i>
                <span v-if="userEmail">👋 {{ userEmail }}</span>
                <span v-else>Đăng nhập</span>
              </a>
              <ul class="dropdown-menu">
                <template v-if="userEmail">
                  <li><router-link to="/change-password" class="dropdown-item"> Đổi mật khẩu </router-link></li>
                  <li v-if="isAdmin">
                    <router-link to="/admin" class="dropdown-item text-success">
                      🛠️ Quản trị
                    </router-link>
                  </li>
                  <li v-if="isAdmin">
                    <router-link to="/admin/orders" class="dropdown-item"> 📦 Duyệt đơn hàng </router-link>
                  </li>
                  <li v-if="isAdmin" class="black-text">
                    <router-link to="/admin/revenue" class="dropdown-item text-warning" >
                      💵 Báo cáo doanh thu
                    </router-link>
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li><button class="dropdown-item text-danger" @click="logout"> Đăng xuất </button></li>
                </template>
                <template v-else>
                  <li><router-link to="/login" class="dropdown-item">Đăng nhập</router-link></li>
                </template>
              </ul>
            </div>
          </div>

          <!-- Giỏ hàng + Hotline -->
          <div class="col-md-3 d-flex align-items-center justify-content-end gap-3">
            <router-link to="/cart" class="text-dark position-relative me-2">
              <i class="bi bi-cart3 fs-4"></i>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {{ cartCount }}
              </span>
            </router-link>
            <button class="btn btn-danger d-flex align-items-center gap-2">
              <i class="bi bi-telephone-fill"></i> Hotline: 0909 123 456
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const userEmail = ref(null)
const router = useRouter()
const store = useStore()

const cartCount = computed(() => store.state.cartCount)
const isAdmin = computed(() => userEmail.value === 'admin@gmail.com')

function getUserEmail() {
  const user =
    JSON.parse(localStorage.getItem('loggedInUser')) ||
    JSON.parse(sessionStorage.getItem('loggedInUser'))
  return user?.email || null
}

function logout() {
  localStorage.removeItem('loggedInUser')
  sessionStorage.removeItem('loggedInUser')
  userEmail.value = null
  router.push('/')
}

onMounted(() => {
  userEmail.value = getUserEmail()
  store.dispatch('updateCartCount')

  setInterval(() => {
    const current = getUserEmail()
    if (current !== userEmail.value) {
      userEmail.value = current
    }
  }, 500)
})
</script>

<style scoped>
.badge {
  font-size: 0.8rem;
  padding: 4px 8px;
}
.black-text {
  color: black;
}
</style>