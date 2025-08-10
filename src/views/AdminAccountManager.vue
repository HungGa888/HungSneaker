<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="text-primary">👥 Quản lý tài khoản</h3>
      <button class="btn btn-success" @click="showAddForm = true">
        <i class="fas fa-plus"></i> Thêm tài khoản
      </button>
    </div>

    <!-- Form thêm/sửa tài khoản -->
    <div v-if="showAddForm || editingAccount" class="card mb-4">
      <div class="card-header">
        <h5 class="mb-0">{{ editingAccount ? 'Sửa tài khoản' : 'Thêm tài khoản mới' }}</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="saveAccount">
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="email" class="form-label">Email *</label>
                <input 
                  v-model="accountForm.email" 
                  type="email" 
                  class="form-control" 
                  id="email" 
                  required 
                  :disabled="editingAccount"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label for="fullName" class="form-label">Họ và tên *</label>
                <input 
                  v-model="accountForm.fullName" 
                  type="text" 
                  class="form-control" 
                  id="fullName" 
                  required 
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="password" class="form-label">Mật khẩu *</label>
                <input 
                  v-model="accountForm.password" 
                  type="password" 
                  class="form-control" 
                  id="password" 
                  :required="!editingAccount"
                  :placeholder="editingAccount ? 'Để trống nếu không đổi mật khẩu' : ''"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label for="role" class="form-label">Vai trò *</label>
                <select v-model="accountForm.role" class="form-select" id="role" required>
                  <option value="user">Người dùng</option>
                  <option value="staff">Nhân viên</option>
                  <option value="admin">Quản trị viên</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="phone" class="form-label">Số điện thoại</label>
                <input 
                  v-model="accountForm.phone" 
                  type="tel" 
                  class="form-control" 
                  id="phone" 
                  placeholder="0xxxxxxxxx"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label for="status" class="form-label">Trạng thái *</label>
                <select v-model="accountForm.status" class="form-select" id="status" required>
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Tạm khóa</option>
                </select>
              </div>
            </div>
          </div>
          <div class="d-flex gap-2">
            <button type="submit" class="btn btn-primary">
              {{ editingAccount ? 'Cập nhật' : 'Thêm mới' }}
            </button>
            <button type="button" class="btn btn-secondary" @click="cancelForm">Hủy</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Bảng danh sách tài khoản -->
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Danh sách tài khoản</h5>
        <div class="d-flex gap-2">
          <input 
            v-model="searchTerm" 
            type="text" 
            class="form-control" 
            placeholder="Tìm kiếm theo email hoặc tên..." 
            style="width: 250px;"
          />
          <select v-model="filterRole" class="form-select" style="width: 150px;">
            <option value="">Tất cả vai trò</option>
            <option value="user">Người dùng</option>
            <option value="staff">Nhân viên</option>
            <option value="admin">Quản trị viên</option>
          </select>
        </div>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>STT</th>
                <th>Email</th>
                <th>Họ và tên</th>
                <th>Số điện thoại</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(account, index) in filteredAccounts" :key="account.email">
                <td>{{ index + 1 }}</td>
                <td>{{ account.email }}</td>
                <td>{{ account.fullName }}</td>
                <td>{{ account.phone || 'Chưa cập nhật' }}</td>
                <td>
                  <span :class="account.role === 'admin' ? 'badge bg-danger' : account.role === 'staff' ? 'badge bg-warning' : 'badge bg-info'">
                    {{ account.role === 'admin' ? 'Quản trị viên' : account.role === 'staff' ? 'Nhân viên' : 'Người dùng' }}
                  </span>
                </td>
                <td>
                  <span :class="account.status === 'active' ? 'badge bg-success' : 'badge bg-warning'">
                    {{ account.status === 'active' ? 'Hoạt động' : 'Tạm khóa' }}
                  </span>
                </td>
                <td>{{ formatDate(account.createdAt) }}</td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" @click="editAccount(account)">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button 
                      class="btn btn-outline-warning" 
                      @click="toggleAccountStatus(account)"
                      :title="account.status === 'active' ? 'Khóa tài khoản' : 'Kích hoạt tài khoản'"
                    >
                      <i :class="account.status === 'active' ? 'fas fa-lock' : 'fas fa-unlock'"></i>
                    </button>
                    <button class="btn btn-outline-danger" @click="deleteAccount(account.email)">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="filteredAccounts.length === 0" class="text-center py-4 text-muted">
          Không tìm thấy tài khoản nào
        </div>
      </div>
    </div>

    <!-- Thống kê -->
    <div class="row mt-4">
      <div class="col-md-3">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title text-primary">{{ accounts.length }}</h5>
            <p class="card-text">Tổng tài khoản</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title text-success">{{ activeAccounts }}</h5>
            <p class="card-text">Đang hoạt động</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title text-warning">{{ inactiveAccounts }}</h5>
            <p class="card-text">Tạm khóa</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title text-danger">{{ adminAccounts }}</h5>
            <p class="card-text">Quản trị viên</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title text-warning">{{ staffAccounts }}</h5>
            <p class="card-text">Nhân viên</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminAccountManager',
  data() {
    return {
      accounts: [],
      showAddForm: false,
      editingAccount: null,
      searchTerm: '',
      filterRole: '',
      accountForm: {
        email: '',
        fullName: '',
        password: '',
        phone: '',
        role: 'user',
        status: 'active'
      }
    }
  },
  computed: {
    filteredAccounts() {
      let filtered = this.accounts

      // Lọc theo từ khóa tìm kiếm
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase()
        filtered = filtered.filter(account => 
          account.email.toLowerCase().includes(term) ||
          account.fullName.toLowerCase().includes(term)
        )
      }

      // Lọc theo vai trò
      if (this.filterRole) {
        filtered = filtered.filter(account => account.role === this.filterRole)
      }

      return filtered
    },
    activeAccounts() {
      return this.accounts.filter(account => account.status === 'active').length
    },
    inactiveAccounts() {
      return this.accounts.filter(account => account.status === 'inactive').length
    },
    adminAccounts() {
      return this.accounts.filter(account => account.role === 'admin').length
    },
    staffAccounts() {
      return this.accounts.filter(account => account.role === 'staff').length
    }
  },
  methods: {
    loadAccounts() {
      // Lấy danh sách người dùng từ localStorage
      const users = JSON.parse(localStorage.getItem('users')) || []
      this.accounts = users.map(user => ({
        ...user,
        status: user.status || 'active',
        createdAt: user.createdAt || new Date().toISOString()
      }))
    },
    saveAccounts() {
      localStorage.setItem('users', JSON.stringify(this.accounts))
    },
    saveAccount() {
      if (this.editingAccount) {
        // Cập nhật tài khoản
        const index = this.accounts.findIndex(acc => acc.email === this.editingAccount.email)
        if (index !== -1) {
          this.accounts[index] = {
            ...this.accounts[index],
            fullName: this.accountForm.fullName,
            phone: this.accountForm.phone,
            role: this.accountForm.role,
            status: this.accountForm.status
          }
          
          // Cập nhật mật khẩu nếu có nhập
          if (this.accountForm.password.trim()) {
            this.accounts[index].password = this.accountForm.password
          }
        }
        alert('Cập nhật tài khoản thành công!')
      } else {
        // Thêm tài khoản mới
        const existingAccount = this.accounts.find(acc => acc.email === this.accountForm.email)
        if (existingAccount) {
          alert('Email này đã tồn tại!')
          return
        }

        const newAccount = {
          ...this.accountForm,
          createdAt: new Date().toISOString()
        }
        this.accounts.push(newAccount)
        alert('Thêm tài khoản thành công!')
      }

      this.saveAccounts()
      this.cancelForm()
    },
    editAccount(account) {
      this.editingAccount = account
      this.accountForm = {
        email: account.email,
        fullName: account.fullName,
        password: '',
        phone: account.phone || '',
        role: account.role,
        status: account.status
      }
      this.showAddForm = false
    },
    cancelForm() {
      this.showAddForm = false
      this.editingAccount = null
      this.accountForm = {
        email: '',
        fullName: '',
        password: '',
        phone: '',
        role: 'user',
        status: 'active'
      }
    },
    toggleAccountStatus(account) {
      const newStatus = account.status === 'active' ? 'inactive' : 'active'
      const index = this.accounts.findIndex(acc => acc.email === account.email)
      if (index !== -1) {
        this.accounts[index].status = newStatus
        this.saveAccounts()
        alert(`Đã ${newStatus === 'active' ? 'kích hoạt' : 'khóa'} tài khoản ${account.email}`)
      }
    },
    deleteAccount(email) {
      if (confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
        const index = this.accounts.findIndex(acc => acc.email === email)
        if (index !== -1) {
          this.accounts.splice(index, 1)
          this.saveAccounts()
          alert('Đã xóa tài khoản thành công!')
        }
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('vi-VN')
    }
  },
  mounted() {
    this.loadAccounts()
  }
}
</script>

<style scoped>
.table-responsive {
  max-height: 500px;
  overflow-y: auto;
}

.btn-group-sm .btn {
  padding: 0.25rem 0.5rem;
}

.badge {
  font-size: 0.75em;
}

.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}
</style>
