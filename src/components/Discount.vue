<template>
  <section class="py-3">
    <div class="row g-4">
      <div
        class="col-md-4"
        v-for="(promo, index) in promotions"
        :key="index"
      >
        <div class="card h-100 shadow-sm text-center border-0">
          <div class="card-body">
            <div class="display-4 mb-3">{{ promo.icon }}</div>
            <h5 class="card-title text-dark fw-bold">{{ promo.title }}</h5>
            <p class="card-text text-muted">{{ promo.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const promotions = [
  {
    icon: '🔥',
    title: 'Box Hot Sale',
    description: 'Giảm sốc lên đến 70% cho các mẫu giày hot nhất tháng này.'
  },
  {
    icon: '🎁',
    title: 'Box Ưu Đãi',
    description: 'Săn hàng hiệu giá rẻ mỗi ngày - số lượng có hạn.'
  },
  {
    icon: '🏷️',
    title: 'Box Promotion',
    description: 'Mua 1 tặng 1, giảm giá kèm phụ kiện cực chất.'
  },
  {
    icon: '👑',
    title: 'Box Exclusive',
    description: 'Ưu đãi chỉ dành riêng cho thành viên VIP.'
  },
  {
    icon: '🤝',
    title: 'Ưu đãi đối tác',
    description: 'Giảm thêm 15% khi mua hàng qua đối tác liên kết.'
  },
  {
    icon: '💳',
    title: 'Ưu đãi thẻ ngân hàng',
    description: 'Giảm đến 20% cho chủ thẻ Visa/Master tại các ngân hàng liên kết.'
  },
  {
    icon: '🎉',
    title: 'Mở thẻ nhận quà',
    description: 'Đăng ký mở thẻ ngay – nhận voucher mua sắm trị giá 200.000đ.'
  },
  {
    icon: '🕐',
    title: 'Mua trước trả sau',
    description: 'Thanh toán linh hoạt qua Fundiin, Kredivo, và các đối tác tài chính.'
  },
  {
    icon: '💰',
    title: 'Ưu đãi ví điện tử',
    description: 'Giảm thêm 10% khi thanh toán bằng Momo, ZaloPay, VNPay,...'
  }
]
</script>

<style scoped>
.card:hover {
  transform: translateY(-5px);
  transition: 0.3s;
  box-shadow: 0 0 15px rgba(0, 123, 255, 0.2);
}
</style>
