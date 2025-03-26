<script setup>
import { reactive, onMounted, ref } from 'vue';
import userApi from "@/api/userApi.js";

const userData = reactive({
  total: 0,
  list: [],
  pageNum: 1,
  pageSize: 6,
});

const filterData = reactive({
  username: null,
  sex: null,
  age: null,
});

const pagination = reactive({
  current: userData.pageNum,
  pageSize: userData.pageSize,
  total: userData.total,
  showSizeChanger: true,
  showQuickJumper: true
});

const fetchData = async (pageNum = 1, pageSize = 6) => {
  const params = { pageNum, pageSize, ...filterData};
  const response = await userApi.getUserList(params);
  Object.assign(userData, {
    total: response.data.total,
    list: response.data.list,
    pageNum: response.data.pageNum,
    pageSize: response.data.pageSize,
  });
    pagination.current = response.data.pageNum;
    pagination.pageSize = response.data.pageSize;
    pagination.total = response.data.total;
};

// 处理表格分页变化
const handleTableChange = (pagination) => {
  const {current, pageSize} = pagination;
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
  { title: '用户Id', dataIndex: 'id', key: 'id' },
  { title: '头像', dataIndex: 'avatar', key: 'avatar', scopedSlots: { customRender: 'avatar' } },
  { title: '用户名', dataIndex: 'username', key: 'username' },
  { title: '性别', dataIndex: 'sex', key: 'sex' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '电话', dataIndex: 'phone', key: 'phone' },
  { title: '邮箱', dataIndex: 'email', key: 'email' },
];

</script>

<template>
  <div>
    <div style="display: flex;">
      <!-- 选择性别 -->
      <a-select v-model:value="filterData.sex" placeholder="选择性别" allow-clear style="width: 230px">
        <a-select-option value="男">男</a-select-option>
        <a-select-option value="女">女</a-select-option>
      </a-select>
      <!-- 选择年龄 -->
      <a-select v-model:value="filterData.age" placeholder="选择年龄" allow-clear style="width: 230px">
        <a-select-option value="1">小于 20</a-select-option>
        <a-select-option value="2">大于 20</a-select-option>
      </a-select>
      <!-- 选择姓名 -->
      <a-input v-model:value="filterData.username" placeholder="输入用户名" allow-clear style="width: 400px"/>
      <!-- 搜索按钮 -->
      <a-button type="primary" @click="handleSearch">搜索</a-button>
    </div>
    <a-table :columns="columns" :dataSource="userData.list" :pagination="pagination" @change="handleTableChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'avatar'">
          <img :src="record.avatar" alt="avatar" style="width: 50px; height: 50px; border-radius: 50%;" />
        </template>
      </template>
    </a-table>
  </div>
</template>

<style scoped>

</style>
