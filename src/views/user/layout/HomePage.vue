<script setup>
import shopBg from '@/assets/img/bg/shop_bg.jpg';
import UserSlider from "@/views/user/layout/UserSider.vue";
import h3_banner_slide01 from "@/assets/img/banner/h3_banner_slide01.jpg";
import h3_banner_img01 from "@/assets/img/banner/h3_banner_img01.jpg";
import h3_banner_img02 from "@/assets/img/banner/h3_banner_img02.jpg";
</script>

<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo" />
      <UserSlider />
    </a-layout-header>

    <a-layout-content class="content">
      <div class="banner-container">
        <!-- 左侧大图 -->
        <div class="banner-left">
          <img :src="h3_banner_slide01" alt="bg">
        </div>

        <!-- 右侧两张小图 -->
        <div class="banner-right">
          <div class="banner-small">
            <img :src="h3_banner_img01" alt="bg">
          </div>
          <div class="banner-small">
            <img :src="h3_banner_img02" alt="bg">
          </div>
        </div>
      </div>

      <div class="content-section" :style="{ backgroundImage: `url(${shopBg})` }">
        <div class="banner-container">Content</div>
      </div>

      <div class="content-section">
        <div class="banner-container">Content</div>
      </div>

    </a-layout-content>

    <a-layout-footer class="footer">
      <a href="https://github.com/sanwenyukaochi" target="_blank">
        我是 三文鱼烤翅 ，欢迎访问我的 GitHub ！
      </a>
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
/* 头部样式 */
.header {
  position: fixed;
  z-index: 1;
  width: 100%;
  background-image: url('@/assets/img/bg/counter_bg.jpg');
}

/* 页面内容样式 */
.content {
  padding: 0;
  margin-top: 64px;
  overflow-y: auto;
}

/* Banner 主要布局 */
.banner-container {
  padding: 24px;
  min-height: 380px;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  max-width: 1000px;
  margin: 0 auto;
  border-radius: 10px;
}

/* 左侧大图 */
.banner-left {
  flex: 1;
  min-width: 300px;
  height: 380px;
  border-radius: 10px;
  overflow: hidden;
  max-width: 700px;
}

.banner-left img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 右侧两张小图 */
.banner-right {
  flex: 1;
  min-width: 300px;
  height: 380px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  max-width: 300px;
}

.banner-small {
  height: 48%;
  border-radius: 10px;
  overflow: hidden;
}

.banner-small img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 主要内容区 */
.content-section {
  background: #fff;
  padding: 24px;
  min-height: 380px;
}

/* 页脚样式 */
.footer {
  text-align: center;
  color: white;
  background-image: url('@/assets/img/bg/counter_bg.jpg');
  background-size: cover;
  background-position: center;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1px;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.3);
}

.footer a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.footer a:hover {
  color: #f4a261;
}
</style>
