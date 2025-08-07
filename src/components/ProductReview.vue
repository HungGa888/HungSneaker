<template>
  <div class="modal fade" :id="modalId" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">⭐ Đánh giá sản phẩm</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div v-if="product" class="mb-4">
            <div class="d-flex align-items-center gap-3">
              <img :src="product.image" alt="" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;" />
              <div>
                <h6 class="mb-1">{{ product.name }}</h6>
                <p class="text-muted mb-0">Giá: {{ product.price.toLocaleString() }} đ</p>
              </div>
            </div>
          </div>

          <form @submit.prevent="submitReview">
            <!-- Đánh giá sao -->
            <div class="mb-3">
              <label class="form-label fw-semibold">Đánh giá của bạn *</label>
              <div class="star-rating d-flex gap-1 mb-2">
                <span 
                  v-for="star in 5" 
                  :key="star"
                  class="star"
                  :class="{ active: star <= rating }"
                  @click="setRating(star)"
                  @mouseover="hoverRating = star"
                  @mouseleave="hoverRating = 0"
                >
                  ⭐
                </span>
              </div>
              <small class="text-muted">{{ getRatingText(rating) }}</small>
            </div>

            <!-- Bình luận -->
            <div class="mb-3">
              <label for="comment" class="form-label fw-semibold">Nhận xét của bạn *</label>
              <textarea 
                v-model="comment" 
                id="comment" 
                class="form-control" 
                rows="4" 
                placeholder="Chia sẻ cảm nhận của bạn về sản phẩm này..."
                required
              ></textarea>
            </div>

            <!-- Ảnh đánh giá -->
            <div class="mb-3">
              <label for="reviewImages" class="form-label fw-semibold">Hình ảnh (tùy chọn)</label>
              <input 
                type="file" 
                id="reviewImages" 
                class="form-control" 
                multiple 
                accept="image/*"
                @change="handleImageUpload"
              />
              <small class="text-muted">Tối đa 3 hình ảnh</small>
              
              <!-- Preview ảnh -->
              <div v-if="imagePreview.length > 0" class="mt-2 d-flex gap-2 flex-wrap">
                <div v-for="(img, index) in imagePreview" :key="index" class="position-relative">
                  <img :src="img" alt="" style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px;" />
                  <button 
                    type="button" 
                    class="btn btn-sm btn-danger position-absolute top-0 end-0"
                    style="padding: 2px 6px; font-size: 12px;"
                    @click="removeImage(index)"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>

            <!-- Thông tin thêm -->
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="reviewerName" class="form-label fw-semibold">Tên hiển thị</label>
                  <input 
                    v-model="reviewerName" 
                    type="text" 
                    id="reviewerName" 
                    class="form-control" 
                    placeholder="Tên của bạn"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label fw-semibold">Bạn có muốn giới thiệu sản phẩm này?</label>
                  <div class="form-check">
                    <input v-model="wouldRecommend" class="form-check-input" type="checkbox" id="recommend">
                    <label class="form-check-label" for="recommend">
                      Có, tôi sẽ giới thiệu sản phẩm này
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-end gap-2">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
              <button type="submit" class="btn btn-primary" :disabled="!isValidReview">
                Gửi đánh giá
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductReview',
  props: {
    product: {
      type: Object,
      default: null
    },
    orderId: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      modalId: `reviewModal_${Math.random().toString(36).substr(2, 9)}`,
      rating: 0,
      hoverRating: 0,
      comment: '',
      reviewerName: '',
      wouldRecommend: false,
      imagePreview: [],
      reviewImages: []
    }
  },
  computed: {
    isValidReview() {
      return this.rating > 0 && this.comment.trim().length > 0
    }
  },
  methods: {
    setRating(stars) {
      this.rating = stars
    },
    getRatingText(rating) {
      const texts = {
        1: 'Rất không hài lòng',
        2: 'Không hài lòng',
        3: 'Bình thường',
        4: 'Hài lòng',
        5: 'Rất hài lòng'
      }
      return texts[rating] || 'Chọn số sao để đánh giá'
    },
    handleImageUpload(event) {
      const files = Array.from(event.target.files)
      if (files.length > 3) {
        alert('Chỉ được chọn tối đa 3 hình ảnh!')
        return
      }

      this.reviewImages = files
      this.imagePreview = []

      files.forEach(file => {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.imagePreview.push(e.target.result)
        }
        reader.readAsDataURL(file)
      })
    },
    removeImage(index) {
      this.imagePreview.splice(index, 1)
      this.reviewImages.splice(index, 1)
    },
    submitReview() {
      if (!this.isValidReview) {
        alert('Vui lòng điền đầy đủ thông tin đánh giá!')
        return
      }

      const user = JSON.parse(localStorage.getItem('loggedInUser'))
      if (!user) {
        alert('Vui lòng đăng nhập!')
        return
      }

      const review = {
        id: Date.now(),
        productId: this.product.id,
        productName: this.product.name,
        orderId: this.orderId,
        userEmail: user.email,
        reviewerName: this.reviewerName || user.email.split('@')[0],
        rating: this.rating,
        comment: this.comment.trim(),
        wouldRecommend: this.wouldRecommend,
        images: this.imagePreview, // In thực tế sẽ upload lên server
        createdAt: new Date().toISOString(),
        status: 'published' // published, pending, rejected
      }

      // Lưu đánh giá vào localStorage
      let reviews = JSON.parse(localStorage.getItem('productReviews')) || []
      reviews.push(review)
      localStorage.setItem('productReviews', JSON.stringify(reviews))

      // Đánh dấu sản phẩm đã được đánh giá trong đơn hàng
      this.markProductAsReviewed()

      // Reset form
      this.resetForm()

      // Đóng modal
      const modal = document.getElementById(this.modalId)
      const bsModal = bootstrap.Modal.getInstance(modal)
      if (bsModal) {
        bsModal.hide()
      }

      // Thông báo thành công
      alert('Cảm ơn bạn đã đánh giá sản phẩm!')

      // Emit event để parent component cập nhật
      this.$emit('reviewSubmitted', review)
    },
    markProductAsReviewed() {
      let orders = JSON.parse(localStorage.getItem('orders')) || []
      const orderIndex = orders.findIndex(order => order.id === this.orderId)
      
      if (orderIndex !== -1) {
        const order = orders[orderIndex]
        const productIndex = order.items.findIndex(item => item.id === this.product.id)
        
        if (productIndex !== -1) {
          // Thêm flag đã đánh giá
          if (!order.items[productIndex].reviewed) {
            order.items[productIndex].reviewed = true
            orders[orderIndex] = order
            localStorage.setItem('orders', JSON.stringify(orders))
          }
        }
      }
    },
    resetForm() {
      this.rating = 0
      this.hoverRating = 0
      this.comment = ''
      this.reviewerName = ''
      this.wouldRecommend = false
      this.imagePreview = []
      this.reviewImages = []
    },
    openModal() {
      const user = JSON.parse(localStorage.getItem('loggedInUser'))
      if (user) {
        this.reviewerName = user.fullName || user.email.split('@')[0]
      }
      
      const modal = new bootstrap.Modal(document.getElementById(this.modalId))
      modal.show()
    }
  }
}
</script>

<style scoped>
.star-rating .star {
  font-size: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  filter: grayscale(100%);
}

.star-rating .star:hover,
.star-rating .star.active {
  filter: grayscale(0%);
  transform: scale(1.1);
}

.modal-body {
  max-height: 70vh;
  overflow-y: auto;
}

.btn-close {
  font-size: 12px;
}
</style>
