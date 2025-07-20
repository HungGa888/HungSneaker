<template>
  <section class="h-100 gradient-form" style="background-color: #f8f9fa;">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-6 col-xl-5">
          <div class="card shadow-lg border-0">
            <div class="card-body px-4 py-5">
              <h3 class="text-center mb-4 text-primary">🔐 Đăng nhập tài khoản</h3>

              <form @submit.prevent="handleLogin">
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
                    required
                  />
                </div>

                <div class="form-check mb-3">
                  <input
                    type="checkbox"
                    id="remember"
                    class="form-check-input"
                    v-model="form.remember"
                  />
                  <label class="form-check-label" for="remember">Ghi nhớ đăng nhập</label>
                </div>

                <button type="submit" class="btn btn-primary w-100">Đăng nhập</button>
              </form>

              <div class="text-center mt-4">
                <p>
                  Chưa có tài khoản?
                  <router-link to="/register" class="text-decoration-none text-primary">
                    Đăng ký
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
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: '',
        remember: false
      }
    }
  },
  mounted() {
    const remembered = JSON.parse(localStorage.getItem('loggedInUser'))
    if (remembered) {
      this.form.email = remembered.email
      this.form.remember = true
    }
  },
  methods: {
    handleLogin() {
      const users = JSON.parse(localStorage.getItem('users')) || []

      const user = users.find(
        u => u.email === this.form.email && u.password === this.form.password
      )

      const isAdmin = this.form.email === 'admin@gmail.com' && this.form.password === '123456'

      if (user || isAdmin) {
        alert('🎉 Đăng nhập thành công!')

        const loggedInUser = {
          email: this.form.email,
          name: user ? user.name : 'Admin'
        }

        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))

        this.$router.push('/')
      } else {
        alert('❌ Sai thông tin đăng nhập! Vui lòng thử lại')
      }
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 1rem;
}
</style>
