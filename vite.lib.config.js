import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
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
  build: {
    target: 'es2015', // 设置最终构建的浏览器兼容目标
    outDir: path.resolve(process.cwd(), './dist-lib'), // 指定输出路径（相对于 项目根目录)
    chunkSizeWarningLimit: 1000, // chunk 大小警告的限制（以 kbs 为单位）。默认： 500
    lib: {
      entry: path.resolve(process.cwd(), './src/libmain.js'), // 入口代码文件
      name: 'ImageEditor', // 库的名字，引入脚本后，可以通过window[name]访问
      formats: ['umd'], // 库的模块类型
      fileName: (format) => `ImageEditor.js`, // 生成的JavaScript文件名
    },
  },
})
