<template>
  <section class="py-5">
    <div class="container">
      <h1 class="text-center mb-5 text-uppercase text-primary fw-bold">Tin tức giày mới</h1>

      <div class="row g-4">
        <!-- Mẫu giày 1 -->
        <div class="col-md-4">
          <div class="card h-100 shadow-sm">
            <img
              src="https://static.nike.com/a/images/t_default/ba2f7bdc-48fd-4d1d-8c5f-67e5d6f726f2/air-max-dn-shoes-Bd5Fz9.png"
              class="card-img-top"
              alt="Nike Air Max DN"
            />
            <div class="card-body">
              <h5 class="card-title">Nike Air Max DN 2024</h5>
              <p class="card-text">
                Phiên bản mới nhất của dòng Air Max với công nghệ Dynamic Air độc quyền, mang lại cảm giác đàn hồi siêu mượt khi di chuyển. Phù hợp cho cả chạy bộ lẫn thời trang đường phố.
              </p>
            </div>
          </div>
        </div>

        <!-- Mẫu giày 2 -->
        <div class="col-md-4">
          <div class="card h-100 shadow-sm">
            <img
              src="https://assets.adidas.com/images/w_600,f_auto,q_auto/460d187e6f3143aeb7b3af1000bfae0d_9366/Ultraboost_Light_Shoes_Black_GW8336_01_standard.jpg"
              class="card-img-top"
              alt="Adidas Ultraboost Light"
            />
            <div class="card-body">
              <h5 class="card-title">Adidas Ultraboost Light</h5>
              <p class="card-text">
                Với trọng lượng nhẹ hơn 30% so với bản tiền nhiệm, Ultraboost Light là sự lựa chọn hoàn hảo cho những ai yêu thích cảm giác "bay" trên từng bước chân.
              </p>
            </div>
          </div>
        </div>

        <!-- Mẫu giày 3 -->
        <div class="col-md-4">
          <div class="card h-100 shadow-sm">
            <img
              src="https://media.converse.com/is/image/Converse/166800C_A_107X1?$native$"
              class="card-img-top"
              alt="Converse Run Star Hike"
            />
            <div class="card-body">
              <h5 class="card-title">Converse Run Star Hike</h5>
              <p class="card-text">
                Mẫu giày đế răng cưa độc đáo giúp nâng tầm phong cách cá tính. Kết hợp hoàn hảo giữa classic và hiện đại, phù hợp với giới trẻ yêu thời trang đường phố.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-5">
        <router-link to="/products" class="btn btn-outline-primary px-4">
          Xem thêm sản phẩm
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
// Không cần logic
</script>

<style scoped>
.card-title {
  color: #222;
  font-weight: bold;
}
.card-text {
  font-size: 15px;
}
</style>
