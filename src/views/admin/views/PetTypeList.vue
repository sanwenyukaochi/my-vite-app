<script setup>
import { reactive, onMounted, ref } from 'vue';
import typeApi from "@/api/admin/typeApi.js";

const typeData = reactive({
  total: 0,
  list: [],
  pageNum: 1,
  pageSize: 6,
  typeList: [],
});

const filterData = reactive({
  type: null,
});

const pagination = reactive({
  current: typeData.pageNum,
  pageSize: typeData.pageSize,
  total: typeData.total,
  showSizeChanger: true,
  showQuickJumper: true
});

// 获取宠物类型和数据
const fetchData = async (pageNum = 1, pageSize = 6) => {
  const params = {pageNum, pageSize, ...filterData};
  const response = await typeApi.getTypeList(params);
  Object.assign(typeData, {
    total: response.data.pageInfo.total,
    list: response.data.pageInfo.list,
    pageNum: response.data.pageInfo.pageNum,
    pageSize: response.data.pageInfo.pageSize,
    typeList: response.data.typeList
  });
  pagination.current = response.data.pageInfo.pageNum;
  pagination.pageSize = response.data.pageInfo.pageSize;
  pagination.total = response.data.pageInfo.total;
};

// 处理表格分页变化
const handleTableChange = (pagination) => {
  const {current, pageSize} = pagination;
  fetchData(current, pageSize);
};

// 搜索处理函数
const handleSearch = () => {
  fetchData(1); // 当点击搜索时，重置页码为1
};

// 初始化数据
onMounted(() => {
  fetchData();
});

// 表格列配置
const columns = [
  {title: '宠物Id', dataIndex: 'id', key: 'id'},
  {title: '宠物类型', dataIndex: 'type', key: 'type'},
  {title: '类型描述', dataIndex: 'typeFeature', key: 'typeFeature'},
];
</script>

<template>
  <div>
    <div style="display: flex;">
      <!-- 选择宠物类型 -->
      <a-select v-model:value="filterData.type" placeholder="选择宠物类型" allow-clear style="width: 230px">
        <a-select-option v-for="(type, index) in typeData.typeList" :key="index" :value="type">{{
            type
          }}
        </a-select-option>
      </a-select>
      <!-- 搜索按钮 -->
      <a-button type="primary" @click="handleSearch">搜索</a-button>
    </div>

    <a-table :columns="columns" :dataSource="typeData.list" :pagination="pagination" @change="handleTableChange">
    </a-table>
  </div>
</template>

<style scoped>
</style>
