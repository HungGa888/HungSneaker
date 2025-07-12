<template>
  <div class="container my-5">
    <h2 class="mb-4 text-center text-primary">🔧 Trang quản lý</h2>

    <div class="row">
      <div class="col-md-3">
        <ul class="list-group">
          <li class="list-group-item" :class="{ active: tab === 'category' }" @click="tab = 'category'">📂 Quản lý thể loại</li>
          <li class="list-group-item" :class="{ active: tab === 'product' }" @click="tab = 'product'">🛒 Quản lý sản phẩm</li>
        </ul>
      </div>

      <div class="col-md-9">
        <CategoryManager v-if="tab === 'category'" />
        <ProductManager v-else />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CategoryManager from '../components/admin/CategoryManager.vue'
import ProductManager from '../components/admin/ProductManager.vue'

const tab = ref('category')
</script>
