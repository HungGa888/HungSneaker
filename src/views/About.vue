<template>
  <section class="py-5 bg-light">
    <div class="container">
      <h1 class="text-center mb-4">Về HungSneaker</h1>

      <div class="row align-items-center mb-5">
        <div class="col-md-6">
          <img
            src="D:/SOF308/vue-ASM2/src/Image/Vua_cat_lo.png"
            class="img-fluid rounded shadow-sm"
            alt="Giới thiệu HungSneaker"
          />
        </div>
        <div class="col-md-6">
          <h3 class="text-primary">Chúng tôi là ai?</h3>
          <p>
            <strong>HungSneaker</strong> là một thương hiệu trẻ trung, năng động chuyên cung cấp các mẫu giày sneaker chính hãng chất lượng cao cho giới trẻ Việt Nam. Chúng tôi không chỉ là một cửa hàng bán giày, mà còn là nơi lan tỏa phong cách sống cá tính, hiện đại và đậm chất riêng.
          </p>
          <p>
            Với đội ngũ nhân viên nhiệt huyết, am hiểu xu hướng thời trang, HungSneaker luôn không ngừng cập nhật những sản phẩm mới nhất, từ các bộ sưu tập giới hạn đến những mẫu giày đang làm mưa làm gió trên thị trường quốc tế. Dù bạn là người yêu thích sự năng động của Nike, sự phá cách của Adidas, hay sự thanh lịch của Puma và Converse – chúng tôi đều có những lựa chọn phù hợp cho bạn.
          </p>
          <p>
            Không dừng lại ở việc bán hàng, HungSneaker đặt trọng tâm vào trải nghiệm khách hàng: từ việc tư vấn chọn size phù hợp, hướng dẫn bảo quản giày đúng cách cho đến các chương trình hậu mãi, bảo hành chính hãng. Đối với chúng tôi, mỗi đôi giày không chỉ là một sản phẩm – đó là người bạn đồng hành, thể hiện cá tính và câu chuyện của bạn trên mỗi bước chân.
          </p>
          <p>
            Hãy đến với <strong>HungSneaker</strong> để không chỉ "mua giày" – mà còn "chọn phong cách" cho riêng mình.
          </p>
        </div>
      </div>

      <div class="row text-center">
        <div class="col-md-4 mb-4">
          <i class="bi bi-truck display-4 text-success mb-3"></i>
          <h5>Giao hàng toàn quốc</h5>
          <p>Miễn phí vận chuyển với đơn hàng từ 499.000đ.</p>
        </div>
        <div class="col-md-4 mb-4">
          <i class="bi bi-shield-check display-4 text-info mb-3"></i>
          <h5>Cam kết chính hãng</h5>
          <p>100% sản phẩm được nhập trực tiếp từ nhà phân phối uy tín.</p>
        </div>
        <div class="col-md-4 mb-4">
          <i class="bi bi-emoji-smile display-4 text-warning mb-3"></i>
          <h5>Khách hàng thân thiết</h5>
          <p>Ưu đãi thành viên – tích điểm đổi quà siêu hấp dẫn!</p>
        </div>
      </div>

      <div class="text-center mt-5">
        <router-link to="/products" class="btn btn-outline-primary px-4">
          Khám phá giày mới nhất
        </router-link>
      </div>

      <!-- Section sản phẩm nổi bật -->
      <div class="row mt-5">
        <h2 class="text-center mb-4 text-primary">Sản phẩm nổi bật</h2>
        <div class="col-md-3 mb-4" v-for="product in featuredProducts" :key="product.id">
          <div class="card h-100 shadow-sm">
            <img :src="product.image" class="card-img-top" :alt="product.name" style="max-height:180px;object-fit:cover;">
            <div class="card-body">
              <h6 class="fw-bold">{{ product.name }}</h6>
              <p class="text-danger mb-2">{{ product.price.toLocaleString() }} đ</p>
              <router-link :to="`/product/${product.id}`" class="btn btn-outline-primary btn-sm" target="_blank">Xem chi tiết</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const featuredProducts = ref([])
onMounted(() => {
  const products = JSON.parse(localStorage.getItem('products')) || []
  featuredProducts.value = products.slice(-4).reverse()
})
</script>

<style scoped>
/* Tùy chỉnh thêm nếu bạn muốn hiệu ứng đẹp hơn */
</style>