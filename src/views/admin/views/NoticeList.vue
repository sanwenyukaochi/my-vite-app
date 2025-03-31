<script setup>
import { reactive, onMounted, watchEffect } from 'vue';
import noticeApi from "@/api/admin/noticeApi.js";

const noticeData = reactive({
  total: 0,
  list: [],
  pageNum: 1,
  pageSize: 6,
});

const filterData = reactive({});

const pagination = reactive({
  current: noticeData.pageNum,
  pageSize: noticeData.pageSize,
  total: noticeData.total,
  showSizeChanger: true,
  showQuickJumper: true
});

const fetchData = async (pageNum = 1, pageSize = 6) => {
  const params = {
    pageNum,
    pageSize,
    ...JSON.parse(JSON.stringify(filterData)) // 避免 reactive 直接展开
  };
  const response = await noticeApi.getNoticeList(params);
  if (response.code === "0") {
    Object.assign(noticeData, {
      total: response.data.total,
      list: response.data.list,
      pageNum: response.data.pageNum,
      pageSize: response.data.pageSize,
    });

    pagination.current = response.data.pageNum;
    pagination.pageSize = response.data.pageSize;
    pagination.total = response.data.total;
  }
};

// 监听 noticeData 变化，保持分页同步
watchEffect(() => {
  pagination.current = noticeData.pageNum;
  pagination.pageSize = noticeData.pageSize;
  pagination.total = noticeData.total;
});

// 处理分页变化
const handleTableChange = (pagination) => {
  fetchData(pagination.current, pagination.pageSize);
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
  { title: '公告ID', dataIndex: 'id', key: 'id' },
  { title: '公告标题', dataIndex: 'title', key: 'title' },
  { title: '内容摘要', dataIndex: 'content', key: 'content', ellipsis: true },
  { title: '发布时间', dataIndex: 'noticeDate', key: 'noticeDate' },
];

</script>

<template>
  <div>
    <a-table
        :columns="columns"
        :dataSource="noticeData.list"
        :pagination="pagination"
        rowKey="id"
        @change="handleTableChange"
    />
  </div>
</template>

<style scoped>
</style>
