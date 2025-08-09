<template>
  <div class="container py-4">
    <h2 class="mb-4">Tất cả sản phẩm</h2>

    <!-- Lọc theo thể loại -->
    <div class="dropdown mb-4">
      <button
        class="btn btn-outline-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {{ selectedCategory || 'Tất cả thể loại' }}
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li><a class="dropdown-item" href="#" @click.prevent="selectCategory('')">Tất cả thể loại</a></li>
        <li v-for="cat in categories" :key="cat">
          <a class="dropdown-item" href="#" @click.prevent="selectCategory(cat)">{{ cat }}</a>
        </li>
      </ul>
    </div>

    <!-- Danh sách sản phẩm -->
    <div v-if="paginatedProducts.length" class="row">
      <div class="col-md-3 mb-4" v-for="p in paginatedProducts" :key="p.id">
        <div class="card h-100">
          <img :src="p.image" class="card-img-top" style="height: 200px; object-fit: cover" />
          <div class="card-body">
            <h6>{{ p.name }}</h6>
            <p class="text-secondary mb-1">Kích cỡ: <span>{{ Array.isArray(p.sizes) ? p.sizes.join(', ') : (p.sizes || 'Chưa cập nhật') }}</span></p>
            <p class="text-danger">{{ p.price.toLocaleString() }} đ</p>
            <div class="d-flex gap-2">
              <button class="btn btn-primary btn-sm" @click="addToCart(p)">Mua ngay</button>
              <button class="btn btn-outline-secondary btn-sm" @click="showDetail(p)">Chi tiết</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Không tìm thấy -->
    <div v-else class="text-center text-danger my-5">
      <h5>Không tìm thấy sản phẩm nào phù hợp!</h5>
    </div>

    <!-- Phân trang -->
    <nav v-if="totalPages > 1">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: page === 1 }">
          <button class="page-link" @click="page--" :disabled="page === 1">&laquo;</button>
        </li>
        <li
          class="page-item"
          v-for="i in totalPages"
          :key="i"
          :class="{ active: i === page }"
        >
          <button class="page-link" @click="page = i">{{ i }}</button>
        </li>
        <li class="page-item" :class="{ disabled: page === totalPages }">
          <button class="page-link" @click="page++" :disabled="page === totalPages">&raquo;</button>
        </li>
      </ul>
    </nav>

    <ProductModal v-if="selectedProduct" :product="selectedProduct" :show="showModal" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import emitter from '../eventBus'
import ProductModal from '../components/ProductModal.vue'

const route = useRoute()
const router = useRouter()

const allProducts = ref([])
const categories = ref([])
const search = ref('')
const selectedCategory = ref('')
const page = ref(1)
const perPage = 8

const selectedProduct = ref(null)
const showModal = ref(false)

onMounted(() => {
  allProducts.value = JSON.parse(localStorage.getItem('products')) || []
  categories.value = [...new Set(allProducts.value.map(p => p.category))]

  const catQuery = route.query.category
  if (catQuery) selectedCategory.value = catQuery
})

watch(selectedCategory, (val) => {
  router.replace({ query: val ? { category: val } : {} })
  page.value = 1
})

const selectCategory = (cat) => {
  selectedCategory.value = cat
}

const filteredProducts = computed(() => {
  return allProducts.value.filter(p => {
    const matchCategory = !selectedCategory.value || p.category === selectedCategory.value
    const matchSearch = p.name.toLowerCase().includes(search.value.toLowerCase())
    return matchCategory && matchSearch
  })
})

const paginatedProducts = computed(() => {
  const start = (page.value - 1) * perPage
  return filteredProducts.value.slice(start, start + perPage)
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / perPage))

function showDetail(product) {
  selectedProduct.value = product
  showModal.value = true
}

function addToCart(product) {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!user) {
    alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
    return;
  }
  const cartKey = `cart_${user.email}`;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  const existingItem = cart.find(i => i.id === product.id);
  if (existingItem) existingItem.quantity++;
  else cart.push({ ...product, quantity: 1 });
  localStorage.setItem(cartKey, JSON.stringify(cart));
  emitter.emit('cart-updated');
  alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
}
</script>
