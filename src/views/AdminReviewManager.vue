<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="text-primary">⭐ Quản lý đánh giá sản phẩm</h3>
      <div class="d-flex gap-2">
        <select v-model="filterStatus" class="form-select" style="width: 150px;">
          <option value="">Tất cả trạng thái</option>
          <option value="published">Đã duyệt</option>
          <option value="pending">Chờ duyệt</option>
          <option value="rejected">Từ chối</option>
        </select>
        <select v-model="filterRating" class="form-select" style="width: 150px;">
          <option value="">Tất cả sao</option>
          <option value="5">5 sao</option>
          <option value="4">4 sao</option>
          <option value="3">3 sao</option>
          <option value="2">2 sao</option>
          <option value="1">1 sao</option>
        </select>
      </div>
    </div>

    <!-- Thống kê tổng quan -->
    <div class="row mb-4">
      <div class="col-md-3">
        <div class="card text-center bg-primary text-white">
          <div class="card-body">
            <h5 class="card-title">{{ reviews.length }}</h5>
            <p class="card-text">Tổng đánh giá</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-center bg-success text-white">
          <div class="card-body">
            <h5 class="card-title">{{ publishedReviews }}</h5>
            <p class="card-text">Đã duyệt</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-center bg-warning text-white">
          <div class="card-body">
            <h5 class="card-title">{{ pendingReviews }}</h5>
            <p class="card-text">Chờ duyệt</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-center bg-info text-white">
          <div class="card-body">
            <h5 class="card-title">{{ averageRating.toFixed(1) }}</h5>
            <p class="card-text">Điểm TB</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Danh sách đánh giá -->
    <div class="card">
      <div class="card-header">
        <h5 class="mb-0">Danh sách đánh giá</h5>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>STT</th>
                <th>Sản phẩm</th>
                <th>Khách hàng</th>
                <th>Đánh giá</th>
                <th>Nội dung</th>
                <th>Ngày tạo</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(review, index) in filteredReviews" :key="review.id">
                <td>{{ index + 1 }}</td>
                <td>
                  <div class="d-flex align-items-center gap-2">
                    <div style="width: 50px; height: 50px; background: #f8f9fa; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                      📷
                    </div>
                    <div>
                      <small class="text-muted">{{ review.productName }}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <strong>{{ review.reviewerName }}</strong><br>
                    <small class="text-muted">{{ review.userEmail }}</small>
                  </div>
                </td>
                <td>
                  <div class="d-flex align-items-center gap-1">
                    <span class="rating-stars">{{ '⭐'.repeat(review.rating) }}</span>
                    <small class="text-muted">({{ review.rating }}/5)</small>
                  </div>
                  <div v-if="review.wouldRecommend" class="text-success">
                    <small>✅ Giới thiệu</small>
                  </div>
                </td>
                <td>
                  <div class="review-content" style="max-width: 200px;">
                    <p class="mb-1">{{ truncateText(review.comment, 50) }}</p>
                    <div v-if="review.images && review.images.length > 0" class="d-flex gap-1">
                      <small class="text-info">📷 {{ review.images.length }} ảnh</small>
                    </div>
                  </div>
                </td>
                <td>{{ formatDate(review.createdAt) }}</td>
                <td>
                  <span 
                    class="badge" 
                    :class="getStatusBadgeClass(review.status)"
                  >
                    {{ getStatusText(review.status) }}
                  </span>
                </td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <button 
                      class="btn btn-outline-info"
                      @click="viewReview(review)"
                      title="Xem chi tiết"
                    >
                      👁️
                    </button>
                    <button 
                      v-if="review.status !== 'published'"
                      class="btn btn-outline-success"
                      @click="approveReview(review.id)"
                      title="Duyệt"
                    >
                      ✅
                    </button>
                    <button 
                      v-if="review.status !== 'rejected'"
                      class="btn btn-outline-danger"
                      @click="rejectReview(review.id)"
                      title="Từ chối"
                    >
                      ❌
                    </button>
                    <button 
                      class="btn btn-outline-danger"
                      @click="deleteReview(review.id)"
                      title="Xóa"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="filteredReviews.length === 0" class="text-center py-4 text-muted">
          Không có đánh giá nào
        </div>
      </div>
    </div>

    <!-- Modal xem chi tiết đánh giá -->
    <div class="modal fade" id="reviewDetailModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Chi tiết đánh giá</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" v-if="selectedReview">
            <div class="row">
              <div class="col-md-6">
                <h6>Thông tin sản phẩm</h6>
                <p><strong>Tên:</strong> {{ selectedReview.productName }}</p>
                <p><strong>Mã đơn hàng:</strong> #{{ selectedReview.orderId }}</p>
              </div>
              <div class="col-md-6">
                <h6>Thông tin khách hàng</h6>
                <p><strong>Tên:</strong> {{ selectedReview.reviewerName }}</p>
                <p><strong>Email:</strong> {{ selectedReview.userEmail }}</p>
                <p><strong>Ngày đánh giá:</strong> {{ formatDate(selectedReview.createdAt) }}</p>
              </div>
            </div>
            
            <hr>
            
            <div class="mb-3">
              <h6>Đánh giá</h6>
              <div class="d-flex align-items-center gap-2 mb-2">
                <span class="rating-stars fs-5">{{ '⭐'.repeat(selectedReview.rating) }}</span>
                <span>({{ selectedReview.rating }}/5 sao)</span>
              </div>
              <div v-if="selectedReview.wouldRecommend" class="text-success">
                ✅ Khách hàng sẽ giới thiệu sản phẩm này
              </div>
            </div>
            
            <div class="mb-3">
              <h6>Nhận xét</h6>
              <p class="bg-light p-3 rounded">{{ selectedReview.comment }}</p>
            </div>
            
            <div v-if="selectedReview.images && selectedReview.images.length > 0" class="mb-3">
              <h6>Hình ảnh ({{ selectedReview.images.length }})</h6>
              <div class="d-flex gap-2 flex-wrap">
                <img 
                  v-for="(img, index) in selectedReview.images" 
                  :key="index"
                  :src="img" 
                  alt="" 
                  style="width: 100px; height: 100px; object-fit: cover; border-radius: 4px; cursor: pointer;"
                  @click="openImageModal(img)"
                />
              </div>
            </div>
            
            <div class="d-flex justify-content-between">
              <span class="badge" :class="getStatusBadgeClass(selectedReview.status)">
                {{ getStatusText(selectedReview.status) }}
              </span>
              <div class="btn-group">
                <button 
                  v-if="selectedReview.status !== 'published'"
                  class="btn btn-success btn-sm"
                  @click="approveReview(selectedReview.id)"
                >
                  ✅ Duyệt
                </button>
                <button 
                  v-if="selectedReview.status !== 'rejected'"
                  class="btn btn-danger btn-sm"
                  @click="rejectReview(selectedReview.id)"
                >
                  ❌ Từ chối
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminReviewManager',
  data() {
    return {
      reviews: [],
      filterStatus: '',
      filterRating: '',
      selectedReview: null
    }
  },
  computed: {
    filteredReviews() {
      let filtered = this.reviews

      if (this.filterStatus) {
        filtered = filtered.filter(review => review.status === this.filterStatus)
      }

      if (this.filterRating) {
        filtered = filtered.filter(review => review.rating == this.filterRating)
      }

      return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    },
    publishedReviews() {
      return this.reviews.filter(review => review.status === 'published').length
    },
    pendingReviews() {
      return this.reviews.filter(review => review.status === 'pending').length
    },
    averageRating() {
      if (this.reviews.length === 0) return 0
      const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0)
      return totalRating / this.reviews.length
    }
  },
  methods: {
    loadReviews() {
      this.reviews = JSON.parse(localStorage.getItem('productReviews')) || []
    },
    saveReviews() {
      localStorage.setItem('productReviews', JSON.stringify(this.reviews))
    },
    viewReview(review) {
      this.selectedReview = review
      const modal = new bootstrap.Modal(document.getElementById('reviewDetailModal'))
      modal.show()
    },
    approveReview(reviewId) {
      const index = this.reviews.findIndex(review => review.id === reviewId)
      if (index !== -1) {
        this.reviews[index].status = 'published'
        this.saveReviews()
        alert('Đã duyệt đánh giá!')
        
        // Đóng modal nếu đang mở
        const modal = bootstrap.Modal.getInstance(document.getElementById('reviewDetailModal'))
        if (modal) {
          modal.hide()
        }
      }
    },
    rejectReview(reviewId) {
      if (confirm('Bạn có chắc chắn muốn từ chối đánh giá này?')) {
        const index = this.reviews.findIndex(review => review.id === reviewId)
        if (index !== -1) {
          this.reviews[index].status = 'rejected'
          this.saveReviews()
          alert('Đã từ chối đánh giá!')
          
          // Đóng modal nếu đang mở
          const modal = bootstrap.Modal.getInstance(document.getElementById('reviewDetailModal'))
          if (modal) {
            modal.hide()
          }
        }
      }
    },
    deleteReview(reviewId) {
      if (confirm('Bạn có chắc chắn muốn xóa đánh giá này?')) {
        const index = this.reviews.findIndex(review => review.id === reviewId)
        if (index !== -1) {
          this.reviews.splice(index, 1)
          this.saveReviews()
          alert('Đã xóa đánh giá!')
        }
      }
    },
    getStatusBadgeClass(status) {
      const classes = {
        'published': 'bg-success',
        'pending': 'bg-warning text-dark',
        'rejected': 'bg-danger'
      }
      return classes[status] || 'bg-secondary'
    },
    getStatusText(status) {
      const texts = {
        'published': 'Đã duyệt',
        'pending': 'Chờ duyệt',
        'rejected': 'Từ chối'
      }
      return texts[status] || 'Không xác định'
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    truncateText(text, maxLength) {
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
    },
    openImageModal(imageSrc) {
      // Tạo modal xem ảnh full size
      alert('Tính năng xem ảnh full size sẽ được phát triển thêm')
    }
  },
  mounted() {
    this.loadReviews()
  }
}
</script>

<style scoped>
.rating-stars {
  line-height: 1;
}

.review-content {
  word-break: break-word;
}

.btn-group-sm .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.table-responsive {
  max-height: 600px;
  overflow-y: auto;
}

.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}
</style>
