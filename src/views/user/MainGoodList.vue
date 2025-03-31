<script setup>
import { ref, onMounted } from 'vue';
import mainApi from '@/api/main/mainList.js';

const goodData = ref({
  list: [],
  total: 0,
  pageNum: 1,
  pageSize: 7
});

const fetchData = async () => {
  try {
    const response = await mainApi.mainPetList();
    goodData.value = response.data.pageInfoGood;
  } catch (error) {
    console.error("获取商品列表失败:", error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="goods-container">
    <div class="goods-grid">
      <div v-for="good in goodData.list" :key="good.id" class="good-card">
        <div class="good-image-container">
          <img :src="good.image" :alt="good.name" class="good-image">
          <span class="good-stock" :class="{ 'low-stock': good.stock < 10 }">
            库存: {{ good.stock }}
          </span>
        </div>
        <div class="good-info">
          <h3 class="good-name">{{ good.name }}</h3>
          <p class="good-description">{{ good.description }}</p>
          <div class="good-footer">
            <span class="good-price">¥{{ good.price.toFixed(2) }}</span>
            <a-button type="primary" size="small" :disabled="good.stock === 0">
              {{ good.stock === 0 ? '已售罄' : '购买' }}
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.goods-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.goods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
  padding: 20px;
}

.good-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.good-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.good-image-container {
  position: relative;
  height: 200px;
}

.good-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.good-stock {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: 4px;
  font-size: 0.85em;
}

.good-stock.low-stock {
  background-color: #ff5252;
}

.good-info {
  padding: 16px;
}

.good-name {
  margin: 0 0 8px 0;
  font-size: 1.2em;
  color: #333;
  font-weight: 600;
}

.good-description {
  color: #666;
  font-size: 0.9em;
  margin: 8px 0;
  line-height: 1.4;
  height: 2.8em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.good-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

.good-price {
  color: #ff5252;
  font-size: 1.2em;
  font-weight: bold;
}

:deep(.ant-btn-primary) {
  background-color: #7e57c2;
  border-color: #7e57c2;
}

:deep(.ant-btn-primary:hover) {
  background-color: #673ab7;
  border-color: #673ab7;
}

:deep(.ant-btn-primary[disabled]) {
  background-color: #d1c4e9;
  border-color: #d1c4e9;
}
</style>