<script setup lang="ts">
import CategoryManager from '../components/admin/CategoryManager.vue';
import ProductManager from '../components/admin/ProductManager.vue';
import AdminVoucher from './AdminVoucher.vue';

</script>


<template>
  <div class="container mt-4">
    <h2 class="mb-4 text-primary text-center">Trang Quản Trị</h2>

    <div class="row g-4">
      <!-- Bảng thể loại -->
      <div class="col-md-4">
        <div class="admin-box border rounded p-3 bg-light">
          <h5 class="text-success mb-3">🧩 Quản lý thể loại</h5>
          <div class="scroll-area">
            <CategoryManager />
          </div>
        </div>
      </div>

      <!-- Bảng sản phẩm -->
      <div class="col-md-8">
        <div class="admin-box border rounded p-3 bg-light">
          <h5 class="text-info mb-3">🛍️ Quản lý sản phẩm</h5>
          <div class="scroll-area">
            <ProductManager />
          </div>
        </div>
      </div>

      <!-- Khu vực quản lý voucher -->
      <div class="col-md-12 mt-4">
        <div class="admin-box border rounded p-3 bg-light">
          <h5 class="text-warning mb-3">🎁 Quản lý mã giảm giá (Voucher)</h5>
          <div class="scroll-area">
            <AdminVoucher />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.container {
  max-width: 100%;
}

/* Box cố định chiều cao để bảng không tràn màn hình */
.admin-box {
  height: 600px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Khu vực nội dung có thể cuộn */
.scroll-area {
  overflow-y: auto;
  flex-grow: 1;
  max-height: 520px;
}

/* Cho table đẹp hơn trong khung */
.scroll-area table {
  font-size: 0.95rem;
}
</style>

