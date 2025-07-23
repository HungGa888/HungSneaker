<template>
  <div class="container py-5">
    <h2 class="mb-4 text-primary">Quản lý mã giảm giá (Voucher)</h2>
    <form class="row g-3 mb-4" @submit.prevent="addOrUpdateVoucher">
      <div class="col-md-4">
        <input v-model="newVoucher.code" type="text" class="form-control" placeholder="Mã giảm giá (VD: GIAM10)" required />
      </div>
      <div class="col-md-4">
        <input v-model.number="newVoucher.value" type="number" class="form-control" placeholder="Giá trị giảm (VNĐ)" required min="1" />
      </div>
      <div class="col-md-4 d-flex gap-2">
        <button class="btn btn-success w-100" type="submit">{{ editIndex === -1 ? 'Thêm mã' : 'Cập nhật' }}</button>
        <button v-if="editIndex !== -1" class="btn btn-secondary w-100" type="button" @click="cancelEdit">Hủy</button>
      </div>
    </form>
    <table class="table table-bordered align-middle">
      <thead class="table-light text-center">
        <tr>
          <th>Mã giảm giá</th>
          <th>Giá trị giảm</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(voucher, idx) in vouchers" :key="voucher.code" class="text-center">
          <td>{{ voucher.code }}</td>
          <td>{{ voucher.value.toLocaleString() }} đ</td>
          <td>
            <button class="btn btn-warning btn-sm me-2" @click="editVoucher(idx)">Sửa</button>
            <button class="btn btn-danger btn-sm" @click="removeVoucher(idx)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const vouchers = ref([])
const newVoucher = ref({ code: '', value: 0 })
const editIndex = ref(-1)

function loadVouchers() {
  vouchers.value = JSON.parse(localStorage.getItem('vouchers') || '[]')
}

function saveVouchers() {
  localStorage.setItem('vouchers', JSON.stringify(vouchers.value))
}

function addOrUpdateVoucher() {
  const code = newVoucher.value.code.trim().toUpperCase()
  const value = Number(newVoucher.value.value)
  if (!code || value <= 0) return
  if (editIndex.value === -1) {
    if (vouchers.value.some(v => v.code === code)) {
      alert('Mã giảm giá đã tồn tại!')
      return
    }
    vouchers.value.push({ code, value })
  } else {
    vouchers.value[editIndex.value] = { code, value }
    editIndex.value = -1
  }
  saveVouchers()
  newVoucher.value = { code: '', value: 0 }
}

function editVoucher(idx) {
  newVoucher.value = { ...vouchers.value[idx] }
  editIndex.value = idx
}

function cancelEdit() {
  newVoucher.value = { code: '', value: 0 }
  editIndex.value = -1
}

function removeVoucher(idx) {
  vouchers.value.splice(idx, 1)
  saveVouchers()
  cancelEdit()
}

onMounted(loadVouchers)
</script>

<style scoped>
.table th, .table td { vertical-align: middle; }
</style>
