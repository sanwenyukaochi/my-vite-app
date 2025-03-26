<script setup>
import { reactive, onMounted } from 'vue';
import petApi from "@/api/admin/petApi.js";

const petData = reactive({
  total: 0,
  list: [],
  pageNum: 1,
  pageSize: 6,
  typeList: [],
});

const filterData = reactive({
  typeName: null,
  name: null,
});

const pagination = reactive({
  current: petData.pageNum,
  pageSize: petData.pageSize,
  total: petData.total,
  showSizeChanger: true,
  showQuickJumper: true
});

const fetchData = async (pageNum = 1, pageSize = 6) => {
  const params = { pageNum, pageSize, ...filterData };
  const response = await petApi.getPetList(params);
  Object.assign(petData, {
    total: response.data.pageInfo.total,
    list: response.data.pageInfo.list,
    pageNum: response.data.pageInfo.pageNum,
    pageSize: response.data.pageInfo.pageSize,
    typeList: response.data.typeList,
  });
  pagination.current = response.data.pageInfo.pageNum;
  pagination.pageSize = response.data.pageInfo.pageSize;
  pagination.total = response.data.pageInfo.total;
};

// 处理表格分页变化
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
  {title: '宠物Id', dataIndex: 'id', key: 'id'},
  {title: '图片', dataIndex: 'image', key: 'image', scopedSlots: {customRender: 'image'}},
  {title: '宠物名称', dataIndex: 'name', key: 'name'},
  {title: '描述', dataIndex: 'description', key: 'description'},
  {title: '种类', dataIndex: 'typeName', key: 'typeName'},
  {title: '性别', dataIndex: 'sex', key: 'sex'},
  {title: '颜色', dataIndex: 'color', key: 'color'},
  {title: '体重', dataIndex: 'weight', key: 'weight'},
  {title: '出生日期', dataIndex: 'birthDate', key: 'birthDate'},
  {title: '销售状态', dataIndex: 'saleStatus', key: 'saleStatus', scopedSlots: {customRender: 'saleStatus'}},
];
</script>

<template>
  <div>
    <div style="display: flex;">
      <!-- 选择宠物种类 -->
      <a-select v-model:value="filterData.typeName" placeholder="选择种类" allow-clear style="width:230px">
        <a-select-option v-for="(type, index) in petData.typeList" :key="index" :value="type">{{ type }}</a-select-option>
      </a-select>
      <!-- 选择宠物名称 -->
      <a-input v-model:value="filterData.name" placeholder="输入宠物名称" allow-clear style="width:230px"/>
      <!-- 搜索按钮 -->
      <a-button type="primary" @click="handleSearch">搜索</a-button>
    </div>

    <a-table :columns="columns" :dataSource="petData.list" :pagination="pagination" @change="handleTableChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'image'">
          <img :src="record.image" alt="pet image" style="width: 50px; height: 50px; border-radius: 50%;" />
        </template>
        <template v-if="column.dataIndex === 'saleStatus'">
          <span>{{ record.saleStatus === 0 ? '未售出' : '已售出' }}</span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<style scoped>
</style>
