<script setup>
import { ref, onMounted } from 'vue';
import mainApi from '@/api/main/mainList.js';

const petData = ref({
  list: [],
  total: 0,
  pageNum: 1,
  pageSize: 9
});

const fetchData = async () => {
  try {
    const response = await mainApi.mainPetList();
    petData.value = response.data.pageInfoPet;
  } catch (error) {
    console.error("获取宠物列表失败:", error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="pet-container">
    <div>所有宠物</div>
    <div class="pet-grid">
      <div v-for="pet in petData.list" :key="pet.id" class="pet-card">
        <div class="pet-image-container">
          <img :src="pet.image" :alt="pet.name" class="pet-image">
          <span class="pet-status" :class="{ 'sold': pet.saleStatus === 1 }">
            {{ pet.saleStatus === 0 ? '带我回家' : '已售出' }}
          </span>
        </div>
        <div class="pet-info">
          <h3 class="pet-name">{{ pet.name }}</h3>
          <div class="pet-tags">
            <span class="pet-tag">{{ pet.typeName }}</span>
            <span class="pet-tag">{{ pet.sex }}</span>
            <span v-if="pet.color" class="pet-tag">{{ pet.color }}</span>
          </div>
          <p class="pet-description">{{ pet.description }}</p>
          <div class="pet-details">
            <span v-if="pet.weight" class="pet-detail">体重: {{ pet.weight }}</span>
            <span v-if="pet.birthDate" class="pet-detail">
              出生: {{ new Date(pet.birthDate).toLocaleDateString() }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pet-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.pet-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 20px;
  padding: 20px;
}

.pet-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.pet-card:hover {
  transform: translateY(-5px);
}

.pet-image-container {
  position: relative;
  height: 200px;
}

.pet-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pet-status {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 8px;
  background-color: #4CAF50;
  color: white;
  border-radius: 4px;
  font-size: 0.9em;
}

.pet-status.sold {
  background-color: #9e9e9e;
}

.pet-info {
  padding: 15px;
}

.pet-name {
  margin: 0 0 10px 0;
  font-size: 1.2em;
  color: #333;
}

.pet-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.pet-tag {
  background-color: #e3f2fd;
  color: #1976d2;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
}

.pet-description {
  color: #666;
  font-size: 0.9em;
  margin: 10px 0;
  line-height: 1.4;
}

.pet-details {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.pet-detail {
  color: #666;
  font-size: 0.9em;
}
</style>