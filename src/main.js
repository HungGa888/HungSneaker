import { createApp } from 'vue'
import App from './App.vue'


// ✅ Import Bootstrap CSS & JS (chỉ cần dùng bootstrap gốc)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css';

// ✅ Cài Vuex
import { createStore } from 'vuex'
import router from './router/router'


const store = createStore({
  state() {
    return {
      products: [] // Danh sách sản phẩm
    }
  },
  mutations: {
    setProducts(state, productList) {
      state.products = productList
    },
    addProduct(state, product) {
      state.products.push(product)
    },
    updateProduct(state, updatedProduct) {
      const index = state.products.findIndex(p => p.id === updatedProduct.id)
      if (index !== -1) {
        state.products[index] = updatedProduct
      }
    },
    deleteProduct(state, id) {
      state.products = state.products.filter(p => p.id !== id)
    }
  },
  actions: {
    setProducts({ commit }, productList) {
      commit('setProducts', productList)
    },
    addProduct({ commit }, product) {
      commit('addProduct', product)
    },
    updateProduct({ commit }, updatedProduct) {
      commit('updateProduct', updatedProduct)
    },
    deleteProduct({ commit }, id) {
      commit('deleteProduct', id)
    }
  }
})

// ✅ Khởi tạo ứng dụng Vue
const app = createApp(App)

app.use(router)  // Sử dụng Vue Router
app.use(store)   // Sử dụng Vuex Store

app.mount('#app') // Mount ứng dụng
