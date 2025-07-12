<template>
  <footer class="bg-dark text-light pt-5 pb-3 mt-auto">
    <div class="container">
      <div class="row">

        <!-- Cột 1: Thông tin cửa hàng -->
        <div class="col-md-4 mb-4">
          <h5 class="text-uppercase fw-bold">HungSneaker</h5>
          <p>
            Cửa hàng giày chính hãng, phong cách và thời thượng. Cam kết hàng chất lượng, giao hàng nhanh chóng trên toàn quốc.
          </p>
        </div>

        <!-- Cột 2: Liên kết nhanh -->
        <div class="col-md-4 mb-4">
          <h6 class="text-uppercase fw-bold">Liên kết</h6>
          <ul class="list-unstyled">
            <li><router-link to="/about" class="text-light text-decoration-none">Giới thiệu</router-link></li>
            <li><router-link to="/products" class="text-light text-decoration-none">Tất cả sản phẩm</router-link></li>
            <li><router-link to="/news" class="text-light text-decoration-none">Tin tức</router-link></li>
            <li><router-link to="/contact" class="text-light text-decoration-none">Liên hệ</router-link></li>
            <li><router-link to="/cart" class="text-light text-decoration-none">Giỏ hàng</router-link></li>
          </ul>
        </div>

        <!-- Cột 3: Thông tin & mạng xã hội -->
        <div class="col-md-4 mb-4">
          <h6 class="text-uppercase fw-bold">Liên hệ</h6>
          <p class="mb-1"><i class="bi bi-geo-alt-fill me-2"></i>123 Đường Sneaker, Quận 1, TP.HCM</p>
          <p class="mb-1"><i class="bi bi-envelope-fill me-2"></i>contact@hungsneaker.vn</p>
          <p class="mb-3"><i class="bi bi-telephone-fill me-2"></i>0909 123 456</p>

          <h6 class="text-uppercase fw-bold">Kết nối</h6>
          <div class="d-flex gap-3 fs-5">
            <a href="#" class="text-light"><i class="bi bi-facebook"></i></a>
            <a href="#" class="text-light"><i class="bi bi-instagram"></i></a>
            <a href="#" class="text-light"><i class="bi bi-youtube"></i></a>
          </div>
        </div>

      </div>

      <hr class="border-light" />

      <div class="text-center">
        <small>&copy; {{ new Date().getFullYear() }} HungSneaker. All rights reserved.</small>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Không cần JS logic cho footer tĩnh, nhưng bạn có thể thêm nếu cần
</script>

<style scoped>
footer a:hover {
  text-decoration: underline;
}
</style>
