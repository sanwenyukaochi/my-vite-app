<script setup>
import {reactive, onMounted, ref, watchEffect} from 'vue';
import forumApi from "@/api/admin/forumApi.js"

const forumData = reactive({
  total: 0,
  list: [],
  pageNum: 1,
  pageSize: 6,
  typeList: [],
});

const filterData = reactive({
  title: null,
});

const pagination = reactive({
  current: forumData.pageNum,
  pageSize: forumData.pageSize,
  total: forumData.total,
  showSizeChanger: true,
  showQuickJumper: true
});

const fetchData = async (pageNum = 1, pageSize = 6) => {
  const params = {
    pageNum,
    pageSize,
    ...JSON.parse(JSON.stringify(filterData)) // 避免 reactive 直接展开
  };
  const response = await forumApi.getForumList(params);

  Object.assign(forumData, {
    total: response.data.total,
    list: response.data.list,
    pageNum: response.data.pageNum,
    pageSize: response.data.pageSize,
    typeList: response.data.typeList
  });

  pagination.current = response.data.pageNum;
  pagination.pageSize = response.data.pageSize;
  pagination.total = response.data.total;
};

// 监听分页数据变化，保持同步
watchEffect(() => {
  pagination.current = forumData.pageNum;
  pagination.pageSize = forumData.pageSize;
  pagination.total = forumData.total;
});

// 处理分页变化
const handleTableChange = (pagination) => {
  const {current, pageSize} = pagination;
  fetchData(current, pageSize);
};

// 搜索处理
const handleSearch = () => {
  fetchData(1); // 搜索后重置为第一页
};

// 初始化数据
onMounted(() => {
  fetchData();
});

// 表格列配置
const columns = [
  {title: '宠物ID', dataIndex: 'id', key: 'id'},
  {title: '帖子标题', dataIndex: 'title', key: 'title'},
  {title: '内容摘要', dataIndex: 'content', key: 'content', ellipsis: true},
  {title: '作者', dataIndex: 'user', key: 'user'},
  {title: '发布时间', dataIndex: 'forumDate', key: 'forumDate'},
  {
    title: '封面',
    dataIndex: 'image',
    key: 'image',
    customRender: ({text}) => text ? `<img src="${text}" alt="封面" style="width: 50px; height: 50px; border-radius: 5px;" />` : ''
  }
];
</script>

<template>
  <div>
    <!-- 筛选搜索 -->
    <div style="display: flex; gap: 10px; margin-bottom: 15px;">
      <a-input v-model:value="filterData.title" placeholder="选择宠物类型" allow-clear style="width: 230px" />
      <a-button type="primary" @click="handleSearch">搜索</a-button>
    </div>

    <!-- 论坛表格 -->
    <a-table
        :columns="columns"
        :dataSource="forumData.list"
        :pagination="pagination"
        rowKey="id"
        @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'image'">
          <a-avatar :src="record.image" shape="square" size="large"/>
        </template>
      </template>
    </a-table>
  </div>
</template>

<style scoped>
</style>
