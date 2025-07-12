<template>
  <div class="container py-4">
    <h4 class="mb-4">🛒 Quản lý sản phẩm</h4>

    <!-- Form thêm sản phẩm -->
    <form class="row g-2 mb-4" @submit.prevent="addProduct">
      <div class="col-md-3">
        <input v-model="form.name" class="form-control" placeholder="Tên sản phẩm" required />
      </div>
      <div class="col-md-2">
        <input v-model.number="form.price" class="form-control" placeholder="Giá" type="number" required />
      </div>
      <div class="col-md-2">
        <select v-model="form.category" class="form-select" required>
          <option disabled value="">Chọn thể loại</option>
          <option v-for="(c, i) in categories" :key="i">{{ c }}</option>
        </select>
      </div>
      <div class="col-md-3">
        <input v-model="form.image" class="form-control" placeholder="URL ảnh" />
        <input type="file" class="form-control" @change="handleFileUpload" />
      </div>
      <div v-if="form.image" class="mt-2">
  <img :src="form.image" alt="Preview" width="100" class="img-thumbnail" />
</div>
      <div class="col-md-2">
        <input v-model="form.detail" class="form-control" placeholder="Chi tiết" />
      </div>
      <div class="col-12 text-end">
        <button class="btn btn-primary">Thêm sản phẩm</button>
      </div>
    </form>

    <!-- Danh sách sản phẩm -->
    <table class="table table-bordered table-striped">
      <thead class="table-light">
        <tr>
          <th>Hình</th>
          <th>Tên</th>
          <th>Giá</th>
          <th>Thể loại</th>
          <th>Chi tiết</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p, i) in products" :key="i">
          <td>
            <img :src="p.image" width="60" height="60" v-if="!editingIndex(i)" />
            <input v-else v-model="editForm.image" class="form-control" />
          </td>
          <td v-if="editingIndex(i)">
            <input v-model="editForm.name" class="form-control" />
          </td>
          <td v-else>{{ p.name }}</td>

          <td v-if="editingIndex(i)">
            <input v-model.number="editForm.price" type="number" class="form-control" />
          </td>
          <td v-else>{{ p.price.toLocaleString() }} đ</td>

          <td v-if="editingIndex(i)">
            <select v-model="editForm.category" class="form-select">
              <option v-for="(c, j) in categories" :key="j">{{ c }}</option>
            </select>
          </td>
          <td v-else>{{ p.category }}</td>

          <td v-if="editingIndex(i)">
            <input v-model="editForm.detail" class="form-control" />
          </td>
          <td v-else>{{ p.detail }}</td>

          <td>
            <div v-if="editingIndex(i)">
              <button class="btn btn-sm btn-success me-1" @click="saveEdit(i)">Lưu</button>
              <button class="btn btn-sm btn-secondary" @click="cancelEdit">Hủy</button>
            </div>
            <div v-else>
              <button class="btn btn-sm btn-warning me-1" @click="startEdit(i)">Sửa</button>
              <button class="btn btn-sm btn-danger" @click="deleteProduct(i)">Xóa</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const categories = ref([])
const products = ref([])

const form = ref({
  name: '',
  price: 0,
  category: '',
  image: '',
  detail: ''
})

const editForm = ref({})
const editing = ref(null)

function load() {
  categories.value = JSON.parse(localStorage.getItem('categories')) || []
  products.value = JSON.parse(localStorage.getItem('products')) || []
}

function save() {
  localStorage.setItem('products', JSON.stringify(products.value))
}

function addProduct() {
  if (!form.value.name || !form.value.price || !form.value.category) return
  products.value.push({ ...form.value })
  save()
  form.value = { name: '', price: 0, category: '', image: '', detail: '' }
}

function deleteProduct(index) {
  if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
    products.value.splice(index, 1)
    save()
  }
}

function startEdit(index) {
  editing.value = index
  editForm.value = { ...products.value[index] }
}

function cancelEdit() {
  editing.value = null
  editForm.value = {}
}

function saveEdit(index) {
  products.value[index] = { ...editForm.value }
  save()
  cancelEdit()
}

function editingIndex(index) {
  return editing.value === index
}
function handleFileUpload(event) {
  const file = event.target.files[0]
  if (file) {
    form.value.image = URL.createObjectURL(file)
  }
}


onMounted(load)
</script>
