<template>
  <div class="container py-5">
    <h2 class="mb-4 text-primary text-center">👟 Hướng dẫn chọn kích cỡ giày</h2>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow-sm mb-4">
          <div class="card-body">
            <h5 class="mb-3">1. Đo chiều dài bàn chân</h5>
            <ol>
              <li>Đặt một tờ giấy trắng xuống sàn, sát tường.</li>
              <li>Đặt bàn chân lên giấy, gót chạm tường.</li>
              <li>Dùng bút vẽ một đường ở đầu ngón chân dài nhất.</li>
              <li>Đo khoảng cách từ mép giấy đến đường vừa vẽ (đơn vị mm).</li>
            </ol>
            <img src="https://img.lovepik.com/photo/40007/7352.jpg_wh860.jpg" alt="Hướng dẫn đo chân" class="img-fluid rounded mb-3" style="max-width: 400px;" />
            <h5 class="mb-3">2. Tra bảng quy đổi kích cỡ</h5>
            <table class="table table-bordered text-center">
              <thead class="table-light">
                <tr>
                  <th>Chiều dài chân (mm)</th>
                  <th>Size EU</th>
                  <th>Size US Nam</th>
                  <th>Size US Nữ</th>
                  <th>Size UK</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>220-225</td><td>35</td><td>4</td><td>5</td><td>3.5</td></tr>
                <tr><td>226-230</td><td>36</td><td>4.5</td><td>5.5</td><td>4</td></tr>
                <tr><td>231-235</td><td>37</td><td>5</td><td>6</td><td>4.5</td></tr>
                <tr><td>236-240</td><td>38</td><td>5.5</td><td>6.5</td><td>5</td></tr>
                <tr><td>241-245</td><td>39</td><td>6</td><td>7</td><td>5.5</td></tr>
                <tr><td>246-250</td><td>40</td><td>6.5</td><td>7.5</td><td>6</td></tr>
                <tr><td>251-255</td><td>41</td><td>7</td><td>8</td><td>6.5</td></tr>
                <tr><td>256-260</td><td>42</td><td>7.5</td><td>8.5</td><td>7</td></tr>
                <tr><td>261-265</td><td>43</td><td>8</td><td>9</td><td>7.5</td></tr>
                <tr><td>266-270</td><td>44</td><td>8.5</td><td>9.5</td><td>8</td></tr>
                <tr><td>271-275</td><td>45</td><td>9</td><td>10</td><td>8.5</td></tr>
              </tbody>
            </table>
            <h5 class="mb-3">3. Lưu ý khi chọn size</h5>
            <ul>
              <li>Nên đo chân vào buổi chiều tối để có kết quả chính xác nhất.</li>
              <li>Nếu chân bạn nằm giữa 2 size, hãy chọn size lớn hơn.</li>
              <li>Form giày mỗi hãng có thể khác nhau, nên tham khảo thêm tư vấn từ shop.</li>
            </ul>
            <div class="alert alert-info mt-4">
              <strong>Tip:</strong> Nếu bạn cần tư vấn chọn size, hãy liên hệ hotline hoặc chat với shop để được hỗ trợ nhanh nhất!
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <router-link to="/products" class="btn btn-primary">⬅ Quay lại danh sách sản phẩm</router-link>
    </div>
  </div>
</template>

<script setup>
// Trang tĩnh, không cần logic JS
</script>

<style scoped>
table {
  font-size: 1rem;
}
img {
  max-width: 100%;
  height: auto;
}
</style>
