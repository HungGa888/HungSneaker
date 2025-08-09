import { createRouter, createWebHistory } from 'vue-router'

// Import các trang (views)
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ChangePassword from '../views/ChangePassword.vue'
import About from '../views/About.vue'
import News from '../views/News.vue'
import Contact from '../views/Contact.vue'
import Cart from '../views/Cart.vue'
import Discount from '../views/Discount.vue'
import HistoryOrder from '../views/HistoryOrder.vue'
import ProductList from '../views/ProductList.vue'
import Product from '../views/Product.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Admin from '../views/Admin.vue' 
import AdminOrderApproval from '../views/AdminOrderApproval.vue'
import AdminRevenue from '../views/AdminRevenue.vue'
import SizeGuide from '../views/SizeGuide.vue'
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/change-password', name: 'ChangePassword', component: ChangePassword },
  { path: '/about', name: 'About', component: About },
  { path: '/news', name: 'News', component: News },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/discount', name: 'Discount', component: Discount },
  { path: '/order-history', name: 'OrderHistory', component: HistoryOrder },
  { path: '/products', name: 'ProductList', component: ProductList },
  { path: '/product/:id', name: 'ProductDetail', component: Product },
  { path: '/product/:id', name: 'ProductDetail', component: ProductDetail },
  { path: '/admin', name: 'Admin', component: Admin }, 
  { path: '/admin/orders', name: 'AdminOrders', component: AdminOrderApproval },
  { path: '/admin/revenue', name: 'AdminRevenue', component: AdminRevenue },
  { path: '/size-guide', name: 'SizeGuide', component: SizeGuide },
  
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
