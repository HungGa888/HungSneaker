<template>
  <section class="h-100 gradient-form" style="background-color: #f8f9fa;">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-6 col-xl-5">
          <div class="card shadow-lg border-0">
            <div class="card-body px-4 py-5">
              <h3 class="text-center mb-4 text-primary">📝 Đăng ký tài khoản</h3>

              <form @submit.prevent="handleRegister">
                <div class="form-group mb-3">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    v-model="form.email"
                    class="form-control"
                    required
                  />
                </div>

                <div class="form-group mb-3">
                  <label for="password">Mật khẩu</label>
                  <input
                    type="password"
                    id="password"
                    v-model="form.password"
                    class="form-control"
                    minlength="6"
                    required
                  />
                </div>

                <div class="form-group mb-4">
                  <label for="confirmPassword">Xác nhận mật khẩu</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    v-model="form.confirmPassword"
                    class="form-control"
                    required
                  />
                </div>

                <button type="submit" class="btn btn-primary w-100">
                  Đăng ký
                </button>
              </form>

              <div class="text-center mt-4">
                <p>
                  Đã có tài khoản?
                  <router-link to="/login" class="text-decoration-none text-primary">
                    Đăng nhập
                  </router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      form: {
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    handleRegister() {
      const { email, password, confirmPassword } = this.form

      if (password !== confirmPassword) {
        alert('❗Mật khẩu xác nhận không khớp.')
        return
      }

      let users = JSON.parse(localStorage.getItem('users')) || []

      const exists = users.some(user => user.email === email)
      if (exists) {
        alert('❌ Email đã được đăng ký. Vui lòng dùng email khác.')
        return
      }

      users.push({ email, password })
      localStorage.setItem('users', JSON.stringify(users))

      alert('🎉 Đăng ký thành công! ')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 1rem;
}
</style>
