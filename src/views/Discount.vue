<template>
  <section class="py-5 bg-white">
    <div class="container">
      <h1 class="text-center text-primary fw-bold mb-4 text-uppercase">
        Ưu đãi & Khuyến mãi đặc biệt
      </h1>

      <p class="text-center text-muted mb-5">
        Tổng hợp các chương trình khuyến mãi HOT nhất tại HungSneaker dành cho bạn.
        Đừng bỏ lỡ cơ hội mua sắm siêu tiết kiệm và nhận quà hấp dẫn!
      </p>

      <!-- Gọi đúng component -->
      <Discount />
    </div>
  </section>
</template>

<script setup>
import Discount from '@/components/Discount.vue';


</script>

<style scoped>
h1 {
  font-size: 2.2rem;
}
</style>
