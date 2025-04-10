import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';  // 确保导入 path


// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // 让 @ 代表 src 目录
    }
  },
  server:{
    proxy:{
      '/api':{//获取路径中包含了/api的请求
        target:'http://localhost:8088',//后台服务所在的源
        changeOrigin:true,//修改源
        rewrite:(path)=>path.replace(/^\/api/,'')///api替换为''
      }
    }
  }

})
