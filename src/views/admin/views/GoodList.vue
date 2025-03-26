<script setup>
import { reactive, onMounted } from 'vue';
import goodApi from "@/api/admin/goodApi.js";

const goodData = reactive({
  total: 0,
  list: [],
  pageNum: 1,
  pageSize: 6,
  typeList: [],
});

const filterData = reactive({
  name: null,
});

// 分页配置
const pagination = reactive({
  current: goodData.pageNum,
  pageSize: goodData.pageSize,
  total: goodData.total,
  showSizeChanger: true,
  showQuickJumper: true
});

const fetchData = async (pageNum = 1, pageSize = 6) => {
  const params = { pageNum, pageSize, ...filterData };
  const response = await goodApi.getGoodList(params);
  Object.assign(goodData, {
    total: response.data.total,
    list: response.data.list,
    pageNum: response.data.pageNum,
    pageSize: response.data.pageSize,
    typeList: response.data.typeList,
  });
  pagination.current = response.data.pageNum;
  pagination.pageSize = response.data.pageSize;
  pagination.total = response.data.total;
};



// 处理分页跳转
const handleTableChange = (pagination) => {
  const { current, pageSize } = pagination;
  fetchData(current, pageSize);
};

// 搜索处理函数
const handleSearch = () => {
  fetchData(1);
};

// 初始化数据
onMounted(() => {
  fetchData();
});

// 表格列配置
const columns = [
  { title: '商品Id', dataIndex: 'id', key: 'id' },
  { title: '商品名称', dataIndex: 'name', key: 'name' },
  { title: '价格', dataIndex: 'price', key: 'price' },
  { title: '库存', dataIndex: 'stock', key: 'stock' },
  { title: '描述', dataIndex: 'description', key: 'description' },
  { title: '商品图片', dataIndex: 'image', key: 'image', scopedSlots: { customRender: 'image' } }
];
</script>

<template>
  <div>
    <div style="display: flex;">
      <!-- 选择宠物名称 -->
      <a-input v-model:value="filterData.name" placeholder="输入宠物名称" allow-clear style="width:230px"/>
      <!-- 搜索按钮 -->
      <a-button type="primary" @click="handleSearch">搜索</a-button>
    </div>

    <a-table :columns="columns" :dataSource="goodData.list" :pagination="pagination" @change="handleTableChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'image'">
          <img :src="record.image" alt="image" style="width: 50px; height: 50px; border-radius: 5px;" />
        </template>
      </template>
    </a-table>

  </div>
</template>



<style scoped>
/* 样式可以根据需要调整 */
</style>
