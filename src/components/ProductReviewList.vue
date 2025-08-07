<template>
  <div class="container mt-4">
    <h3 class="mb-4">⭐ Đánh giá sản phẩm: {{ productName }}</h3>

    <!-- Tổng quan đánh giá -->
    <div class="row mb-4">
      <div class="col-md-4">
        <div class="card text-center">
          <div class="card-body">
            <h2 class="text-warning">{{ averageRating.toFixed(1) }}</h2>
            <div class="rating-stars mb-2">{{ getStarDisplay(averageRating) }}</div>
            <p class="text-muted mb-0">{{ reviews.length }} đánh giá</p>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h6 class="card-title">Phân bố đánh giá</h6>
            <div v-for="star in 5" :key="star" class="d-flex align-items-center mb-2">
              <span class="me-2">{{ star }} ⭐</span>
              <div class="progress flex-grow-1 me-2" style="height: 10px;">
                <div 
                  class="progress-bar bg-warning" 
                  :style="{ width: getStarPercentage(star) + '%' }"
                ></div>
              </div>
              <small class="text-muted">{{ getStarCount(star) }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bộ lọc và sắp xếp -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="row align-items-center">
          <div class="col-md-3">
            <select v-model="filterRating" class="form-select">
              <option value="">Tất cả đánh giá</option>
              <option value="5">5 sao</option>
              <option value="4">4 sao</option>
              <option value="3">3 sao</option>
              <option value="2">2 sao</option>
              <option value="1">1 sao</option>
            </select>
          </div>
          <div class="col-md-3">
            <select v-model="sortBy" class="form-select">
              <option value="newest">Mới nhất</option>
              <option value="oldest">Cũ nhất</option>
              <option value="highest">Điểm cao nhất</option>
              <option value="lowest">Điểm thấp nhất</option>
            </select>
          </div>
          <div class="col-md-3">
            <div class="form-check">
              <input v-model="showWithImages" class="form-check-input" type="checkbox" id="withImages">
              <label class="form-check-label" for="withImages">
                Có hình ảnh
              </label>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-check">
              <input v-model="showRecommended" class="form-check-input" type="checkbox" id="recommended">
              <label class="form-check-label" for="recommended">
                Giới thiệu sản phẩm
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Danh sách đánh giá -->
    <div v-if="filteredReviews.length === 0" class="alert alert-info text-center">
      Chưa có đánh giá nào cho sản phẩm này.
    </div>

    <div v-else>
      <div v-for="review in paginatedReviews" :key="review.id" class="card mb-3">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div class="d-flex align-items-center gap-3">
              <div class="user-avatar">
                <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
                  {{ review.reviewerName.charAt(0).toUpperCase() }}
                </div>
              </div>
              <div>
                <h6 class="mb-1">{{ review.reviewerName }}</h6>
                <div class="d-flex align-items-center gap-2 mb-1">
                  <span class="rating-stars">{{ getStarDisplay(review.rating) }}</span>
                  <small class="text-muted">{{ formatDate(review.createdAt) }}</small>
                </div>
                <div v-if="review.wouldRecommend" class="text-success">
                  <small>✅ Giới thiệu sản phẩm này</small>
                </div>
              </div>
            </div>
            <span class="badge bg-success" v-if="review.status === 'published'">Đã duyệt</span>
          </div>

          <div class="review-content mb-3">
            <p class="mb-0">{{ review.comment }}</p>
          </div>

          <!-- Hình ảnh đánh giá -->
          <div v-if="review.images && review.images.length > 0" class="review-images mb-3">
            <div class="d-flex gap-2 flex-wrap">
              <img 
                v-for="(img, index) in review.images" 
                :key="index"
                :src="img" 
                alt="" 
                style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px; cursor: pointer;"
                @click="openImageModal(img)"
              />
            </div>
          </div>

          <!-- Thông tin đơn hàng -->
          <div class="text-muted">
            <small>Đơn hàng: #{{ review.orderId }}</small>
          </div>
        </div>
      </div>

      <!-- Phân trang -->
      <nav v-if="totalPages > 1" aria-label="Review pagination">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" @click="changePage(currentPage - 1)">Trước</a>
          </li>
          <li 
            v-for="page in totalPages" 
            :key="page"
            class="page-item" 
            :class="{ active: page === currentPage }"
          >
            <a class="page-link" @click="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" @click="changePage(currentPage + 1)">Sau</a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Modal xem ảnh -->
    <div class="modal fade" id="imageModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Hình ảnh đánh giá</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body text-center">
            <img :src="selectedImage" alt="" class="img-fluid" style="max-height: 500px;" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductReviewList',
  props: {
    productId: {
      type: [String, Number],
      required: true
    },
    productName: {
      type: String,
      default: 'Sản phẩm'
    }
  },
  data() {
    return {
      reviews: [],
      filterRating: '',
      sortBy: 'newest',
      showWithImages: false,
      showRecommended: false,
      currentPage: 1,
      perPage: 5,
      selectedImage: null
    }
  },
  computed: {
    publishedReviews() {
      return this.reviews.filter(review => review.status === 'published')
    },
    filteredReviews() {
      let filtered = this.publishedReviews

      // Lọc theo rating
      if (this.filterRating) {
        filtered = filtered.filter(review => review.rating == this.filterRating)
      }

      // Lọc theo hình ảnh
      if (this.showWithImages) {
        filtered = filtered.filter(review => review.images && review.images.length > 0)
      }

      // Lọc theo giới thiệu
      if (this.showRecommended) {
        filtered = filtered.filter(review => review.wouldRecommend)
      }

      // Sắp xếp
      switch (this.sortBy) {
        case 'newest':
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          break
        case 'oldest':
          filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          break
        case 'highest':
          filtered.sort((a, b) => b.rating - a.rating)
          break
        case 'lowest':
          filtered.sort((a, b) => a.rating - b.rating)
          break
      }

      return filtered
    },
    paginatedReviews() {
      const start = (this.currentPage - 1) * this.perPage
      const end = start + this.perPage
      return this.filteredReviews.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.filteredReviews.length / this.perPage)
    },
    averageRating() {
      if (this.publishedReviews.length === 0) return 0
      const total = this.publishedReviews.reduce((sum, review) => sum + review.rating, 0)
      return total / this.publishedReviews.length
    }
  },
  methods: {
    loadReviews() {
      const allReviews = JSON.parse(localStorage.getItem('productReviews')) || []
      this.reviews = allReviews.filter(review => review.productId == this.productId)
    },
    getStarDisplay(rating) {
      const fullStars = Math.floor(rating)
      const hasHalfStar = rating % 1 >= 0.5
      let stars = '⭐'.repeat(fullStars)
      if (hasHalfStar) {
        stars += '✨'
      }
      return stars
    },
    getStarCount(star) {
      return this.publishedReviews.filter(review => review.rating === star).length
    },
    getStarPercentage(star) {
      if (this.publishedReviews.length === 0) return 0
      return (this.getStarCount(star) / this.publishedReviews.length) * 100
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
      }
    },
    openImageModal(imageSrc) {
      this.selectedImage = imageSrc
      const modal = new bootstrap.Modal(document.getElementById('imageModal'))
      modal.show()
    }
  },
  watch: {
    filteredReviews() {
      this.currentPage = 1
    }
  },
  mounted() {
    this.loadReviews()
  }
}
</script>

<style scoped>
.rating-stars {
  font-size: 16px;
  line-height: 1;
}

.review-content {
  line-height: 1.6;
}

.user-avatar {
  flex-shrink: 0;
}

.review-images img:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}

.page-link {
  cursor: pointer;
}

.progress {
  height: 8px;
}

.card {
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
