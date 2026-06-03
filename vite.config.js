import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    proxy: {
      // https://cn.vitejs.dev/config/#server-proxy
      '/api': {
        target: 'https://pixabay.com',
        changeOrigin: true,
        // rewrite: (p) => p.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: { // @/ 替换为 src/
    alias: {
      '@': path.resolve(process.cwd(), 'src')
    }
  },
})
