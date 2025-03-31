<style scoped>
</style>

<script setup>
import {h, ref} from "vue";
import {useRouter} from 'vue-router';

const router = useRouter();
import {
  PieChartOutlined,
  HomeFilled,
  HeartFilled,
  SnippetsFilled,
  StarFilled,
  CrownFilled,
  CreditCardFilled,
  AppstoreFilled,
  FireFilled,
  SoundFilled,
  RobotFilled
} from '@ant-design/icons-vue';

const selectedKeys = ref(['1']);
const openKeys = ref(['sub1']); // 用于控制展开的子菜单
const handleOpenChange = (keys) => {
  const latestOpenKey = keys.find(key => openKeys.value.indexOf(key) === -1);
  if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'].indexOf(latestOpenKey) === -1) {
    openKeys.value = keys;
  } else {
    openKeys.value = latestOpenKey ? [latestOpenKey] : [];
  }
};

const items = [
  {
    key: '1', label: '主页', icon: () => h(PieChartOutlined),
  },
  {
    key: '2', label: '主页', icon: () => h(HomeFilled),
  },
  {
    key: '3', label: '用户管理', icon: () => h(HeartFilled),
    children: [
      {key: '3-1', label: '用户列表', onClick: () => router.push('/userList')},
      {key: '3-2', label: 'Bill'},
      {key: '3-3', label: 'Alex'},
    ],
  },
  {
    key: '4', label: '宠物管理', icon: () => h(SnippetsFilled),
    children: [
      {key: '4-1', label: '宠物列表', onClick: () => router.push('/petList')},
      {key: '4-2', label: 'Team 2'},
    ],
  },
  {
    key: '5', label: '商品管理', icon: () => h(StarFilled),
    children: [
      {key: '5-1', label: '商品列表', onClick: () => router.push('/goodList')},
      {key: '5-2', label: 'Team 2'},
    ],
  },
  {
    key: '6', label: '宠物分类管理', icon: () => h(CrownFilled),
    children: [
      {key: '6-1', label: '宠物分类列表', onClick: () => router.push('/petTypeList')},
      {key: '6-2', label: 'Team 2'},
    ],
  },
  {
    key: '7', label: '宠物订单管理', icon: () => h(CreditCardFilled),
    children: [
      {key: '7-1', label: 'Team 1'},
      {key: '7-2', label: 'Team 2'},
    ],
  },
  {
    key: '8', label: '商品订单管理', icon: () => h(AppstoreFilled),
    children: [
      {key: '8-1', label: 'Team 1'},
      {key: '8-2', label: 'Team 2'},
    ],
  },
  {
    key: '9', label: '论坛管理', icon: () => h(FireFilled),
    children: [
      {key: '9-1', label: '论坛列表', onClick: () => router.push('/forumList')},
      {key: '9-2', label: 'Team 2'},
    ],
  },
  {
    key: '10', label: '公告管理', icon: () => h(SoundFilled),
    children: [
      {key: '10-1', label: '公告列表', onClick: () => router.push('/noticeList')},
      {key: '10-2', label: 'Team 2'},
    ],
  },
  {
    key: '11', label: 'AI问答', icon: () => h(RobotFilled), onClick: () => router.push('/chat'),
  },
];

</script>

<template>
  <a-menu
      v-model:selectedKeys="selectedKeys"
      theme="dark"
      mode="inline"
      :open-keys="openKeys"
      :items="items"
      @openChange="handleOpenChange"

  ><!--
    <a-menu-item key="1">
      <pie-chart-outlined />
      <span>主页</span>
    </a-menu-item>
    <a-menu-item key="2">
      <HomeFilled />
      <span>主页</span>
    </a-menu-item>
    <a-sub-menu key="sub1">
      <template #title>
            <span>
              <HeartFilled />
              <span>用户管理</span>
            </span>
      </template>
      <a-menu-item key="3" @click="router.push('/userList')">Tom</a-menu-item>
      <a-menu-item key="4" @click="router.push('/petTypeList')">Bill</a-menu-item>
      <a-menu-item key="5">Alex</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub2">
      <template #title>
            <span>
              <SnippetsFilled />
              <span>宠物管理</span>
            </span>
      </template>
      <a-menu-item key="6">Team 1</a-menu-item>
      <a-menu-item key="8">Team 2</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub3">
      <template #title>
            <span>
              <StarFilled />
              <span>商品管理</span>
            </span>
      </template>
      <a-menu-item key="6">Team 1</a-menu-item>
      <a-menu-item key="8">Team 2</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub4">
      <template #title>
            <span>
              <CrownFilled />
              <span>宠物分类管理</span>
            </span>
      </template>
      <a-menu-item key="6">Team 1</a-menu-item>
      <a-menu-item key="8">Team 2</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub5">
      <template #title>
            <span>
              <CreditCardFilled />
              <span>宠物订单管理</span>
            </span>
      </template>
      <a-menu-item key="6">Team 1</a-menu-item>
      <a-menu-item key="8">Team 2</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub6">
      <template #title>
            <span>
              <AppstoreFilled />
              <span>商品订单管理</span>
            </span>
      </template>
      <a-menu-item key="6">Team 1</a-menu-item>
      <a-menu-item key="8">Team 2</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub7">
      <template #title>
            <span>
              <FireFilled />
              <span>论坛管理</span>
            </span>
      </template>
      <a-menu-item key="6">Team 1</a-menu-item>
      <a-menu-item key="8">Team 2</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub8">
      <template #title>
            <span>
              <SoundFilled />
              <span>公告管理</span>
            </span>
      </template>
      <a-menu-item key="6">Team 1</a-menu-item>
      <a-menu-item key="8">Team 2</a-menu-item>
    </a-sub-menu>
    <a-menu-item key="9">
      <file-outlined />
      <span>File</span>
    </a-menu-item>
    -->
  </a-menu>
</template>

<style scoped>
:deep(.ant-menu-item), :deep(.ant-menu-submenu-title) {
  //height: 60px !important;
  //line-height: 60px !important;
}
</style>