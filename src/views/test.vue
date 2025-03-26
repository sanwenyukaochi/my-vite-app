<script setup>
import { reactive, onMounted } from 'vue';
import userApi from "@/api/userApi.js";

// 初始化响应式数据
const userData = reactive({
  total: 0,
  list: [],
  pageNum: 1,
  pageSize: 6,
});

const filterData = reactive({
  username: '',
  sex: '',
  age: ''
});

const pagination = reactive({
  current: userData.pageNum,
  pageSize: userData.pageSize,
  total: userData.total,
  showSizeChanger: true,
  showQuickJumper: true,
});

// 获取用户数据
const fetchData = async (pageNum = 1, pageSize = 6) => {
  const params = {pageNum, pageSize, ...filterData};
  try {
    const response = await userApi.getUserList(params);
    Object.assign(userData, response.data);
    Object.assign(pagination, {
      current: response.data.pageNum,
      pageSize: response.data.pageSize,
      total: response.data.total
    });
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

// 处理表格分页变化
const handleTableChange = (pagination) => {
  const {current, pageSize} = pagination;
  fetchData(current, pageSize);
};

// 搜索处理函数
const handleSearch = () => {
  fetchData(1); // 搜索时重置到第一页
};

// 初始化数据
onMounted(() => {
  fetchData();
});

// 表格列配置
const columns = [
  {title: '用户Id', dataIndex: 'id', key: 'id'},
  {title: '用户名', dataIndex: 'username', key: 'username'},
  {title: '头像', dataIndex: 'avatar', key: 'avatar', scopedSlots: {customRender: 'avatar'}},
  {title: '性别', dataIndex: 'sex', key: 'sex'},
  {title: '年龄', dataIndex: 'age', key: 'age'},
  {title: '电话', dataIndex: 'phone', key: 'phone'},
  {title: '邮箱', dataIndex: 'email', key: 'email'},
];
</script>

<template>
  <div>
    <!-- 搜索栏 -->
    <div class="search-bar">
      <!-- 选择性别 -->
      <a-select v-model:value="filterData.sex" placeholder="选择性别" allow-clear>
        <a-select-option value="男">男</a-select-option>
        <a-select-option value="女">女</a-select-option>
      </a-select>

      <!-- 选择年龄 -->
      <a-select v-model:value="filterData.age" placeholder="选择年龄" allow-clear>
        <a-select-option value="1">小于 20</a-select-option>
        <a-select-option value="2">大于 20</a-select-option>
      </a-select>

      <!-- 输入用户名 -->
      <a-input v-model:value="filterData.username" placeholder="输入用户名" allow-clear/>

      <!-- 搜索按钮 -->
      <a-button type="primary" @click="handleSearch">搜索</a-button>
    </div>

    <!-- 表格展示 -->
    <a-table :columns="columns" :dataSource="userData.list" :pagination="pagination" @change="handleTableChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'avatar'">
          <img :src="record.avatar" alt="avatar" style="width: 50px; height: 50px; border-radius: 50%;"/>
        </template>
      </template>
    </a-table>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  margin-bottom: 20px;
}
</style>
