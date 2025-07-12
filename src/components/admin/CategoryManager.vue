<template>
  <div>
    <h4>📂 Danh sách thể loại</h4>

    <form class="d-flex my-3" @submit.prevent="addCategory">
      <input v-model="newCategory" class="form-control me-2" placeholder="Thêm thể loại..." />
      <button class="btn btn-success">Thêm</button>
    </form>

    <ul class="list-group">
      <li v-for="(item, index) in categories" :key="index" class="list-group-item d-flex justify-content-between">
        <span>{{ item }}</span>
        <button class="btn btn-sm btn-danger" @click="deleteCategory(index)">Xóa</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const categories = ref([])
const newCategory = ref('')

function loadCategories() {
  categories.value = JSON.parse(localStorage.getItem('categories')) || []
}

function saveCategories() {
  localStorage.setItem('categories', JSON.stringify(categories.value))
}

function addCategory() {
  if (newCategory.value.trim() !== '') {
    categories.value.push(newCategory.value.trim())
    saveCategories()
    newCategory.value = ''
  }
}

function deleteCategory(index) {
  categories.value.splice(index, 1)
  saveCategories()
}

onMounted(() => {
  loadCategories()
})
</script>
