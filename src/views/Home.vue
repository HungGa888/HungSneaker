<template>
  <div>
    <!-- Carousel Banner -->
    <div id="carouselExampleAutoplaying" class="carousel slide rounded-4 overflow-hidden shadow mb-5" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="https://supersports.com.vn/cdn/shop/files/UA_12_PISCES_VN_1545x500_01634aaf-c9b0-41d2-9c6c-3dbb933969fd.jpg?v=1744681258&width=1920" class="d-block w-100 home-banner" alt="..." />
        </div>
        <div class="carousel-item">
          <img src="https://supersports.com.vn/cdn/shop/files/HOKA_CLIFTON_10_1545x500_VN.jpg?v=1744250396&width=1920" class="d-block w-100 home-banner" alt="..." />
        </div>
        <div class="carousel-item">
          <img src="https://pos.nvncdn.com/b5a043-19330/bn/20230807_HgwtHZd7.jpeg" class="d-block w-100 home-banner" alt="..." />
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <!-- Product Sections -->
    <div class="container mt-5">
      <h2 class="mb-4 fw-bold text-primary text-center">Sản phẩm mới nhất</h2>
      <div class="row">
        <div class="col-md-3 mb-4" v-for="product in paginatedLatest" :key="product.id">
          <div class="card h-100 shadow-lg border-0 rounded-4 product-card-home">
            <img :src="product.image" class="card-img-top rounded-top-4 product-img-home" alt="..." />
            <div class="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 class="card-title fw-semibold text-dark">{{ product.name }}</h5>
                <p class="card-text text-danger fw-bold">{{ product.price.toLocaleString() }} đ</p>
              </div>
              <div class="d-flex justify-content-between mt-2">
                <button class="btn btn-gradient-primary btn-sm shadow" @click="addToCart(product)">
                  <i class="bi bi-cart-plus me-1"></i>Thêm giỏ hàng
                </button>
                <router-link :to="`/product/${product.id}`" class="btn btn-outline-secondary btn-sm shadow">Chi tiết</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination for latest -->
      <nav>
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: latestPage === 1 }">
            <button class="page-link" @click="latestPage--">&laquo;</button>
          </li>
          <li class="page-item" v-for="page in latestTotalPages" :key="page" :class="{ active: page === latestPage }">
            <button class="page-link" @click="latestPage = page">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ disabled: latestPage === latestTotalPages }">
            <button class="page-link" @click="latestPage++">&raquo;</button>
          </li>
        </ul>
      </nav>

      <!-- Sản phẩm bán chạy -->
      <h2 class="mb-4 mt-5 fw-bold text-success text-center">Sản phẩm bán chạy</h2>
      <div class="row">
        <div class="col-md-3 mb-4" v-for="product in bestSellers" :key="product.id">
          <div class="card h-100 shadow-lg border-0 rounded-4 product-card-home">
            <img :src="product.image" class="card-img-top rounded-top-4 product-img-home" alt="..." />
            <div class="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 class="card-title fw-semibold text-dark">{{ product.name }}</h5>
                <p class="card-text text-danger fw-bold">{{ product.price.toLocaleString() }} đ</p>
              </div>
              <div class="d-flex justify-content-between mt-2">
                <button class="btn btn-gradient-primary btn-sm shadow" @click="addToCart(product)">
                  <i class="bi bi-cart-plus me-1"></i>Thêm giỏ hàng
                </button>
                <router-link :to="`/product/${product.id}`" class="btn btn-outline-secondary btn-sm shadow">Chi tiết</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Nút xem tất cả sản phẩm -->
      <div class="text-center my-4">
        <router-link to="/products" class="btn btn-lg btn-primary px-5 shadow">Tất cả sản phẩm</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      latestPage: 1,
      perPage: 4,
      latestProducts: [],
      bestSellers: [],
      discountedProducts: []
    }
  },
  computed: {
    latestTotalPages() {
      return Math.ceil(this.latestProducts.length / this.perPage)
    },
    paginatedLatest() {
      const start = (this.latestPage - 1) * this.perPage
      return this.latestProducts.slice(start, start + this.perPage)
    }
  },
  methods: {
    addToCart(product) {
      const user = JSON.parse(localStorage.getItem('loggedInUser'));
      if (!user) {
        alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
        return;
      }
      const cartKey = `cart_${user.email}`;
      const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
      const existing = cart.find(i => i.id === product.id);
      if (existing) existing.quantity++;
      else cart.push({ ...product, quantity: 1 });
      localStorage.setItem(cartKey, JSON.stringify(cart));
      alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
    }
  },
  mounted() {
    const products = JSON.parse(localStorage.getItem('products')) || []
    this.latestProducts = products.slice().reverse().slice(0, 12)
    this.bestSellers = products.filter(p => p.name.toLowerCase().includes('ultra') || p.price > 250000).slice(0, 8)
    this.discountedProducts = products.filter(p => p.price < 2000000).slice(0, 8)
  }
}
</script>

<style scoped>
.home-banner {
  max-height: 400px;
  object-fit: cover;
  transition: transform 0.4s;
}
.home-banner:hover {
  transform: scale(1.02);
}
.product-card-home {
  transition: box-shadow 0.3s, transform 0.3s;
}
.product-card-home:hover {
  box-shadow: 0 8px 32px rgba(80, 120, 255, 0.15);
  transform: translateY(-6px) scale(1.03);
}
.product-img-home {
  max-height: 220px;
  object-fit: cover;
  border-top-left-radius: 1.2rem;
  border-top-right-radius: 1.2rem;
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
@media (max-width: 768px) {
  .home-banner {
    max-height: 180px;
  }
  .product-img-home {
    max-height: 120px;
  }
}
.pagination .page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
}
</style>
