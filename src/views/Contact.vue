<template>
  <section class="py-5 bg-light">
    <div class="container">
      <h2 class="text-center text-primary fw-bold mb-4">Liên hệ với chúng tôi</h2>
      <p class="text-center text-muted mb-5">
        Nếu bạn có bất kỳ câu hỏi nào về sản phẩm, dịch vụ hoặc đơn hàng, hãy để lại thông tin. HungSneaker sẽ phản hồi sớm nhất có thể.
      </p>

      <div class="row">
        <!-- Thông tin liên hệ -->
        <div class="col-md-6 mb-4">
          <h5 class="fw-bold">Thông tin cửa hàng</h5>
          <p><i class="bi bi-geo-alt-fill me-2"></i>123 Đường Sneaker, Quận 1, TP.HCM</p>
          <p><i class="bi bi-envelope-fill me-2"></i>support@hungsneaker.vn</p>
          <p><i class="bi bi-telephone-fill me-2"></i>0909 123 456</p>
          <p><i class="bi bi-clock-fill me-2"></i>Thời gian làm việc: 9h - 21h (T2 - CN)</p>
          <div class="mt-4">
            <iframe
              class="w-100 rounded"
              height="250"
              frameborder="0"
              style="border:0"
              allowfullscreen
              loading="lazy"
              src="https://www.google.com/maps/embed/v1/place?q=123+Sneaker+Street,+Ho+Chi+Minh+City&key=YOUR_GOOGLE_MAPS_API_KEY"
            ></iframe>
          </div>
        </div>

        <!-- Form liên hệ -->
        <div class="col-md-6">
          <h5 class="fw-bold mb-3">Gửi tin nhắn</h5>
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label class="form-label">Họ và tên</label>
              <input v-model="form.name" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input v-model="form.email" type="email" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Nội dung</label>
              <textarea v-model="form.message" rows="5" class="form-control" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary w-100">Gửi liên hệ</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  message: ''
})

function submitForm() {
  alert(`Cảm ơn ${form.name} đã liên hệ! Chúng tôi sẽ phản hồi qua email: ${form.email}.`)
  // Reset form
  form.name = ''
  form.email = ''
  form.message = ''
}
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
