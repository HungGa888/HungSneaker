<template>
  <div class="container my-5" style="max-width: 500px;">
    <h2 class="text-center mb-4">Đổi mật khẩu</h2>

    <form @submit.prevent="handleChangePassword">
      <!-- Mật khẩu cũ -->
      <div class="mb-3">
        <label class="form-label">Mật khẩu hiện tại</label>
        <input
          type="password"
          v-model="form.oldPassword"
          class="form-control"
          required
        />
      </div>

      <!-- Mật khẩu mới -->
      <div class="mb-3">
        <label class="form-label">Mật khẩu mới</label>
        <input
          type="password"
          v-model="form.newPassword"
          class="form-control"
          required
        />
      </div>

      <!-- Xác nhận mật khẩu mới -->
      <div class="mb-3">
        <label class="form-label">Xác nhận mật khẩu mới</label>
        <input
          type="password"
          v-model="form.confirmPassword"
          class="form-control"
          required
        />
      </div>

      <!-- Thông báo -->
      <div v-if="message" class="alert" :class="alertClass" role="alert">
        {{ message }}
      </div>

      <!-- Nút -->
      <button type="submit" class="btn btn-primary w-100">
        Cập nhật mật khẩu
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const message = ref('')
const alertClass = ref('alert-success')

function handleChangePassword() {
  // 🔒 Validate mật khẩu mới
  if (form.value.newPassword !== form.value.confirmPassword) {
    message.value = '❌ Mật khẩu xác nhận không khớp.'
    alertClass.value = 'alert-danger'
    return
  }

  // 🧠 Giả lập thành công (sau này gọi API ở đây)
  // if (form.value.oldPassword !== '123456') { ... }

  message.value = '✅ Mật khẩu đã được cập nhật thành công!'
  alertClass.value = 'alert-success'

  // Reset form
  form.value.oldPassword = ''
  form.value.newPassword = ''
  form.value.confirmPassword = ''
}
</script>

